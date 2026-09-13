const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-9">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-[#C56B4E]" />

        <span className="font-ibm-mono text-[9px] uppercase tracking-[0.28em] text-[#C56B4E]">
          7ALP's
        </span>
      </div>

      <h1 className="font-manrope text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[0.9] tracking-[-0.065em] text-[#211B17]">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-5 max-w-md font-manrope text-sm leading-6 text-[#756A62]">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default AuthHeader;
