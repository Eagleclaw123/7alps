import { LuInstagram } from "react-icons/lu";
import { FiPhone, FiArrowUpRight } from "react-icons/fi";
import { CiMail, CiLocationOn } from "react-icons/ci";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// =====================================================
// SOCIAL MEDIA
// =====================================================

const socialMediaIconsInfo = [
  {
    icon: LuInstagram,
    href: "https://www.instagram.com/7alps.official",
    label: "Instagram",
  },
  {
    icon: CiMail,
    href: "mailto:7alp.global@gmail.com",
    label: "Mail",
  },
];

// =====================================================
// FOOTER NAVIGATION
// =====================================================

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
    title: "For Businesses",
    links: [
      {
        label: "B2B Login",
        href: "/b2b/login",
      },
      {
        label: "Request a Quote",
        href: "/b2b/request-quote",
      },
    ],
  },
];

// =====================================================
// ANIMATION
// =====================================================

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

// =====================================================
// REUSABLE FOOTER LINK
// =====================================================

const FooterLink = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="
        group
        inline-flex
        max-w-full
        items-center
        gap-2
        font-manrope
        text-sm
        leading-6
        text-white/65
        transition-colors
        duration-300
        hover:text-[#C56B4E]
      "
    >
      <span className="break-words">{label}</span>

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
  );
};

// =====================================================
// FOOTER COLUMN
// =====================================================

const FooterColumn = ({ title, links }) => {
  return (
    <div className="min-w-0">
      <p
        className="
          font-ibm-mono
          text-[9px]
          uppercase
          tracking-[0.25em]
          text-white/35
        "
      >
        {title}
      </p>

      <ul
        className="
          mt-5
          space-y-3
          sm:mt-6
          sm:space-y-4
        "
      >
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink to={link.href} label={link.label} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// =====================================================
// FOOTER
// =====================================================

const Footer = () => {
  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-[#171312]
        text-[#F4EDE2]
      "
    >
      {/* =====================================================
          DECORATIVE GIANT 7
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-20
          select-none
          font-manrope
          text-[300px]
          font-semibold
          leading-none
          tracking-[-0.12em]
          text-white/[0.025]
          sm:-right-10
          sm:-top-24
          sm:text-[400px]
          md:text-[500px]
        "
      >
        7
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1600px]
          px-5
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        {/* =====================================================
            TOP CTA
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            border-b
            border-white/10
            py-16
            sm:py-20
            md:py-24
            lg:py-28
          "
        >
          <div
            className="
              grid
              gap-8
              lg:grid-cols-[1fr_auto]
              lg:items-end
              lg:gap-12
            "
          >
            {/* Heading */}

            <div>
              <div className="mb-6 flex items-center gap-4 sm:mb-7">
                <span className="h-px w-10 bg-[#C56B4E] sm:w-12" />

                <span
                  className="
                    font-ibm-mono
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-white/45
                    sm:text-[10px]
                    sm:tracking-[0.28em]
                  "
                >
                  Stay connected
                </span>
              </div>

              <h2
                className="
                  max-w-5xl
                  font-manrope
                  text-[clamp(3rem,7vw,6.5rem)]
                  font-medium
                  leading-[0.95]
                  tracking-[-0.08em]
                "
              >
                Good things
                <br />
                <span className="text-[#C56B4E]">start naturally.</span>
              </h2>
            </div>

            {/* Description */}

            <p
              className="
                max-w-sm
                font-manrope
                text-sm
                leading-6
                text-white/45
                sm:leading-7
                lg:pb-2
              "
            >
              Premium herbal ingredients, thoughtful sourcing, and wellness
              solutions built with care from the ground up.
            </p>
          </div>
        </motion.div>

        {/* =====================================================
            FOOTER CONTENT
        ===================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="
            grid
            grid-cols-1
            gap-x-8
            gap-y-12
            py-14

            sm:grid-cols-2
            sm:gap-x-10
            sm:gap-y-14
            sm:py-16

            lg:grid-cols-12
            lg:gap-x-8
            lg:gap-y-14
            lg:py-20

            xl:gap-x-12
            xl:gap-y-0
          "
        >
          {/* =====================================================
              BRAND
          ===================================================== */}

          <motion.div
            variants={itemVariants}
            className="
              min-w-0

              sm:col-span-2

              lg:col-span-12

              xl:col-span-4
            "
          >
            <div
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center

                sm:h-20
                sm:w-20
              "
            >
              <img
                src="https://res.cloudinary.com/dasvdkncm/image/upload/v1789824145/7_ALPs_logo-removebg-preview_rv98fm.png"
                alt="7ALP's"
                className="h-full w-full object-contain"
              />
            </div>

            <p
              className="
                mt-3
                max-w-md
                font-manrope
                text-sm
                leading-6
                text-white/45
                sm:mt-4
                sm:leading-7
              "
            >
              Premium herbal ingredients and wellness solutions sourced directly
              from farmers and delivered to consumers, businesses, and global
              partners.
            </p>

            {/* Social */}

            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
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
                    <Icon
                      className="
                        text-base
                        transition-transform
                        duration-300
                        group-hover:scale-110
                        sm:text-lg
                      "
                    />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* =====================================================
              EXPLORE
          ===================================================== */}

          <motion.div
            variants={itemVariants}
            className="
              min-w-0

              sm:col-span-1

              lg:col-span-3

              xl:col-span-2
          "
          >
            <FooterColumn title={cols[0].title} links={cols[0].links} />
          </motion.div>

          {/* =====================================================
              CATEGORIES
          ===================================================== */}

          <motion.div
            variants={itemVariants}
            className="
              min-w-0

              sm:col-span-1

              lg:col-span-3

              xl:col-span-2
            "
          >
            <FooterColumn title={cols[1].title} links={cols[1].links} />
          </motion.div>

          {/* =====================================================
              FOR BUSINESSES
          ===================================================== */}

          <motion.div
            variants={itemVariants}
            className="
              min-w-0

              sm:col-span-1

              lg:col-span-3

              xl:col-span-2
            "
          >
            <FooterColumn title={cols[2].title} links={cols[2].links} />
          </motion.div>

          {/* =====================================================
              CONTACT
          ===================================================== */}

          <motion.div
            variants={itemVariants}
            className="
              min-w-0

              sm:col-span-1

              lg:col-span-3

              xl:col-span-2
            "
          >
            <p
              className="
                font-ibm-mono
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-white/35
              "
            >
              Contact
            </p>

            <ul
              className="
                mt-5
                space-y-4
                sm:mt-6
                sm:space-y-5
              "
            >
              {/* Phone */}

              <li>
                <a
                  href="tel:+917772977750"
                  className="
                    group
                    flex
                    min-w-0
                    items-start
                    gap-3
                    font-manrope
                    text-sm
                    leading-6
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
                  href="mailto:7alp.global@gmail.com"
                  className="
                    group
                    flex
                    min-w-0
                    items-start
                    gap-3
                    font-manrope
                    text-sm
                    leading-6
                    text-white/65
                    transition-colors
                    duration-300
                    hover:text-[#C56B4E]
                  "
                >
                  <CiMail className="mt-0.5 shrink-0 text-lg" />

                  <span className="break-all">7alp.global@gmail.com</span>
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
                    min-w-0
                    items-start
                    gap-3
                    font-manrope
                    text-sm
                    leading-6
                    text-white/65
                    transition-colors
                    duration-300
                    hover:text-[#C56B4E]
                  "
                >
                  <CiLocationOn className="mt-0.5 shrink-0 text-lg" />

                  <span className="break-words">
                    Madhapur, Hyderabad, India.
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div className="border-t border-white/10 py-6 sm:py-7">
          <div
            className="
              flex
              flex-col
              gap-4

              sm:gap-5

              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            {/* Copyright */}

            <p
              className="
                font-ibm-mono
                text-[8px]
                uppercase
                tracking-[0.18em]
                text-white/30
                sm:tracking-[0.2em]
              "
            >
              © {new Date().getFullYear()} 7ALP's. All rights reserved.
            </p>

            {/* Legal */}

            <div className="flex items-center gap-5 sm:gap-6">
              <Link
                to="/privacy"
                className="
                  font-ibm-mono
                  text-[8px]
                  uppercase
                  tracking-[0.16em]
                  text-white/30
                  transition-colors
                  hover:text-white
                  sm:tracking-[0.18em]
                "
              >
                Privacy
              </Link>

              <Link
                to="/terms"
                className="
                  font-ibm-mono
                  text-[8px]
                  uppercase
                  tracking-[0.16em]
                  text-white/30
                  transition-colors
                  hover:text-white
                  sm:tracking-[0.18em]
                "
              >
                Terms
              </Link>
            </div>

            {/* Tagline */}

            <span
              className="
                font-ibm-mono
                text-[8px]
                uppercase
                tracking-[0.16em]
                text-white/20
                sm:tracking-[0.18em]
              "
            >
              Rooted in nature
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
