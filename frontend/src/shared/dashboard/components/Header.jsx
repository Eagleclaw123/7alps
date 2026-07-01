import { FiMenu } from "react-icons/fi";

const Header = ({ title, subtitle, onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden">
          <FiMenu size={24} />
        </button>

        <div>
          <h1 className="text-2xl font-bold">{title}</h1>

          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
