/** TestFlight links are beta builds, so they are not labelled as the App Store. */
export function getAppleStoreLabel(url, t) {
  if (!url) return "App Store";
  return url.includes("testflight.apple.com") ? t.project.testflight : "App Store";
}
