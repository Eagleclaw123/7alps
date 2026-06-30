export const products = [
  {
    id: 1,
    name: "7ALP Aawla Powder",
    desc: "Boosts immunity, aids digestion, rich in antioxidants",
    img: "https://res.cloudinary.com/dasvdkncm/image/upload/v1781947627/image_36_ck23wp.png",
  },
  {
    id: 2,
    name: "7ALP Triphala Powder",
    desc: "Boosts immunity, aids digestion, rich in antioxidants",
    img: "https://res.cloudinary.com/dasvdkncm/image/upload/v1781947627/image_36_ck23wp.png",
  },
  {
    id: 3,
    name: "7ALP Ashwagandha",
    desc: "Reduces stress, boosts energy, supports muscle recovery",
    img: "https://res.cloudinary.com/dasvdkncm/image/upload/v1781947627/image_36_ck23wp.png",
  },
];

export const loopedProducts = [...products, ...products];

export const CARD_WIDTH = 300;
export const CARD_GAP = 12;
export const STEP = CARD_WIDTH + CARD_GAP;
export const PEEK = CARD_WIDTH / 2;
export const VIEWPORT_WIDTH = CARD_WIDTH + CARD_GAP + PEEK;

export const MOBILE_CARD_WIDTH = 220;
export const MOBILE_CARD_GAP = 8;
export const MOBILE_STEP = MOBILE_CARD_WIDTH + MOBILE_CARD_GAP;
export const MOBILE_PEEK = MOBILE_CARD_WIDTH / 2;
export const MOBILE_VIEWPORT_WIDTH =
  MOBILE_CARD_WIDTH + MOBILE_CARD_GAP + MOBILE_PEEK;
