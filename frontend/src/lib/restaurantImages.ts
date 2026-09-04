export const IMAGE_COUNT = 10;

// Images live in /public/images/restaurants/img1.png ... img10.png
function imagePath(idx: number) {
  return `/images/restaurants/img${idx}.png`;
}

// Keep a per-restaurant random assignment stable for the browsing session,
// so a restaurant doesn't visually "flicker" between a different image on
// every re-render (grid -> detail page -> back to grid, etc). Refreshing
// the app (new page load) reshuffles everything.
const assignedImages = new Map<string, string>();

function randomImagePath() {
  const idx = Math.floor(Math.random() * IMAGE_COUNT) + 1; // 1..IMAGE_COUNT
  return imagePath(idx);
}

export function getRestaurantImage(restaurantId: number | string) {
  const key = String(restaurantId);
  const existing = assignedImages.get(key);
  if (existing) return existing;

  const image = randomImagePath();
  assignedImages.set(key, image);
  return image;
}
