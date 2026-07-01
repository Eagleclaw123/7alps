import { MdOutlineStar } from "react-icons/md";
import {
  CARD_WIDTH,
  CARD_GAP,
  STEP,
  VIEWPORT_WIDTH,
  MOBILE_CARD_WIDTH,
  MOBILE_CARD_GAP,
  MOBILE_STEP,
  MOBILE_VIEWPORT_WIDTH,
  loopedProducts,
} from "../../../shared/constants/products";

const CarouselPanel = ({ index, animated, mobile = false }) => {
  const cw = mobile ? MOBILE_CARD_WIDTH : CARD_WIDTH;
  const cg = mobile ? MOBILE_CARD_GAP : CARD_GAP;
  const step = mobile ? MOBILE_STEP : STEP;
  const vw = mobile ? MOBILE_VIEWPORT_WIDTH : VIEWPORT_WIDTH;

  return (
    <div className="flex flex-col gap-3">
      <h2
        className={`text-white font-semibold ${mobile ? "text-[16px]" : "text-[22px]"}`}
      >
        Featured Products
      </h2>
      <div style={{ width: vw }} className="overflow-hidden">
        <div
          style={{
            display: "flex",
            gap: cg,
            transform: `translateX(${-(index * step)}px)`,
            transition: animated
              ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
        >
          {loopedProducts.map((product, i) => (
            <div
              key={i}
              style={{ minWidth: cw }}
              className="bg-white p-1 flex items-center gap-2 rounded-lg shadow-lg"
            >
              <div className="flex-shrink-0 bg-[#F4F4F4] p-1.5 rounded-md">
                <img
                  src={product.img}
                  alt={product.name}
                  className={`object-cover rounded-lg flex-shrink-0 ${mobile ? "w-12 h-12" : "w-20 h-20"}`}
                />
              </div>
              <div
                className={`text-black px-1.5 py-1 ${mobile ? "text-[10px]" : "text-xs"}`}
              >
                <h3
                  className={`font-semibold leading-snug ${mobile ? "text-[11px]" : "text-[16px]"}`}
                >
                  {product.name}
                </h3>
                <p
                  className={`text-gray-500 mt-0.5 leading-snug ${mobile ? "text-[9px]" : "text-[12px]"}`}
                >
                  {product.desc}
                </p>
                <button
                  className={`mt-1 bg-black text-white rounded-sm ${mobile ? "px-2 py-0.5 text-[8px]" : "px-3 py-1 text-[9px]"}`}
                >
                  See Details
                </button>
                <span
                  className={`text-black font-semibold block mt-0.5 flex justify-end items-center ${mobile ? "text-[9px]" : "text-[12px]"}`}
                >
                  <MdOutlineStar className="text-yellow-400 mr-0.5" />
                  4.5 (1.5k+)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselPanel;
