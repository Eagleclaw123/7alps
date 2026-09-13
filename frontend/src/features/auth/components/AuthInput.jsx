const AuthInput = ({ label, type = "text", ...props }) => {
  return (
    <div>
      <label className="mb-2 block font-ibm-mono text-[9px] font-medium uppercase tracking-[0.2em] text-[#756A62]">
        {label}
      </label>

      <input
        type={type}
        {...props}
        className="w-full border-0 border-b border-[#CFC2B5] bg-transparent px-0 py-3.5 font-manrope text-sm text-[#211B17] outline-none placeholder:text-[#A99D93] focus:border-[#C56B4E] focus:ring-0"
      />
    </div>
  );
};

export default AuthInput;
