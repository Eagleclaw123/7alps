import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "Kumkumadi Radiance Oil",
    category: "Skincare",
    caseSize: "6/case",
    mrp: 1480,
    perCase: 4440,
    perUnit: 740,
    image:
      "https://res.cloudinary.com/dasvdkncm/image/upload/v1781964030/Rectangle_3463727_4_xmfzt6.png",
  },
  {
    id: 2,
    name: "Kumkumadi Radiance Oil",
    category: "Skincare",
    caseSize: "6/case",
    mrp: 1480,
    perCase: 4440,
    perUnit: 740,
    image:
      "https://res.cloudinary.com/dasvdkncm/image/upload/v1781964030/Rectangle_3463727_1_ylems5.png",
  },
  {
    id: 3,
    name: "Kumkumadi Radiance Oil",
    category: "Skincare",
    caseSize: "6/case",
    mrp: 1480,
    perCase: 4440,
    perUnit: 740,
    image:
      "https://res.cloudinary.com/dasvdkncm/image/upload/v1781964030/Rectangle_3463727_3_yqk6er.png",
  },
  {
    id: 4,
    name: "Kumkumadi Radiance Oil",
    category: "Skincare",
    caseSize: "6/case",
    mrp: 1480,
    perCase: 4440,
    perUnit: 740,
    image:
      "https://res.cloudinary.com/dasvdkncm/image/upload/v1781964030/Rectangle_3463727_tn3bsh.png",
  },
  {
    id: 5,
    name: "Kumkumadi Radiance Oil",
    category: "Skincare",
    caseSize: "6/case",
    mrp: 1480,
    perCase: 4440,
    perUnit: 740,
    image:
      "https://res.cloudinary.com/dasvdkncm/image/upload/v1781964030/Rectangle_3463727_2_utnlai.png",
  },
];

const GST_RATE = 0.18;

const OrderBuilder = () => {
  const [quantities, setQuantities] = useState(
    Object.fromEntries(initialProducts.map((p) => [p.id, 1])),
  );

  const updateQty = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const { subtotal, totalCases, totalUnits, gst, total } = useMemo(() => {
    let subtotal = 0;
    let totalCases = 0;

    initialProducts.forEach((p) => {
      const qty = quantities[p.id] || 0;
      subtotal += qty * p.perCase;
      totalCases += qty;
    });

    const gst = subtotal * GST_RATE;
    const total = subtotal + gst;
    const totalUnits = totalCases * 6;

    return { subtotal, totalCases, totalUnits, gst, total };
  }, [quantities]);

  const formatCurrency = (value) =>
    `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  return (
    <section className="bg-[#C8D7C2] px-6 py-16 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="max-w-2xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#047B22]" />
            <p className="font-ibm-mono text-[14px] font-semibold text-[#047B22] sm:text-[16px] md:text-[18px]">
              Wholesale tiers
            </p>
          </div>

          <h2 className="text-[26px] font-semibold leading-tight text-black sm:text-[32px] md:text-[40px] xl:text-[44px]">
            The more you stock,{" "}
            <span className="text-[#047B22]">the deeper the margin.</span>
          </h2>

          <p className="text-[14px] leading-6 text-gray-700 sm:text-[15px] sm:leading-7 md:text-[18px]">
            Prices below are per case at base wholesale. Add cases and your tier
            discount, GST and order total update live. Submit to receive a
            formal quote — no payment now.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Product table */}
          <div className="overflow-hidden rounded-xl bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#111827] text-white">
                    <th className="px-4 py-4 text-sm font-semibold sm:px-6">
                      Product
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold sm:px-6">
                      Case
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold sm:px-6">
                      Per case
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold sm:px-6">
                      Qty.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {initialProducts.map((p) => (
                    <tr key={p.id} className="border-b border-gray-100">
                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-black sm:text-[15px]">
                              {p.name}
                            </p>
                            <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                              {p.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 sm:px-6 sm:text-[15px]">
                        {p.caseSize}
                        <p className="text-xs text-gray-400">
                          MRP ₹{p.mrp.toLocaleString("en-IN")}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-black sm:px-6 sm:text-[15px]">
                        ₹{p.perCase.toLocaleString("en-IN")}
                        <p className="text-xs font-normal text-gray-400">
                          ₹{p.perUnit}/unit
                        </p>
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex w-fit items-center rounded-full border border-gray-200">
                          <button
                            type="button"
                            onClick={() => updateQty(p.id, -1)}
                            className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-black"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">
                            {quantities[p.id] || 0}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(p.id, 1)}
                            className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-black"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order summary */}
          <div className="rounded-xl bg-white p-6 sm:p-7">
            <h3 className="text-xl font-semibold text-black sm:text-2xl">
              Order summary
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {totalUnits} units · {totalCases} cases
            </p>

            <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between text-sm sm:text-[15px]">
                <span className="text-gray-600">Subtotal (base wholesale)</span>
                <span className="font-medium text-black">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-[15px]">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-medium text-black">
                  {formatCurrency(gst)}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
              <span className="text-base font-semibold text-black sm:text-lg">
                Total order
              </span>
              <span className="text-base font-semibold text-black sm:text-lg">
                {formatCurrency(total)}
              </span>
            </div>

            <div className="mt-5 rounded-lg bg-gray-50 p-4 text-xs leading-5 text-gray-600 sm:text-sm">
              <span className="font-semibold text-black">Note: </span>
              The minimum order value for all purchases is ₹25,000. This policy
              allows today
            </div>

            <button className="mt-5 w-full rounded-full bg-[#0E2C16] py-3 text-sm font-semibold text-white transition hover:bg-[#163b1f] sm:text-base">
              Request a quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderBuilder;
