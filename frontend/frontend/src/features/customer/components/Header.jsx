import { FiBell, FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h1 className="text-2xl font-semibold">Customer Dashboard</h1>

        <p className="text-gray-500">Welcome back 👋</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden lg:block">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            placeholder="Search..."
            className="w-72 rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-[#0F6B3E]"
          />
        </div>

        <button className="relative rounded-xl bg-[#F4F8F5] p-3">
          <FiBell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?img=15"
            alt=""
            className="h-12 w-12 rounded-full"
          />

          <div className="hidden lg:block">
            <h3 className="font-semibold">Jayaram</h3>

            <p className="text-sm text-gray-500">Customer</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
