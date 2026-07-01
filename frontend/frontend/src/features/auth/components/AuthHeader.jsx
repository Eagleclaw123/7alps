const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-semibold">{title}</h1>

      <p className="mt-2 text-gray-500">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;
