import { useState } from "react";
import { FiMail } from "react-icons/fi";
import Button from "../../../shared/components/ui/Button";
import { subscribeToNewsletter } from "../../../shared/services/newsletter.service";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterBanner = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    setError("");

    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }

    try {
      setStatus("submitting");
      await subscribeToNewsletter(email.trim());
      setStatus("success");
      setEmail("");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to subscribe. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="overflow-hidden bg-gradient-to-r from-[#0F6B3E] via-[#178A50] to-[#1FA362]">
      <div className="flex flex-col items-center justify-between gap-10 py-12 lg:flex-row max-w-7xl mx-auto px-6 xl:px-0">
        {/* Left */}
        <div className="max-w-xl text-center lg:text-left">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <FiMail className="text-2xl text-white" />
          </div>

          <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
            Stay Connected with 7ALP's
          </h2>

          <p className="mt-4 text-base leading-7 text-white/90 md:text-lg">
            Subscribe to receive exclusive offers, wellness tips, and updates on
            our latest herbal products.
          </p>
        </div>

        {/* Right */}
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-2 shadow-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#047B22]"
              />

              <Button
                variant="primary"
                size="lg"
                className="whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleSubscribe}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
          </div>

          {status === "error" && error ? (
            <p className="mt-3 text-center text-sm text-white lg:text-left">
              {error}
            </p>
          ) : status === "success" ? (
            <p className="mt-3 text-center text-sm text-white lg:text-left">
              You're subscribed! Welcome to the list.
            </p>
          ) : (
            <p className="mt-3 text-center text-sm text-white/80 lg:text-left">
              No spam. Only wellness updates & exclusive offers.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterBanner;
