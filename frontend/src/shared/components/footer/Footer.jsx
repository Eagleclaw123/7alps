import { LuInstagram, LuFacebook, LuTwitter, LuLinkedin } from "react-icons/lu";
import { FaLinkedin } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { CiMail, CiLocationOn } from "react-icons/ci";
import { motion } from "framer-motion";

// TODO: swap these placeholder social URLs for your real profile links
const socialMediaIconsInfo = [
  {
    icon: "https://res.cloudinary.com/dasvdkncm/image/upload/v1781970699/image_46_qhhum1.png",
    href: "https://instagram.com/",
    label: "Instagram",
  },
  {
    icon: "https://res.cloudinary.com/dasvdkncm/image/upload/v1781970828/image_47_crtmhd.png",
    href: "https://facebook.com/",
    label: "Facebook",
  },
  {
    icon: "https://res.cloudinary.com/dasvdkncm/image/upload/v1781970699/image_48_tmqj8v.png",
    href: "https://linkedin.com/",
    label: "LinkedIn",
  },
];

// TODO: point these at your real routes/section ids (e.g. "/about", "#about")
const cols = [
  {
    title: "Quick link",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "#about" },
      { label: "Products", href: "#products" },
      { label: "Global Trade", href: "#global-trade" },
      { label: "Industries We Serve", href: "#industries" },
      { label: "Contact Us", href: "#contact" },
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
      { label: "+91 79010 82907", href: "tel:+917901082907" },
      {
        label: "7alp.globalmark@gmail.com",
        href: "mailto:7alp.globalmark@gmail.com",
      },
      {
        label: "Madhapur, Hyderabad",
        href: "https://www.google.com/maps/search/?api=1&query=Madhapur%2C+Hyderabad",
      },
    ],
  },
  {
    title: "Follow Us",
    links: [],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const Footer = () => {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden bg-[#A77858] text-white">
      <div className="mx-auto max-w-7xl px-6 xl:px-0">
        <motion.div
          className="grid md:grid-cols-12 gap-10 pb-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {" "}
          <motion.div className="md:col-span-4" variants={itemVariants}>
            {" "}
            <div className="flex items-center gap-3">
              <div className="h-20 w-20 rounded-xl bg-background text-foreground flex items-center justify-center font-display font-bold">
                <img
                  src="https://res.cloudinary.com/dasvdkncm/image/upload/v1781664574/7_ALP_s_Logo-removebg-preview_e7kr1k.png"
                  alt="company-logo"
                />
              </div>
              <div className="text-[30px] font-semibold uppercase tracking-[0.1em]">
                7ALP's
              </div>
            </div>
            <p className="mt-5 text-white/80 hover:text-white transition-colors max-w-sm leading-relaxed">
              Premium herbal ingredients and wellness solutions sourced directly
              from farmers and delivered to consumers, businesses, and global
              partners.
            </p>
          </motion.div>
          {cols.map((c) => (
            <motion.div
              key={c.title}
              className="md:col-span-4 xl:col-span-2"
              variants={itemVariants}
            >
              {" "}
              <div className="text-[15px] uppercase tracking-[0.2em]">
                {c.title}
              </div>
              {c.title === "Follow Us" ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {socialMediaIconsInfo.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="h-10 w-10 flex items-center justify-center"
                    >
                      <img src={social.icon} alt={social.label} />
                    </a>
                  ))}
                </div>
              ) : (
                <ul className="mt-5 space-y-4">
                  {c.links.map((l, index) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={
                          l.href?.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          l.href?.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-[16px] text-white/80 hover:text-white transition-colors flex items-start gap-3"
                      >
                        {c.title === "Contact" && (
                          <>
                            {index === 0 && (
                              <FiPhone className="mt-1 text-lg shrink-0" />
                            )}
                            {index === 1 && (
                              <CiMail className="mt-1 text-xl shrink-0" />
                            )}
                            {index === 2 && (
                              <CiLocationOn className="mt-1 text-xl shrink-0" />
                            )}
                          </>
                        )}

                        <span>{l.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="pt-8 flex flex-col md:flex-row gap-3 items-center justify-between text-background/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {" "}
          <div>© {new Date().getFullYear()} 7 ALP's. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <a href="/privacy" className="hover:text-background">
              Privacy
            </a>
            <a href="/terms" className="hover:text-background">
              Terms
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
