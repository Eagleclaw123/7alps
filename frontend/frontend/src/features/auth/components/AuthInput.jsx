const AuthInput = ({ label, type = "text", ...props }) => {
  return (
    <div>
      <label className="mb-2 block">{label}</label>

      <input
        type={type}
        {...props}
        className="w-full rounded-xl border border-[#CBD5E0] px-4 py-3 outline-none focus:border-[#0F6B3E]"
      />
    </div>
  );
};

export default AuthInput;
