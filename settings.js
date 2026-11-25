const themeSelect = document.querySelector("#theme");
const shortcutValue = document.querySelector("#shortcut");
const manageShortcutButton = document.querySelector("#manage-shortcut");
const backButton = document.querySelector("#settings-back");
const settingsStatus = document.querySelector("#settings-status") ||
  document.querySelector("#status");
let themeChanged = false;

function applyTheme(value) {
  const theme = value === "dark" ? "dark" : "light";
  const colors = theme === "dark"
    ? {
        "--page-background": "#202124",
        "--surface-background": "#303134",
        "--text-color": "#e8eaed",
        "--muted-color": "#bdc1c6",
        "--border-color": "#5f6368",
        "--accent-color": "#8ab4f8",
        "--accent-hover-color": "#aecbfa",
        "--button-text-color": "#202124",
        "--notice-color": "#f28b82"
      }
    : {
        "--page-background": "#f7f7f7",
        "--surface-background": "#ffffff",
        "--text-color": "#202124",
        "--muted-color": "#5f6368",
        "--border-color": "#c4c7cc",
        "--accent-color": "#155eef",
        "--accent-hover-color": "#104ec4",
        "--button-text-color": "#ffffff",
        "--notice-color": "#8a1c1c"
      };

  themeSelect.value = theme;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  for (const [property, color] of Object.entries(colors)) {
    document.documentElement.style.setProperty(property, color);
  }
}

async function initializeSettings() {
  try {
    const settings = await chrome.storage.local.get("testAddressTheme");
    if (!themeChanged) {
      applyTheme(settings.testAddressTheme);
    }
  } catch (error) {
    settingsStatus.textContent = error.message || "Unable to load saved settings.";
  }

  await updateShortcut();
}

async function updateShortcut() {
  try {
    const commands = await chrome.commands.getAll();
    const command = commands.find((item) => item.name === "fill-address");
    shortcutValue.textContent = command?.shortcut || "Not assigned";
  } catch (error) {
    shortcutValue.textContent = "Unavailable";
    settingsStatus.textContent = error.message || "Unable to load keyboard shortcuts.";
  }
}

initializeSettings();
window.addEventListener("focus", updateShortcut);

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.testAddressTheme) {
    themeChanged = true;
    applyTheme(changes.testAddressTheme.newValue);
  }
});

themeSelect.addEventListener("change", async () => {
  themeChanged = true;
  const theme = themeSelect.value === "dark" ? "dark" : "light";
  const previousTheme = document.documentElement.dataset.theme || "light";
  applyTheme(theme);
  try {
    await chrome.storage.local.set({ testAddressTheme: theme });
    settingsStatus.textContent = "Theme saved.";
  } catch (error) {
    applyTheme(previousTheme);
    settingsStatus.textContent = error.message || "Unable to save the theme.";
  }
});

manageShortcutButton.addEventListener("click", async () => {
  try {
    await chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
    settingsStatus.textContent = "Set the Address Filler shortcut on the Chrome shortcuts page.";
  } catch (error) {
    settingsStatus.textContent =
      `${error.message || "Unable to open Chrome shortcut settings."} ` +
      "Open chrome://extensions/shortcuts to change it.";
  }
});

backButton?.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.close();
  }
});
