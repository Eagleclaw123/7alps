import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({ label, ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="mb-2 block font-ibm-mono text-[9px] font-medium uppercase tracking-[0.2em] text-[#756A62]">
        {label}
      </label>

      <div className="relative border-b border-[#CFC2B5] focus-within:border-[#C56B4E]">
        <input
          type={show ? "text" : "password"}
          {...props}
          className="w-full border-0 bg-transparent px-0 py-3.5 pr-10 font-manrope text-sm text-[#211B17] outline-none placeholder:text-[#A99D93] focus:ring-0"
        />

        <button
          type="button"
          onClick={() => setShow((value) => !value)}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#756A62] transition hover:text-[#C56B4E]"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
