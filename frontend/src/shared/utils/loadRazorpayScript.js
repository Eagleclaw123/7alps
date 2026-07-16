// Loads Razorpay's checkout.js exactly once, resolving with `window.Razorpay`.
let loadPromise = null;

export const loadRazorpayScript = () => {
  if (typeof window !== "undefined" && window.Razorpay) {
    return Promise.resolve(window.Razorpay);
  }

  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById("razorpay-checkout-script");
    if (existing) {
      existing.addEventListener("load", () => resolve(window.Razorpay));
      existing.addEventListener("error", () => reject(new Error("Failed to load Razorpay checkout script")));
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-checkout-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => {
      loadPromise = null;
      reject(new Error("Failed to load Razorpay checkout script"));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
};
