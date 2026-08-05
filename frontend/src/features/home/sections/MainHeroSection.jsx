// import { motion } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import { GoArrowRight } from "react-icons/go";
// import { MdOutlineStar } from "react-icons/md";
// import TrustBadge from "../../../shared/components/ui/TrustBadge";
// import { Link } from "react-router-dom";

// const profile1 =
//   "https://res.cloudinary.com/dasvdkncm/image/upload/v1762571953/memoji-emoji-handsome-smiling-man-white-background_826801-6987-removebg-preview_tj0s79.png";
// const profile2 =
//   "https://res.cloudinary.com/dasvdkncm/image/upload/v1762422091/219983-removebg-preview_awsz6b.png";

// const avatars = [profile1, profile1, profile2];

// const fadeUp = {
//   hidden: { opacity: 0, y: 25 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const products = [
//   {
//     id: 1,
//     name: "7ALP Aawla Powder",
//     desc: "Boosts immunity, aids digestion, rich in antioxidants",
//     img: "https://res.cloudinary.com/dasvdkncm/image/upload/v1781947627/image_36_ck23wp.png",
//   },
//   {
//     id: 2,
//     name: "7ALP Triphala Powder",
//     desc: "Boosts immunity, aids digestion, rich in antioxidants",
//     img: "https://res.cloudinary.com/dasvdkncm/image/upload/v1781947627/image_36_ck23wp.png",
//   },
//   {
//     id: 3,
//     name: "7ALP Ashwagandha",
//     desc: "Reduces stress, boosts energy, supports muscle recovery",
//     img: "https://res.cloudinary.com/dasvdkncm/image/upload/v1781947627/image_36_ck23wp.png",
//   },
// ];

// // Desktop card dimensions
// const CARD_WIDTH = 300;
// const CARD_GAP = 12;
// const STEP = CARD_WIDTH + CARD_GAP;
// const PEEK = CARD_WIDTH / 2;
// const VIEWPORT_WIDTH = CARD_WIDTH + CARD_GAP + PEEK;

// // Mobile card dimensions (smaller to fit screen)
// const MOBILE_CARD_WIDTH = 220;
// const MOBILE_CARD_GAP = 8;
// const MOBILE_STEP = MOBILE_CARD_WIDTH + MOBILE_CARD_GAP;
// const MOBILE_PEEK = MOBILE_CARD_WIDTH / 2;
// const MOBILE_VIEWPORT_WIDTH = MOBILE_CARD_WIDTH + MOBILE_CARD_GAP + MOBILE_PEEK;

// const loopedProducts = [...products, ...products];

// const CarouselPanel = ({ index, animated, mobile = false }) => {
//   const cw = mobile ? MOBILE_CARD_WIDTH : CARD_WIDTH;
//   const cg = mobile ? MOBILE_CARD_GAP : CARD_GAP;
//   const step = mobile ? MOBILE_STEP : STEP;
//   const vw = mobile ? MOBILE_VIEWPORT_WIDTH : VIEWPORT_WIDTH;

//   return (
//     <div className="flex flex-col gap-3">
//       <h2
//         className={`text-white font-semibold ${mobile ? "text-[16px]" : "text-[22px]"}`}
//       >
//         Featured Products
//       </h2>
//       <div style={{ width: vw }} className="overflow-hidden">
//         <div
//           style={{
//             display: "flex",
//             gap: cg,
//             transform: `translateX(${-(index * step)}px)`,
//             transition: animated
//               ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
//               : "none",
//           }}
//         >
//           {loopedProducts.map((product, i) => (
//             <div
//               key={i}
//               style={{ minWidth: cw }}
//               className="bg-white p-1 flex items-center gap-2 rounded-lg shadow-lg"
//             >
//               <div className="flex-shrink-0 bg-[#F4F4F4] p-1.5 rounded-md">
//                 <img
//                   src={product.img}
//                   alt={product.name}
//                   className={`object-cover rounded-lg flex-shrink-0 ${mobile ? "w-12 h-12" : "w-20 h-20"}`}
//                 />
//               </div>
//               <div
//                 className={`text-black px-1.5 py-1 ${mobile ? "text-[10px]" : "text-xs"}`}
//               >
//                 <h3
//                   className={`font-semibold leading-snug ${mobile ? "text-[11px]" : "text-[16px]"}`}
//                 >
//                   {product.name}
//                 </h3>
//                 <p
//                   className={`text-gray-500 mt-0.5 leading-snug ${mobile ? "text-[9px]" : "text-[12px]"}`}
//                 >
//                   {product.desc}
//                 </p>
//                 <button
//                   className={`mt-1 bg-black text-white rounded-sm ${mobile ? "px-2 py-0.5 text-[8px]" : "px-3 py-1 text-[9px]"}`}
//                 >
//                   See Details
//                 </button>
//                 <span
//                   className={`text-black font-semibold block mt-0.5 flex justify-end items-center ${mobile ? "text-[9px]" : "text-[12px]"}`}
//                 >
//                   <MdOutlineStar className="text-yellow-400 mr-0.5" />
//                   4.5 (1.5k+)
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const HeroSection = () => {
//   const [index, setIndex] = useState(0);
//   const [animated, setAnimated] = useState(true);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     timeoutRef.current = setTimeout(() => {
//       const nextIndex = index + 1;
//       if (nextIndex === products.length) {
//         setIndex(nextIndex);
//         setTimeout(() => {
//           setAnimated(false);
//           setIndex(0);
//           requestAnimationFrame(() =>
//             requestAnimationFrame(() => setAnimated(true)),
//           );
//         }, 650);
//       } else {
//         setIndex(nextIndex);
//       }
//     }, 2500);
//     return () => clearTimeout(timeoutRef.current);
//   }, [index]);

//   return (
//     <section>
//       <div className="relative h-[60vh] xl:h-screen overflow-hidden">
//         <img
//           src="https://res.cloudinary.com/dasvdkncm/image/upload/v1781939256/Rectangle_3463720_krmoj9.png"
//           alt="Organic Products"
//           className="absolute inset-0 h-[60vh] xl:h-full w-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/10" />

//         {/* ── MOBILE (below sm): compact col, everything fits in h-screen ── */}
//         <div className="sm:hidden absolute inset-0 flex flex-col justify-end pb-6 gap-4">
//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             className="px-4 text-center"
//           >
//             <TrustBadge avatars={avatars} />
//             <h1 className="mt-3 text-[26px] font-semibold leading-tight text-[#FFFED4]">
//               Nature's Goodness for a Healthier You
//             </h1>
//             <p className="mt-2 text-sm text-white/80">
//               Premium herbal ingredients and wellness solutions sourced directly
//               from farmers and delivered to consumers, businesses, and global
//               partners.
//             </p>
//             <div className="mt-4">
//               <Link to="/products">
//                 <button className="rounded-lg bg-white px-6 py-3 text-black">
//                   Explore <GoArrowRight className="inline ml-2" />
//                 </button>
//               </Link>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//             className="flex justify-end"
//           >
//             <CarouselPanel index={index} animated={animated} mobile={true} />
//           </motion.div>
//         </div>

//         {/* ── TABLET (sm–xl): col, bottom-pinned, normal cards, carousel right ── */}
//         <div className="hidden sm:flex xl:hidden absolute inset-0 flex-col justify-end pb-8 gap-6">
//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             className="px-8 md:px-6"
//           >
//             <TrustBadge avatars={avatars} />
//             <h1 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight text-[#FFFED4]">
//               Nature's Goodness for a Healthier You
//             </h1>
//             <p className="mt-3 text-base sm:text-lg text-white/80 max-w-xl">
//               Premium herbal ingredients and wellness solutions sourced directly
//               from farmers and delivered to consumers, businesses, and global
//               partners.
//             </p>
//             <div className="mt-5">
//               <Link to="/products">
//                 <button className="rounded-lg bg-white px-6 py-3 text-black">
//                   Explore <GoArrowRight className="inline ml-2" />
//                 </button>
//               </Link>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//             className="flex justify-end"
//           >
//             <CarouselPanel index={index} animated={animated} />
//           </motion.div>
//         </div>

//         {/* ── DESKTOP (xl+): headline bottom-left, carousel absolute bottom-right ── */}
//         <div className="hidden xl:block absolute inset-0">
//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             className="absolute bottom-10 left-18 max-w-5xl"
//           >
//             <TrustBadge avatars={avatars} />
//             <h1 className="mt-4 text-[46px] font-semibold leading-tight text-[#FFFED4]">
//               Nature's Goodness for a Healthier
//               <br /> You
//             </h1>
//             <p className="mt-6 text-[20px] text-white/80 max-w-xl">
//               7ALP turns time-tested Ayurvedic botanicals into clean,
//               exactly-dosed formulas for hair, skin, and daily wellbeing —
//               pressed fresh, never diluted, traced from root to bottle.
//             </p>
//             <div className="mt-6">
//               <Link to="/products">
//                 <button className="rounded-lg bg-white px-6 py-3 text-black">
//                   Explore <GoArrowRight className="inline ml-2" />
//                 </button>
//               </Link>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//             className="absolute bottom-10 right-0"
//           >
//             <CarouselPanel index={index} animated={animated} />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import { useNavigate } from "react-router-dom";
import { PiPlantLight } from "react-icons/pi";
import { MdVerified } from "react-icons/md";
import { GiFarmer } from "react-icons/gi";
import { CiGlobe } from "react-icons/ci";
import HeroSection from "../../../shared/components/hero/HeroSection";

const MainHeroSection = () => {
  const navigate = useNavigate();

  const buttons = [
    {
      label: "Explore Products",
      variant: "secondary",
      onClick: () => navigate("/products"),
    },
  ];

  return (
    <HeroSection
      backgroundImage="https://res.cloudinary.com/dasvdkncm/image/upload/v1781939256/Rectangle_3463720_krmoj9.png"
      badgeText="Wellness Collections"
      badgeColor="#fff"
      heading="Premium"
      headingHighlight="Herbal Ingredients for Natural Wellness"
      description="Premium herbal ingredients and wellness solutions sourced directly from farmers and delivered to consumers, businesses, and global partners."
      buttons={buttons}
      containerHeight="h-[60vh] xl:h-screen"
      textColor="text-white"
      overlayColor="bg-black/10"
    />
  );
};

export default MainHeroSection;
