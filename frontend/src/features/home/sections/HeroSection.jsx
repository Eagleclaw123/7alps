import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { MdOutlineStar } from "react-icons/md";
import products from "../../products/data/productsData.json";
import TrustBadge from "../../../shared/components/ui/TrustBadge";
import CarouselPanel from "../components/CarouselPanel";

const profile1 =
  "https://res.cloudinary.com/dasvdkncm/image/upload/v1762571953/memoji-emoji-handsome-smiling-man-white-background_826801-6987-removebg-preview_tj0s79.png";
const profile2 =
  "https://res.cloudinary.com/dasvdkncm/image/upload/v1762422091/219983-removebg-preview_awsz6b.png";

const avatars = [profile1, profile1, profile2];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [animated, setAnimated] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      const nextIndex = index + 1;
      if (nextIndex === products.length) {
        setIndex(nextIndex);
        setTimeout(() => {
          setAnimated(false);
          setIndex(0);
          requestAnimationFrame(() =>
            requestAnimationFrame(() => setAnimated(true)),
          );
        }, 650);
      } else {
        setIndex(nextIndex);
      }
    }, 2500);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <section>
      <div className="relative h-[60vh] xl:h-screen overflow-hidden">
        {/* Background */}
        <img
          src="https://res.cloudinary.com/dasvdkncm/image/upload/v1781939256/Rectangle_3463720_krmoj9.png"
          alt="Organic Products"
          className="absolute inset-0 h-[60vh] xl:h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />

        {/* ── MOBILE (below sm): compact col, everything fits in h-screen ── */}
        <div className="sm:hidden absolute inset-0 flex flex-col justify-end pb-6 gap-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="px-4 text-center"
          >
            <TrustBadge avatars={avatars} />
            <h1 className="mt-3 text-[26px] font-semibold leading-tight text-[#FFFED4]">
              From Nature's Roots to Everyday Wellness
            </h1>
            <p className="mt-2 text-sm text-white/80">
              Premium herbal ingredients and wellness solutions sourced directly
              from farmers and delivered to consumers, businesses, and global
              partners.
            </p>
            <div className="mt-4">
              <button className="rounded-lg bg-white px-5 py-2.5 text-black text-sm">
                Explore <GoArrowRight className="inline ml-1.5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-end"
          >
            <CarouselPanel index={index} animated={animated} mobile={true} />
          </motion.div>
        </div>

        {/* ── TABLET (sm–xl): col, bottom-pinned, normal cards, carousel right ── */}
        <div className="hidden sm:flex xl:hidden absolute inset-0 flex-col justify-end pb-8 gap-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="px-8 md:px-14"
          >
            <TrustBadge avatars={avatars} />
            <h1 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight text-[#FFFED4]">
              From Nature's Roots to Everyday Wellness
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/80 max-w-xl">
              Premium herbal ingredients and wellness solutions sourced directly
              from farmers and delivered to consumers, businesses, and global
              partners.
            </p>
            <div className="mt-5">
              <button className="rounded-lg bg-white px-6 py-3 text-black">
                Explore <GoArrowRight className="inline ml-2" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-end"
          >
            <CarouselPanel index={index} animated={animated} />
          </motion.div>
        </div>

        {/* ── DESKTOP (xl+): headline bottom-left, carousel absolute bottom-right ── */}
        <div className="hidden xl:block absolute inset-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="absolute bottom-10 left-16 max-w-5xl"
          >
            <TrustBadge avatars={avatars} />
            <h1 className="mt-4 text-[46px] font-semibold leading-tight text-[#FFFED4]">
              From Nature's Roots to Everyday <br /> Wellness
            </h1>
            <p className="mt-6 text-[20px] text-white/80 max-w-xl">
              Premium herbal ingredients and wellness solutions sourced directly
              from farmers and delivered to consumers, businesses, and global
              partners.
            </p>
            <div className="mt-6">
              <button className="rounded-lg bg-white px-6 py-3 text-black">
                Explore <GoArrowRight className="inline ml-2" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-10 right-0"
          >
            <CarouselPanel index={index} animated={animated} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
