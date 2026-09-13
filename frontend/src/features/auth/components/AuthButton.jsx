const AuthButton = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="group mt-1 flex w-full items-center justify-between bg-[#211B17] px-5 py-4 font-ibm-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#F4EDE2] transition duration-300 hover:bg-[#C56B4E] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span>{children}</span>

      <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </button>
  );
};

export default AuthButton;
