import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";

const MobileToggle = ({ isOpen, onToggle }) => (
  <div className="lg:hidden flex justify-end">
    <button
      className="text-white bg-[#26262645] p-3 rounded-xl backdrop-blur-md"
      onClick={onToggle}
    >
      {isOpen ? (
        <AiOutlineMenuFold className="text-2xl" />
      ) : (
        <AiOutlineMenuUnfold className="text-2xl" />
      )}
    </button>
  </div>
);

export default MobileToggle;
