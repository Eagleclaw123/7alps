// src/shared/seo/seoConfig.js

const BASE_URL = import.meta.env.VITE_APP_URL || "https://www.7alps.com";

export const homeSEO = {
  title: "7ALP's | Natural Herbal Powders for Hair Care, Skin Care & Wellness",
  description:
    "7ALP's provides natural herbal powders for hair care, skincare, and wellness. We source quality ingredients directly from trusted farmers and supply customers, businesses, wholesalers, and global markets.",
  keywords:
    "Natural Herbal Powders, Hair Care, Skin Care, Wellness, Herbal Ingredients, Amla Powder, Moringa Powder, Ashwagandha, Herbal Supplier",
  url: `${BASE_URL}/`,
};

export const productsSEO = {
  title: "Herbal Products",
  description:
    "Browse our collection of natural herbal powders including Amla, Brahmi, Bhringraj, Moringa, Neem, Ashwagandha, Aloe Vera, Spirulina, and more for hair care, skincare, and wellness.",
  keywords:
    "Herbal Products, Amla Powder, Brahmi Powder, Moringa Powder, Ashwagandha, Aloe Vera Powder, Neem Powder, Herbal Ingredients",
  url: `${BASE_URL}/products`,
};

export const processSEO = {
  title: "Our Process",
  description:
    "Discover how 7ALP's sources herbs directly from trusted farmers, performs quality inspections, processes natural ingredients, and delivers herbal products worldwide.",
  keywords:
    "Herbal Manufacturing Process, Farmer Sourcing, Quality Inspection, Herbal Processing, Natural Ingredients",
  url: `${BASE_URL}/our-process`,
};

export const why7ALPsSEO = {
  title: "Why Choose 7ALP's",
  description:
    "Learn why businesses and customers choose 7ALP's for quality herbal powders, sustainable sourcing, reliable supply, and customer-focused service.",
  keywords:
    "Natural Herbal Supplier, Quality Herbal Products, Sustainable Sourcing, Herbal Manufacturer",
  url: `${BASE_URL}/why-choose-us`,
};

export const globalTradeSEO = {
  title: "Global Trade",
  description:
    "Supplying natural herbal powders and botanical ingredients to international markets through trusted sourcing, export operations, and global distribution.",
  keywords:
    "Global Trade, Herbal Exporter, Herbal Supplier, International Distribution, Bulk Herbal Powders",
  url: `${BASE_URL}/global-trade`,
};

export const partnershipsSEO = {
  title: "Partnerships",
  description:
    "Partner with 7ALP's for wholesale herbal products, B2B distribution, hospitality solutions, retail supply, and marketplace collaborations.",
  keywords:
    "B2B Herbal Supplier, Wholesale Herbal Products, Distribution Partner, Hospitality Supplier",
  url: `${BASE_URL}/partnerships`,
};

export const contactSEO = {
  title: "Contact Us",
  description:
    "Contact 7ALP's for product inquiries, bulk orders, wholesale partnerships, export opportunities, and customer support.",
  keywords:
    "Contact 7ALP's, Bulk Orders, Herbal Supplier, Wholesale Herbal Products",
  url: `${BASE_URL}/contact`,
};
