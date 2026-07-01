import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";

const PageNotFound = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F8FAF8] px-6">
      <div className="max-w-lg text-center">
        <h1 className="text-8xl font-bold text-[#008521]">404</h1>

        <h2 className="mt-4 text-3xl font-semibold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-600">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg bg-[#008521] px-6 py-3 text-white transition hover:bg-[#04681c]"
          >
            <FiHome />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 transition hover:bg-gray-100"
          >
            <FiArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
