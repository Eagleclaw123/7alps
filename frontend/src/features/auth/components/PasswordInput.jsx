import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({ label, ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="mb-2 block">{label}</label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          {...props}
          className="w-full rounded-xl border border-[#CBD5E0] px-4 py-3 pr-12"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          {show ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
