const AuthLayout = ({ children }) => {
  return (
    <section>
      <div className="mx-auto grid min-h-screen max-w-8xl lg:grid-cols-2 gap-10">
        {/* Left Side */}
        <div className="relative hidden overflow-hidden bg-[#0F6B3E] lg:flex">
          <img
            src="https://res.cloudinary.com/dasvdkncm/image/upload/v1781964030/Rectangle_3463727_tn3bsh.png"
            alt="Nature"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />

          <div className="relative z-10 flex flex-col justify-center p-16 text-white">
            <h1 className="text-5xl font-bold leading-tight">
              Nature's Finest,
              <br />
              Delivered with Trust.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-white/90">
              Join thousands of customers and businesses choosing premium herbal
              powders sourced directly from trusted farmers.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-8">{children}</div>
      </div>
    </section>
  );
};

export default AuthLayout;
