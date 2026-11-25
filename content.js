(() => {
  const contentVersion = "8.0";
  if (globalThis.__shopifyTestAddressAutofillInstalled === contentVersion) return;
  globalThis.__shopifyTestAddressAutofillInstalled = contentVersion;

  const addresses = {
    US: {
      countryName: "United States",
      variants: [
        ["Riley", "Sample", "101 Example Avenue", "Unit 2", "Denver", "CO", "Colorado", "80202", "3035550101"],
        ["Jordan", "Demo", "202 Sample Street", "Apt 3", "Austin", "TX", "Texas", "73301", "5125550102"],
        ["Casey", "Test", "303 Fiction Road", "Suite 4", "Phoenix", "AZ", "Arizona", "85001", "6025550103"]
      ]
    },
    IN: {
      countryName: "India",
      variants: [
        ["Riley", "Sample", "101 Example Street", "Flat 2", "Bengaluru", "KA", "Karnataka", "560001", "9000000001"],
        ["Jordan", "Demo", "202 Sample Road", "Flat 3", "Mumbai", "MH", "Maharashtra", "400001", "9000000002"],
        ["Casey", "Test", "303 Fiction Lane", "Flat 4", "Chennai", "TN", "Tamil Nadu", "600001", "9000000003"]
      ]
    },
    GB: {
      countryName: "United Kingdom",
      variants: [
        ["Riley", "Sample", "101 Example Road", "Flat 2", "London", "ENG", "England", "SW1A 1AA", "02079460001"],
        ["Jordan", "Demo", "202 Sample Street", "Flat 3", "Edinburgh", "SCT", "Scotland", "EH1 1AA", "01315550002"],
        ["Casey", "Test", "303 Fiction Lane", "Flat 4", "Cardiff", "WLS", "Wales", "CF10 1AA", "02920550003"]
      ]
    },
    CA: {
      countryName: "Canada",
      variants: [
        ["Riley", "Sample", "101 Example Street", "Unit 2", "Toronto", "ON", "Ontario", "M5V 2T6", "4165550101"],
        ["Jordan", "Demo", "202 Sample Road", "Unit 3", "Vancouver", "BC", "British Columbia", "V5K 0A1", "6045550102"],
        ["Casey", "Test", "303 Fiction Avenue", "Unit 4", "Calgary", "AB", "Alberta", "T2P 1J9", "4035550103"]
      ]
    },
    AU: {
      countryName: "Australia",
      variants: [
        ["Riley", "Sample", "101 Example Street", "Unit 2", "Sydney", "NSW", "New South Wales", "2000", "0295550101"],
        ["Jordan", "Demo", "202 Sample Road", "Unit 3", "Melbourne", "VIC", "Victoria", "3000", "0395550102"],
        ["Casey", "Test", "303 Fiction Avenue", "Unit 4", "Brisbane", "QLD", "Queensland", "4000", "0735550103"]
      ]
    },
    DE: {
      countryName: "Germany",
      variants: [
        ["Riley", "Sample", "Beispielstrasse 101", "Wohnung 2", "Berlin", "BE", "Berlin", "10115", "0305550101"],
        ["Jordan", "Demo", "Musterstrasse 202", "Wohnung 3", "Hamburg", "HH", "Hamburg", "20095", "0405550102"],
        ["Casey", "Test", "Fiktivweg 303", "Wohnung 4", "Munich", "BY", "Bavaria", "80331", "0895550103"]
      ]
    }
  };

  const usZipPrefixRanges = {
    AL: [[350, 369]],
    AK: [[995, 999]],
    AZ: [[850, 865]],
    AR: [[716, 729]],
    CA: [[900, 961]],
    CO: [[800, 816]],
    CT: [[60, 69]],
    DE: [[197, 199]],
    DC: [[200, 200], [202, 205]],
    FL: [[320, 349]],
    GA: [[300, 319], [398, 399]],
    HI: [[967, 968]],
    ID: [[832, 838]],
    IL: [[600, 629]],
    IN: [[460, 479]],
    IA: [[500, 528]],
    KS: [[660, 679]],
    KY: [[400, 427]],
    LA: [[700, 714]],
    ME: [[39, 49]],
    MD: [[206, 219]],
    MA: [[10, 27]],
    MI: [[480, 499]],
    MN: [[550, 567]],
    MS: [[386, 397]],
    MO: [[630, 658]],
    MT: [[590, 599]],
    NE: [[680, 693]],
    NV: [[889, 898]],
    NH: [[30, 38]],
    NJ: [[70, 89]],
    NM: [[870, 884]],
    NY: [[100, 149]],
    NC: [[270, 289]],
    ND: [[580, 588]],
    OH: [[430, 459]],
    OK: [[730, 749]],
    OR: [[970, 979]],
    PA: [[150, 196]],
    RI: [[28, 29]],
    SC: [[290, 299]],
    SD: [[570, 577]],
    TN: [[370, 385]],
    TX: [[750, 799]],
    UT: [[840, 847]],
    VT: [[50, 59]],
    VA: [[201, 201], [220, 246]],
    WA: [[980, 994]],
    WV: [[247, 268]],
    WI: [[530, 549]],
    WY: [[820, 831]]
  };

  const regionPostalCodes = {
    IN: {
      AN: ["744101", "744103"],
      AP: ["520001", "530001"],
      AR: ["791111"],
      AS: ["781001", "785001"],
      BR: ["800001", "823001"],
      CH: ["160017"],
      CT: ["492001", "495001"],
      DH: ["396210", "396230"],
      DL: ["110001", "110002"],
      GA: ["403001", "403507"],
      GJ: ["380001", "390001"],
      HR: ["121001", "122001"],
      HP: ["171001", "176001"],
      JK: ["180001", "190001"],
      JH: ["831001", "834001"],
      KA: ["560001", "580001"],
      KL: ["682001", "695001"],
      LA: ["194101"],
      LD: ["682555"],
      MP: ["452001", "462001"],
      MH: ["400001", "411001"],
      MN: ["795001"],
      ML: ["793001"],
      MZ: ["796001"],
      NL: ["797001"],
      OR: ["751001", "753001"],
      PY: ["605001"],
      PB: ["141001", "144001"],
      RJ: ["302001", "342001"],
      SK: ["737101"],
      TN: ["600001", "641001"],
      TS: ["500001", "500032"],
      TR: ["799001"],
      UP: ["201301", "226001"],
      UT: ["248001", "263001"],
      WB: ["700001", "711101"]
    },
    GB: {
      ENG: ["SW1A 1AA", "B1 1AA", "M1 1AE", "LS1 1UR"],
      NIR: ["BT1 1AA", "BT2 8HQ", "BT7 1NN"],
      SCT: ["EH1 1AA", "G1 1AA", "AB10 1AB", "DD1 1AA"],
      WLS: ["CF10 1AA", "LL11 1AA", "SA1 1AA", "NP20 1AA"]
    },
    DE: {
      BW: ["70173", "79098", "68159"],
      BY: ["80331", "90402", "86150"],
      BE: ["10115", "10785", "10969"],
      BB: ["14467", "03046", "15230"],
      HB: ["28195", "27568"],
      HH: ["20095", "20354"],
      HE: ["60311", "65183", "64283"],
      MV: ["18055", "19053", "17489"],
      NI: ["30159", "37073", "49074"],
      NW: ["50667", "40213", "44135"],
      RP: ["55116", "56068", "54290"],
      SL: ["66111", "66740"],
      SN: ["01067", "04109", "09111"],
      ST: ["39104", "06108", "06844"],
      SH: ["24103", "23552", "24937"],
      TH: ["99084", "07743", "99867"]
    },
    AU: {
      ACT: ["2600", "2601", "2611", "2900"],
      NSW: ["2000", "2007", "2060", "2150", "2750"],
      NT: ["0800", "0810", "0820", "0870"],
      QLD: ["4000", "4006", "4101", "4217", "4350"],
      SA: ["5000", "5006", "5067", "5108"],
      TAS: ["7000", "7004", "7250", "7310"],
      VIC: ["3000", "3004", "3121", "3205", "3550"],
      WA: ["6000", "6005", "6100", "6151", "6530"]
    }
  };

  const canadianPostalPrefixes = {
    AB: ["T"],
    BC: ["V"],
    MB: ["R"],
    NB: ["E"],
    NL: ["A"],
    NT: ["X0E", "X0G", "X1A"],
    NS: ["B"],
    NU: ["X0A", "X0B", "X0C"],
    ON: ["K", "L", "M", "N", "P"],
    PE: ["C"],
    QC: ["G", "H", "J"],
    SK: ["S"],
    YT: ["Y"]
  };

  function makeUSZipCode(stateCode, seed) {
    const ranges = usZipPrefixRanges[stateCode];
    if (!ranges) return null;

    const rangeLength = ranges.reduce((total, [start, end]) => total + end - start + 1, 0);
    let offset = seed % rangeLength;
    let prefix;
    for (const [start, end] of ranges) {
      const length = end - start + 1;
      if (offset < length) {
        prefix = start + offset;
        break;
      }
      offset -= length;
    }

    const suffix = 1 + (Math.floor(seed / rangeLength) % 99);
    return `${String(prefix).padStart(3, "0")}${String(suffix).padStart(2, "0")}`;
  }

  function makeCanadianPostalCode(regionCode, seed) {
    const prefixes = canadianPostalPrefixes[regionCode];
    if (!prefixes) return null;

    const letters = "ABCEGHJKLMNPRSTVWXYZ";
    const prefix = prefixes[seed % prefixes.length];
    const firstThree = prefix.length === 3
      ? prefix
      : `${prefix}${1 + (Math.floor(seed / 7) % 9)}${letters[Math.floor(seed / 13) % letters.length]}`;
    const fourth = Math.floor(seed / 19) % 10;
    const fifth = letters[Math.floor(seed / 23) % letters.length];
    const sixth = Math.floor(seed / 29) % 10;
    return `${firstThree} ${fourth}${fifth}${sixth}`;
  }

  function makePostalCode(countryCode, regionCode, seed, fallback) {
    if (countryCode === "US") {
      return makeUSZipCode(regionCode, seed) || fallback || "10001";
    }
    if (countryCode === "CA") {
      return makeCanadianPostalCode(regionCode, seed) || fallback || "K1A 0B1";
    }

    const samples = regionPostalCodes[countryCode]?.[regionCode];
    if (samples?.length) {
      return samples[Math.floor(seed / 31) % samples.length];
    }
    return fallback || "";
  }

  function makeAddress(countryCode, requestedRegionCode, requestedRegionName) {
    const country = addresses[countryCode];
    if (!country) return null;

    if (requestedRegionCode) {
      const regionName = requestedRegionName ||
        country.variants.find((variant) => variant[5] === requestedRegionCode)?.[6] ||
        requestedRegionCode;
      const matchingVariant = country.variants.find(
        (variant) => variant[5] === requestedRegionCode
      );
      const storageKey = `shopifyTestAddress_${countryCode}_${requestedRegionCode}`;
      const previousSeed = sessionStorage.getItem(storageKey);
      let seed = Math.floor(Math.random() * 1000000);
      if (String(seed) === previousSeed) seed = (seed + 1) % 1000000;
      sessionStorage.setItem(storageKey, String(seed));

      const firstNames = ["Riley", "Jordan", "Casey", "Morgan", "Avery", "Taylor"];
      const lastNames = ["Sample", "Demo", "Test", "Example", "Fiction", "Practice"];
      const streetNames = ["Example Street", "Sample Road", "Fiction Avenue", "Demo Lane"];
      const firstName = firstNames[seed % firstNames.length];
      const lastName = lastNames[Math.floor(seed / firstNames.length) % lastNames.length];
      const addressNumber = 100 + (seed % 9900);
      const postalCode = makePostalCode(
        countryCode,
        requestedRegionCode,
        seed,
        matchingVariant?.[7]
      );
      const phoneSuffix = String(seed % 10000).padStart(4, "0");
      const phone = matchingVariant?.[8] || ({
        US: `202555${phoneSuffix}`,
        IN: `900000${phoneSuffix}`,
        GB: `0207946${phoneSuffix}`,
        CA: `416555${phoneSuffix}`,
        AU: `029555${phoneSuffix}`,
        DE: `030555${phoneSuffix}`
      })[countryCode];

      return {
        countryCode,
        countryName: country.countryName,
        firstName,
        lastName,
        address1: countryCode === "DE"
          ? `Beispielstrasse ${addressNumber}`
          : `${addressNumber} ${streetNames[Math.floor(seed / 17) % streetNames.length]}`,
        address2: countryCode === "DE" ? `Wohnung ${1 + (seed % 99)}` : `Unit ${1 + (seed % 99)}`,
        city: matchingVariant?.[4] || "Test City",
        regionCode: requestedRegionCode,
        regionName,
        postalCode,
        phone,
        email: `test.${countryCode.toLowerCase()}.${requestedRegionCode.toLowerCase()}.${seed}@example.com`
      };
    }

    const storageKey = `shopifyTestAddressVariant_${countryCode}`;
    const previous = Number(sessionStorage.getItem(storageKey));
    let index = Math.floor(Math.random() * country.variants.length);
    if (Number.isInteger(previous) && index === previous) {
      index = (index + 1) % country.variants.length;
    }
    sessionStorage.setItem(storageKey, String(index));

    const [firstName, lastName, address1, address2, city, regionCode, regionName, postalCode, phone] =
      country.variants[index];
    const addressPostalCode = makePostalCode(
      countryCode,
      regionCode,
      Math.floor(Math.random() * 1000000),
      postalCode
    );
    return {
      countryCode,
      countryName: country.countryName,
      firstName,
      lastName,
      address1,
      address2,
      city,
      regionCode,
      regionName,
      postalCode: addressPostalCode,
      phone,
      email: `test.${countryCode.toLowerCase()}${index + 1}@example.com`
    };
  }

  function setNativeValue(element, value) {
    const prototype = element instanceof HTMLSelectElement
      ? HTMLSelectElement.prototype
      : element instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
    if (setter) {
      setter.call(element, value);
    } else {
      element.value = value;
    }
    element.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    element.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }

  function findControls(type) {
    const patterns = {
      firstName: /first.*name|shipping.*given|billing.*given|given[-_]name/i,
      lastName: /last.*name|shipping.*family|billing.*family|family[-_]name/i,
      address1: /address.*(?:line|level)?[-_ ]?1|street.*address|shipping.*address/i,
      address2: /address.*(?:line|level)?[-_ ]?2|apartment|suite|unit/i,
      city: /city|town|address[-_. ]level2/i,
      region: /province|region|state|zone|address[-_. ]level1/i,
      postal: /postal|zip|pincode|postcode/i,
      phone: /phone|tel/i,
      email: /email/i,
      country: /country|countrycode/i
    };
    const pattern = patterns[type];
    if (!pattern) return [];

    const controls = Array.from(document.querySelectorAll("input, select, textarea, button, [role='combobox']"))
      .filter((element) => {
        if (element.disabled || element.readOnly || element.type === "hidden") return false;
        const labelledBy = element.getAttribute("aria-labelledby");
        const externalLabels = labelledBy
          ? labelledBy.split(/\s+/)
              .map((id) => document.getElementById(id)?.textContent)
              .filter(Boolean)
              .join(" ")
          : "";
        const attributes = [
          element.id,
          element.name,
          element.getAttribute("autocomplete"),
          element.getAttribute("placeholder"),
          element.getAttribute("aria-label"),
          externalLabels,
          element.textContent
        ].filter(Boolean).join(" ");
        const label = element.id
          ? document.querySelector(`label[for="${CSS.escape(element.id)}"]`)?.textContent
          : "";
        const searchable = `${attributes} ${label || ""}`;
        if (type === "country" && /phone|telephone|dial|calling code/i.test(searchable)) {
          return false;
        }
        if (type === "region" && /country/i.test(searchable)) return false;
        return pattern.test(searchable);
      });

    const exactPattern = type === "country"
      ? /(?:shipping_address.*country|shipping.*country|country.?region|country[-_ ]name)$/i
      : type === "region"
        ? /(?:shipping_address.*(?:province|region|state)|province|region|state|zone|address.level1)$/i
        : null;

    if (exactPattern) {
      controls.sort((left, right) => {
        const leftText = `${left.id || ""} ${left.name || ""} ${left.getAttribute("autocomplete") || ""} ${left.getAttribute("aria-label") || ""} ${left.getAttribute("aria-labelledby") || ""}`;
        const rightText = `${right.id || ""} ${right.name || ""} ${right.getAttribute("autocomplete") || ""} ${right.getAttribute("aria-label") || ""} ${right.getAttribute("aria-labelledby") || ""}`;
        return Number(exactPattern.test(rightText)) - Number(exactPattern.test(leftText));
      });
    }

    return controls;
  }

  function firstControl(type) {
    const controls = findControls(type);
    return controls.find((control) => control.offsetParent !== null) || controls[0];
  }

  function setInput(type, value) {
    const control = firstControl(type);
    if (!control) return false;
    setNativeValue(control, value);
    return true;
  }

  async function fillAddress(address) {
    const filled = [];
    const missing = [];
    const apply = (name, success) => (success ? filled : missing).push(name);

    apply("first name", setInput("firstName", address.firstName));
    apply("last name", setInput("lastName", address.lastName));
    apply("address", setInput("address1", address.address1));
    apply("apartment", setInput("address2", address.address2));
    apply("city", setInput("city", address.city));
    apply("postal code", setInput("postal", address.postalCode));
    apply("phone", setInput("phone", address.phone));
    apply("email", setInput("email", address.email));
    return { filled, missing };
  }

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type !== "FILL_SHOPIFY_TEST_ADDRESS_V7") return;

    const address = makeAddress(
      message.countryCode,
      message.regionCode,
      message.regionName
    );
    if (!address) {
      sendResponse({ message: "Unsupported country." });
      return;
    }

    (async () => {
      const result = await fillAddress(address);
      const summary = result.filled.length
        ? `Filled ${result.filled.length} fields with a randomized test address.`
        : "No checkout fields were filled.";
      sendResponse({
        message: result.missing.length
          ? `${summary} Not found or not selected: ${result.missing.join(", ")}.`
          : summary,
        address
      });
    })();

    return true;
  });
})();
