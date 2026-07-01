const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  titleClassName = "",
  eyebrowClassName = "",
  descriptionClassName = "",
}) => {
  const alignmentClass = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-xl space-y-4 ${alignmentClass} ${className}`.trim()}>
      {eyebrow ? (
        <div className="flex items-center gap-2 justify-start">
          <div className="h-2 w-2 rounded-full bg-[#047B22]" />
          <p
            className={`text-[18px] text-[#047B22] font-ibm-mono font-semibold ${eyebrowClassName}`.trim()}
          >
            {eyebrow}
          </p>
        </div>
      ) : null}

      {title ? (
        <h2
          className={`text-[28px] md:text-[36px] xl:text-[40px] leading-tight font-semibold ${titleClassName}`.trim()}
        >
          {title}
        </h2>
      ) : null}

      {description ? (
        <p
          className={`text-[14px] md:text-[18px] xl:text-[20px] max-w-xl text-gray-600 ${descriptionClassName}`.trim()}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default SectionHeading;
