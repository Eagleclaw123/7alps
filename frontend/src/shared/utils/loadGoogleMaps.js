// Loads the Google Maps JS API (+ Places library) exactly once, no matter how
// many components request it. Resolves with the `google.maps` namespace.
let loadPromise = null;

export const loadGoogleMaps = () => {
  if (typeof window !== "undefined" && window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      loadPromise = null;
      reject(new Error("Missing VITE_GOOGLE_MAPS_API_KEY in frontend/.env"));
      return;
    }

    const existing = document.getElementById("google-maps-script");
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google.maps));
      existing.addEventListener("error", () => reject(new Error("Failed to load Google Maps script")));
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = () => {
      loadPromise = null;
      reject(new Error("Failed to load Google Maps script"));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
};
