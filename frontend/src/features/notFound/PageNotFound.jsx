import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";

const PageNotFound = () => {
  return (
    <main className="relative h-[100dvh] overflow-hidden bg-[#F4EDE2] text-[#211B17]">
      {/* Background 404 */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="select-none whitespace-nowrap font-manrope text-[42vw] font-semibold leading-none tracking-[-0.14em] text-[#211B17]/[0.035]">
          404
        </span>
      </div>

      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="mx-auto flex h-24 max-w-[1600px] items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-16">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center">
              <img
                src="https://res.cloudinary.com/dasvdkncm/image/upload/v1789824060/7_ALPs_logo_q69vip.jpg"
                alt="7ALP's"
                className="h-full w-full object-contain rounded-xl"
              />
            </div>

            <span className="font-manrope text-lg font-semibold tracking-[-0.05em]">
              7ALP's
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden h-px w-8 bg-[#C56B4E] sm:block" />
            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.3em] text-[#91847A]">
              Page / Not Found
            </span>
          </div>
        </div>
      </header>

      {/* =====================================================
          SINGLE VIEWPORT CONTENT
      ====================================================== */}
      <section className="relative z-10 h-full px-6 pb-16 pt-24 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto grid h-full max-w-[1600px] items-center lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 xl:gap-24">
          {/* LEFT */}
          <div className="min-w-0">
            <div className="mb-5 flex items-center gap-3">
              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.32em] text-[#C56B4E]">
                Error 404
              </span>

              <span className="h-px w-10 bg-[#C56B4E]/50" />
            </div>

            {/* 404 */}
            <h1 className="font-manrope text-[clamp(7rem,15vw,15rem)] font-semibold leading-[0.68] tracking-[-0.12em]">
              <span>4</span>
              <span className="text-[#C56B4E]">0</span>
              <span>4</span>
            </h1>

            {/* Text */}
            <div className="mt-12 grid gap-6 sm:grid-cols-[32px_1fr]">
              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-[#91847A]">
                01
              </span>

              <div>
                <h2 className="max-w-xl font-manrope text-[clamp(2.4rem,4.5vw,5rem)] font-medium leading-[0.88] tracking-[-0.065em]">
                  You've wandered
                  <br />
                  <span className="text-[#756A62]">off the path.</span>
                </h2>

                <p className="mt-5 max-w-md font-manrope text-sm leading-6 text-[#756A62]">
                  This page isn't part of our journey anymore. Let's take you
                  back to somewhere useful.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <Link
                    to="/"
                    className="group flex items-center gap-7 bg-[#211B17] px-5 py-3.5 font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#F4EDE2] transition-colors duration-300 hover:bg-[#C56B4E]"
                  >
                    <span>Back to Home</span>

                    <FiArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="group flex items-center gap-2 font-ibm-mono text-[9px] uppercase tracking-[0.2em] text-[#756A62] transition-colors duration-300 hover:text-[#C56B4E]"
                  >
                    <FiArrowLeft
                      size={14}
                      className="transition-transform duration-300 group-hover:-translate-x-1"
                    />
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative hidden h-full items-center justify-end lg:flex">
            <div className="relative h-[min(68vh,620px)] w-[min(40vw,500px)] overflow-hidden bg-[#DED0C1]">
              <img
                src="https://cosmesiglobal.com/cdn/shop/collections/Herbal_Powders.png?v=1766742666&width=1500"
                alt="7ALP herbal powders"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#211B17]/40 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="border-t border-white/30 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-ibm-mono text-[8px] uppercase tracking-[0.28em] text-white/80">
                      7ALP's
                    </span>

                    <span className="font-ibm-mono text-[8px] uppercase tracking-[0.28em] text-white/60">
                      Natural Wellness
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clay 7 */}
            <div className="absolute bottom-[8%] left-[2%] flex h-20 w-20 items-center justify-center bg-[#C56B4E]">
              <span className="font-manrope text-2xl font-medium text-white">
                7
              </span>
            </div>

            {/* Vertical label */}
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2">
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.3em] text-[#91847A] [writing-mode:vertical-rl]">
                Return / Explore / Discover
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-30">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between border-t border-[#211B17]/10 px-6 py-4 sm:px-8 lg:px-12 xl:px-16">
          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.28em] text-[#A0958D]">
            Natural / Honest / Pure
          </span>

          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.28em] text-[#A0958D]">
            7ALP's © 2026
          </span>
        </div>
      </footer>
    </main>
  );
};
export default PageNotFound;
