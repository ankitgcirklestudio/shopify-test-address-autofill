async function getSelectedRegionName(countryCode, regionCode) {
  if (!regionCode) return "";

  const response = await fetch(chrome.runtime.getURL("regions.json"));
  if (!response.ok) {
    throw new Error(`Unable to load region list (${response.status}).`);
  }

  const regionsByCountry = await response.json();
  const region = regionsByCountry[countryCode]?.find((item) => item.code === regionCode);
  if (!region) {
    throw new Error("The saved state or province is not available for this country.");
  }
  return region.name;
}

async function fillActiveCheckout(countryCode, regionCode) {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (!tab?.id) {
    throw new Error("No active tab found.");
  }

  const regionName = await getSelectedRegionName(countryCode, regionCode);
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });

  const response = await chrome.tabs.sendMessage(tab.id, {
    type: "FILL_SHOPIFY_TEST_ADDRESS_V7",
    countryCode,
    regionCode,
    regionName
  });
  if (!response?.address) {
    throw new Error(response?.message || "Unable to generate a test address.");
  }

  const [locationResult] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    world: "MAIN",
    func: selectShippingLocation,
    args: [
      response.address.countryCode,
      response.address.regionCode,
      response.address.regionName
    ]
  });
  const result = locationResult?.result;
  const locationStatus = result?.countrySelected
    ? result.regionSelected
      ? "Country/Region and State/Province selected."
      : "Country/Region selected, but State/Province was not selected."
    : "Country/Region was not selected.";
  return `${response.message} ${locationStatus}`;
}

async function selectShippingLocation(countryCode, regionCode, regionName) {
  const countrySelector = 'select[autocomplete="shipping country-name"], select[name="countryCode"]';
  const regionSelector = 'select[autocomplete="shipping address-level1"], select[name="zone"]';
  const normalize = (value) => String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
  const findFormControl = (selector) =>
    document.querySelector("#shippingAddressForm")?.querySelector(selector);
  const selectOption = (control, value) => {
    const option = Array.from(control.options).find((item) =>
      item.value === value || normalize(item.textContent) === normalize(value)
    );
    if (!option) return null;

    const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")?.set;
    if (setter) setter.call(control, option.value);
    else control.value = option.value;
    control.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    control.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    return option.value;
  };

  if (!document.querySelector("#shippingAddressForm")) {
    return { countrySelected: false, regionSelected: false };
  }

  const country = findFormControl(countrySelector);
  const wantedCountry = country && selectOption(country, countryCode);
  if (wantedCountry) {
    for (let attempt = 0; attempt < 20; attempt++) {
      if (findFormControl(countrySelector)?.value === wantedCountry) break;
      await wait(100);
    }
  }

  let wantedRegion = null;
  for (let attempt = 0; attempt < 20; attempt++) {
    const region = findFormControl(regionSelector);
    if (region) {
      wantedRegion = selectOption(region, regionCode) ||
        selectOption(region, regionName);
      if (wantedRegion) {
        await wait(150);
        if (findFormControl(regionSelector)?.value === wantedRegion) break;
      }
    }
    await wait(100);
  }

  return {
    countrySelected: Boolean(wantedCountry) &&
      findFormControl(countrySelector)?.value === wantedCountry,
    regionSelected: Boolean(wantedRegion) &&
      findFormControl(regionSelector)?.value === wantedRegion
  };
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type !== "FILL_ACTIVE_CHECKOUT") return;

  fillActiveCheckout(message.countryCode, message.regionCode)
    .then((text) => sendResponse({ message: text }))
    .catch((error) => sendResponse({
      error: error.message || "Unable to fill this page."
    }));
  return true;
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "fill-address") return;

  try {
    const settings = await chrome.storage.local.get([
      "testAddressCountry",
      "testAddressRegions"
    ]);
    const countryCode = settings.testAddressCountry || "US";
    const regionCode = settings.testAddressRegions?.[countryCode] || "";
    const message = await fillActiveCheckout(countryCode, regionCode);
    console.info(message);
  } catch (error) {
    console.error("Address Filler shortcut failed:", error);
  }
});
