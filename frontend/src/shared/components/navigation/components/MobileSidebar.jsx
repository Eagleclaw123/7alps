import { Link } from "react-router-dom";
import { FiX, FiArrowUpRight } from "react-icons/fi";
import { navItems } from "./navItems";

const MobileSidebar = ({ isOpen, onClose, isActive }) => (
  <>
    {/* Overlay */}
    <div
      className={`
        fixed
        inset-0
        z-40
        bg-[#171312]/55
        backdrop-blur-[3px]
        transition-all
        duration-500
        ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }
      `}
      onClick={onClose}
    />

    {/* Sidebar */}
    <aside
      className={`
        fixed
        left-0
        top-0
        z-[55]
        flex
        h-full
        w-[min(88vw,400px)]
        flex-col
        justify-between
        overflow-hidden
        bg-[#F4EDE2]
        text-[#211B17]
        shadow-[25px_0_70px_rgba(23,19,18,0.18)]
        transition-transform
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Decorative 7 */}
      <div className="pointer-events-none absolute -right-20 top-20 select-none font-manrope text-[300px] font-semibold leading-none tracking-[-0.12em] text-[#211B17]/[0.025]">
        7
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D8CDC2] p-4">
          {/* LOGO + BRAND */}
          <Link
            to="/"
            onClick={onClose}
            className="group flex items-center gap-3"
          >
            <div className="flex h-20 w-20 items-center justify-center p-2  transition-transform duration-300 group-hover:scale-105">
              <img
                src="https://res.cloudinary.com/dasvdkncm/image/upload/v1789824060/7_ALPs_logo_q69vip.jpg"
                alt="7ALP's"
                className="h-full w-full object-contain rounded-full"
              />
            </div>
          </Link>

          {/* CLOSE */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[#D8CDC2]
              text-[#211B17]
              transition-all
              duration-300
              hover:border-[#C56B4E]
              hover:bg-[#C56B4E]
              hover:text-white
            "
          >
            <FiX size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-6 py-9">
          <div className="mb-6 flex items-center justify-between">
            <p className="font-ibm-mono text-[9px] uppercase tracking-[0.28em] text-[#A09288]">
              Menu
            </p>

            <span className="font-ibm-mono text-[8px] tracking-[0.15em] text-[#B0A299]">
              7ALP / 2026
            </span>
          </div>

          <div>
            {navItems.map((item, index) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    group
                    flex
                    items-center
                    justify-between
                    border-b
                    border-[#D8CDC2]
                    py-5
                    transition-all
                    duration-300
                    ${
                      active
                        ? "text-[#C56B4E]"
                        : "text-[#211B17] hover:text-[#C56B4E]"
                    }
                  `}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={`
                        font-ibm-mono
                        text-[8px]
                        tracking-[0.18em]
                        ${active ? "text-[#C56B4E]" : "text-[#A09288]"}
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="font-manrope text-[18px] font-medium tracking-[-0.02em]">
                      {item.label}
                    </span>
                  </div>

                  <span
                    className={`
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      transition-all
                      duration-300
                      ${
                        active
                          ? "border-[#C56B4E] bg-[#C56B4E] text-white"
                          : "border-transparent text-[#A09288] group-hover:border-[#C56B4E] group-hover:text-[#C56B4E]"
                      }
                    `}
                  >
                    <FiArrowUpRight size={15} />
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Bottom */}
      <div className="relative z-10 border-t border-[#D8CDC2] px-6 py-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-manrope text-sm font-medium text-[#514740]">
              Natural wellness.
            </p>

            <p className="mt-1 max-w-[210px] font-manrope text-xs leading-5 text-[#95887F]">
              Premium herbal ingredients sourced with care.
            </p>
          </div>

          <span className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-[#95887F]">
            {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </aside>
  </>
);

export default MobileSidebar;
