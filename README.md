# Address Filler

A Chrome Manifest V3 extension for development and store testing. It adds a country
selector and fills Shopify checkout fields with a randomized, clearly synthetic
address. It targets the shipping Country/Region and State/Province controls rather
than billing or phone-country selectors. Consecutive fills for the same country use
different address variants. The popup also offers states, provinces, territories,
and UK constituent countries for the selected country, plus a random option.
Choosing a region generates a synthetic address for that region.
Generated postal codes use the selected region's format and region-specific
samples or prefixes where available. These are synthetic test addresses and are
not guaranteed to be deliverable to a real street address.
The popup's Settings page includes light and dark themes and shows the active
keyboard shortcut for filling a fresh address.

## Supported countries

- United States
- India
- United Kingdom
- Canada
- Australia
- Germany

## Load in Chrome

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Choose **Load unpacked**.
4. Select this folder.
5. Open a Shopify development checkout.
6. Open the extension popup, choose a country, and select **Fill checkout**.
7. Open Settings from the gear button to select a theme or manage the shortcut;
   use **Back** to return to the address form.

The default shortcut is **Ctrl+Shift+Y** (or **Command+Shift+Y** on macOS). Use
**Change shortcut** in Settings to open Chrome's shortcut manager and assign a
different key. The shortcut fills a new address with the saved country and
state/province; it works while Chrome is focused and does not open the popup.

Only use this extension in development or test environments. Every address uses
reserved example names, domains, and street data; it must not be used for real
purchases.
