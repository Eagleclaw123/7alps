const AuthButton = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full rounded-xl bg-[#0F6B3E] py-3 font-medium text-white hover:bg-[#0C5933] mt-1"
    >
      {children}
    </button>
  );
};

export default AuthButton;
