import { LuInstagram } from "react-icons/lu";
import { FiPhone, FiArrowUpRight } from "react-icons/fi";
import { CiMail, CiLocationOn } from "react-icons/ci";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Existing social/contact channels
const socialMediaIconsInfo = [
  {
    icon: LuInstagram,
    href: "https://www.instagram.com/7alps.official",
    label: "Instagram",
  },
  {
    icon: CiMail,
    href: "mailto:7alps.global@gmail.com",
    label: "Mail",
  },
];

const cols = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Our Process", href: "/our-process" },
      { label: "Why 7ALP's", href: "/why-7alps" },
      { label: "Global Trade", href: "/global-trade" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Hair Care Solutions", href: "#hair-care" },
      { label: "Skin Care Essentials", href: "#skin-care" },
      { label: "Health & Wellness", href: "#health-wellness" },
      { label: "Herbal Powders", href: "#herbal-powders" },
      { label: "Natural Ingredients", href: "#natural-ingredients" },
      { label: "Bulk Supply Solutions", href: "#bulk-supply" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "+91 77729 77750", href: "tel:+917772977750" },
      {
        label: "7alps.global@gmail.com",
        href: "mailto:7alps.global@gmail.com",
      },
      {
        label: "Madhapur, Hyderabad",
        href: "https://www.google.com/maps/search/?api=1&query=Madhapur%2C+Hyderabad",
      },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#171312] text-[#F4EDE2]">
      {/* Decorative giant 7 */}
      <div className="pointer-events-none absolute -right-10 -top-24 select-none font-manrope text-[360px] font-semibold leading-none tracking-[-0.12em] text-white/[0.025] md:text-[500px]">
        7
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Top CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-b border-white/10 py-20 md:py-28"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-12 bg-[#C56B4E]" />

                <span className="font-ibm-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                  Stay connected
                </span>
              </div>

              <h2 className="max-w-5xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.08em]">
                Good things
                <br />
                <span className="text-[#C56B4E]">start naturally.</span>
              </h2>
            </div>

            <p className="max-w-sm font-manrope text-sm leading-7 text-white/45 lg:pb-2">
              Premium herbal ingredients, thoughtful sourcing, and wellness
              solutions built with care from the ground up.
            </p>
          </div>
        </motion.div>

        {/* Main footer */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="
    grid
    gap-y-14
    py-14
    sm:grid-cols-2
    sm:gap-x-10
    sm:gap-y-16
    sm:py-16
    lg:grid-cols-12
    lg:gap-x-8
    lg:gap-y-0
    lg:py-20
    xl:gap-x-12
  "
        >
          {/* ================= BRAND ================= */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-2 lg:col-span-5 xl:col-span-4"
          >
            <div className="flex h-18 w-18 shrink-0 items-center justify-center sm:h-20 sm:w-20">
              <img
                src="https://res.cloudinary.com/dasvdkncm/image/upload/v1789824145/7_ALPs_logo-removebg-preview_rv98fm.png"
                alt="7ALP's"
                className="h-full w-full object-contain"
              />
            </div>

            <p className="mt-0 max-w-md font-manrope text-sm leading-7 text-white/45">
              Premium herbal ingredients and wellness solutions sourced directly
              from farmers and delivered to consumers, businesses, and global
              partners.
            </p>

            {/* Social */}
            <div className="mt-8 flex flex-wrap gap-3">
              {socialMediaIconsInfo.map((social) => {
                const Icon = social.icon;
                const isExternal = social.href?.startsWith("http");

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="
              group
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              text-white/70
              transition-all
              duration-300
              hover:border-[#C56B4E]
              hover:bg-[#C56B4E]
              hover:text-[#211B17]
              sm:h-11
              sm:w-11
            "
                  >
                    <Icon className="text-base transition-transform duration-300 group-hover:scale-110 sm:text-lg" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* ================= EXPLORE ================= */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-1 lg:col-span-2 lg:col-start-6 xl:col-start-5"
          >
            <p className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-white/35">
              Explore
            </p>

            <ul className="mt-6 space-y-3 sm:mt-7 sm:space-y-4">
              {cols[0].links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="
              group
              inline-flex
              max-w-full
              items-center
              gap-2
              font-manrope
              text-sm
              text-white/65
              transition-colors
              duration-300
              hover:text-[#C56B4E]
            "
                  >
                    <span className="truncate">{link.label}</span>

                    <FiArrowUpRight
                      size={12}
                      className="
                shrink-0
                opacity-0
                transition-all
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
                group-hover:opacity-100
              "
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ================= CATEGORIES ================= */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-1 lg:col-span-2"
          >
            <p className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-white/35">
              Categories
            </p>

            <ul className="mt-6 space-y-3 sm:mt-7 sm:space-y-4">
              {cols[1].links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="
              group
              inline-flex
              max-w-full
              items-center
              gap-2
              font-manrope
              text-sm
              text-white/65
              transition-colors
              duration-300
              hover:text-[#C56B4E]
            "
                  >
                    <span className="truncate">{link.label}</span>

                    <FiArrowUpRight
                      size={12}
                      className="
                shrink-0
                opacity-0
                transition-all
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
                group-hover:opacity-100
              "
                    />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ================= CONTACT ================= */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-2 lg:col-span-3 xl:col-span-3"
          >
            <p className="font-ibm-mono text-[9px] uppercase tracking-[0.25em] text-white/35">
              Contact
            </p>

            <ul className="mt-6 space-y-5 sm:mt-7">
              {/* Phone */}
              <li>
                <a
                  href="tel:+917772977750"
                  className="
            group
            flex
            items-start
            gap-3
            font-manrope
            text-sm
            text-white/65
            transition-colors
            duration-300
            hover:text-[#C56B4E]
          "
                >
                  <FiPhone className="mt-0.5 shrink-0" size={16} />

                  <span className="break-words">+91 77729 77750</span>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:7alps.global@gmail.com"
                  className="
            group
            flex
            min-w-0
            items-start
            gap-3
            font-manrope
            text-sm
            text-white/65
            transition-colors
            duration-300
            hover:text-[#C56B4E]
          "
                >
                  <CiMail className="mt-0.5 shrink-0 text-lg" />

                  <span className="break-all">7alps.global@gmail.com</span>
                </a>
              </li>

              {/* Location */}
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Madhapur%2C+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
            group
            flex
            items-start
            gap-3
            font-manrope
            text-sm
            text-white/65
            transition-colors
            duration-300
            hover:text-[#C56B4E]
          "
                >
                  <CiLocationOn className="mt-0.5 shrink-0 text-lg" />

                  <span>Madhapur, Hyderabad</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="font-ibm-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
              © {new Date().getFullYear()} 7ALP's. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="/privacy"
                className="font-ibm-mono text-[8px] uppercase tracking-[0.18em] text-white/30 transition-colors hover:text-white"
              >
                Privacy
              </a>

              <a
                href="/terms"
                className="font-ibm-mono text-[8px] uppercase tracking-[0.18em] text-white/30 transition-colors hover:text-white"
              >
                Terms
              </a>
            </div>

            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.18em] text-white/20">
              Rooted in nature
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
