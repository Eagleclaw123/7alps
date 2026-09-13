const AuthLayout = ({ children }) => {
  return (
    <main className="min-h-screen bg-[#F4EDE2] text-[#211B17]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        {/* VISUAL SIDE */}
        <div className="relative hidden min-h-screen overflow-hidden lg:block">
          <img
            src="https://res.cloudinary.com/dasvdkncm/image/upload/v1781964030/Rectangle_3463727_tn3bsh.png"
            alt="7ALP herbal wellness"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#211B17]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#211B17]/90 via-[#211B17]/25 to-transparent" />

          <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 xl:p-14">
            <div className="flex items-center gap-3">
              <span className="font-manrope text-xl font-semibold tracking-[-0.05em] text-[#F4EDE2]">
                7ALP's
              </span>

              <span className="h-px w-8 bg-[#C56B4E]" />

              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-white/55">
                Herbal wellness
              </span>
            </div>

            <div className="max-w-xl">
              <p className="mb-6 font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-[#C56B4E]">
                Rooted in nature
              </p>

              <h1 className="font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.07em] text-[#F4EDE2]">
                Better
                <br />
                ingredients.
                <br />
                <span className="text-[#C56B4E]">Better living.</span>
              </h1>

              <p className="mt-8 max-w-md font-manrope text-sm leading-7 text-white/65">
                Premium herbal ingredients, carefully selected for everyday
                wellness.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/15 pt-5">
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-white/40">
                7ALP's
              </span>

              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-white/40">
                Pure / Honest / Natural
              </span>
            </div>
          </div>
        </div>

        {/* FORM SIDE */}
        <div className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-[500px]">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
