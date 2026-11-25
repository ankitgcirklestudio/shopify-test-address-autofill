const countrySelect = document.querySelector("#country");
const regionSelect = document.querySelector("#region");
const fillButton = document.querySelector("#fill");
const settingsButton = document.querySelector("#settings");
const addressView = document.querySelector("#address-view");
const settingsView = document.querySelector("#settings-view");
const settingsReturnButton = document.querySelector("#settings-return");
const status = document.querySelector("#status");

let regionsByCountry = {};
let selectedRegions = {};

function populateRegions(countryCode) {
  const regions = regionsByCountry[countryCode] || [];
  regionSelect.replaceChildren();

  const randomOption = document.createElement("option");
  randomOption.value = "";
  randomOption.textContent = "Random state / province";
  regionSelect.append(randomOption);

  for (const region of regions) {
    const option = document.createElement("option");
    option.value = region.code;
    option.textContent = region.name;
    regionSelect.append(option);
  }

  const savedRegion = selectedRegions[countryCode] || "";
  regionSelect.value = regions.some((region) => region.code === savedRegion)
    ? savedRegion
    : "";
}

async function initializePopup() {
  fillButton.disabled = true;
  countrySelect.disabled = true;
  regionSelect.disabled = true;

  try {
    const response = await fetch(chrome.runtime.getURL("regions.json"));
    if (!response.ok) {
      throw new Error(`Unable to load region list (${response.status}).`);
    }

    const regionData = await response.json();
    const supportedCountries = Array.from(countrySelect.options, (option) => option.value);
    if (!supportedCountries.every((code) => Array.isArray(regionData[code]))) {
      throw new Error("Region list is missing a supported country.");
    }
    regionsByCountry = regionData;

    const settings = await chrome.storage.local.get([
      "testAddressCountry",
      "testAddressRegions"
    ]);
    if (supportedCountries.includes(settings.testAddressCountry)) {
      countrySelect.value = settings.testAddressCountry;
    }
    selectedRegions = settings.testAddressRegions || {};
    populateRegions(countrySelect.value);
    countrySelect.disabled = false;
    regionSelect.disabled = false;
    fillButton.disabled = false;
  } catch (error) {
    status.textContent = error.message || "Unable to load state and province options.";
  }
}

initializePopup();

countrySelect.addEventListener("change", async () => {
  populateRegions(countrySelect.value);
  try {
    await chrome.storage.local.set({ testAddressCountry: countrySelect.value });
  } catch (error) {
    status.textContent = error.message || "Unable to save the selected country.";
  }
});

regionSelect.addEventListener("change", async () => {
  selectedRegions[countrySelect.value] = regionSelect.value;
  try {
    await chrome.storage.local.set({ testAddressRegions: selectedRegions });
  } catch (error) {
    status.textContent = error.message || "Unable to save the selected state or province.";
  }
});

settingsButton.addEventListener("click", () => {
  addressView.hidden = true;
  settingsView.hidden = false;
  settingsButton.setAttribute("aria-expanded", "true");
});

settingsReturnButton.addEventListener("click", () => {
  settingsView.hidden = true;
  addressView.hidden = false;
  settingsButton.setAttribute("aria-expanded", "false");
});

fillButton.addEventListener("click", async () => {
  fillButton.disabled = true;
  status.textContent = "Filling...";

  try {
    await chrome.storage.local.set({
      testAddressCountry: countrySelect.value,
      testAddressRegions: selectedRegions
    });
    const response = await chrome.runtime.sendMessage({
      type: "FILL_ACTIVE_CHECKOUT",
      countryCode: countrySelect.value,
      regionCode: regionSelect.value
    });
    if (response?.error) {
      throw new Error(response.error);
    }
    status.textContent = response?.message || "Address fill complete.";
  } catch (error) {
    status.textContent = error.message || "Unable to fill this page.";
  } finally {
    fillButton.disabled = false;
  }
});
