import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";

import { subscribeToNewsletter } from "../../../shared/services/newsletter.service";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterBanner = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
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
      setError(
        err?.response?.data?.message ||
          "Unable to subscribe. Please try again.",
      );

      setStatus("error");
    }
  };

  return (
    <section className="border-t border-[#D8CCC0] bg-[#EAE0D4]">
      <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 md:py-28 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          {/* Copy */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.28em] text-[#C56B4E]">
                Stay close
              </span>
            </div>

            <h2 className="max-w-3xl font-manrope text-[clamp(2.8rem,5vw,5.5rem)] font-medium leading-[0.88] tracking-[-0.07em] text-[#211B17]">
              Better things
              <br />
              <span className="font-normal text-[#91847A]">in your inbox.</span>
            </h2>

            <p className="mt-6 max-w-xl font-manrope text-sm leading-7 text-[#756A62] md:text-base">
              Wellness notes, new products, and occasional updates from
              7ALP&apos;s.
            </p>
          </div>

          {/* Form */}
          <div>
            <div className="border-b border-[#211B17] pb-3">
              <div className="flex items-center gap-3">
                <Mail size={16} strokeWidth={1.3} className="text-[#91847A]" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    if (status === "error") {
                      setStatus("idle");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubscribe();
                    }
                  }}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 bg-transparent py-2 font-manrope text-sm text-[#211B17] outline-none placeholder:text-[#A79A90]"
                />

                <button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={status === "submitting"}
                  className="group flex shrink-0 items-center gap-3 bg-[#211B17] px-5 py-3 font-ibm-mono text-[8px] uppercase tracking-[0.15em] text-[#F4EDE2] transition-colors hover:bg-[#C56B4E] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending..." : "Subscribe"}

                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </div>

            {status === "error" && error ? (
              <p className="mt-4 font-manrope text-xs text-[#C56B4E]">
                {error}
              </p>
            ) : status === "success" ? (
              <p className="mt-4 font-manrope text-xs text-[#756A62]">
                You&apos;re subscribed. Welcome to the list.
              </p>
            ) : (
              <p className="mt-4 font-manrope text-xs text-[#91847A]">
                No spam. Just occasional wellness updates.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterBanner;
