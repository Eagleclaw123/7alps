// src/app/components/PageLoader.jsx

const PageLoader = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      {/* Animated leaf/dot pulse */}
      <div className="flex gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#3F6B2C] [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#3F6B2C] [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#3F6B2C]" />
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#3F6B2C]">
        Loading
      </p>
    </div>
  );
};

export default PageLoader;
