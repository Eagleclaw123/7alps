import { FiArrowUpRight } from "react-icons/fi";

const FarmerToCustomer = () => {
  return (
    <section className="overflow-hidden bg-[#F4EDE2] text-[#211B17] pb-24">
      {/* =========================================================
          INTRO
      ========================================================= */}
      <div className="mx-auto max-w-[1700px] px-5 pb-16 sm:px-8 pt-20 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-7 flex items-center gap-4">
              <span className="font-ibm-mono text-[10px] font-medium uppercase tracking-[0.3em] text-[#A85F43]">
                02
              </span>

              <span className="h-px w-14 bg-[#A85F43]" />

              <span className="font-ibm-mono text-[10px] font-medium uppercase tracking-[0.3em] text-[#81776D]">
                The 7ALP connection
              </span>
            </div>

            <h2 className="mt-7 max-w-6xl font-manrope text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[1.0] tracking-[-0.09em]">
              From
              <br />
              <span className="ml-[8vw]">their</span>
              <br />
              <span className="text-[#C56B4E]">hands.</span>
            </h2>
          </div>

          <div className="flex items-end lg:col-span-3 lg:col-start-10">
            <p className="max-w-xs border-l border-[#C56B4E]/40 pl-5 font-manrope text-sm leading-7 text-[#756A62]">
              We believe the relationship between the farmer and the customer
              should be closer, clearer and more meaningful.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          MAIN VISUAL
      ========================================================= */}
      <div className="relative mx-auto max-w-[1700px] px-3 sm:px-6 lg:px-10">
        <div className="relative grid min-h-[650px] grid-cols-1 overflow-hidden md:grid-cols-2">
          {/* FARM IMAGE */}
          <div className="group relative min-h-[500px] overflow-hidden md:min-h-[700px]">
            <img
              src="https://res.cloudinary.com/dasvdkncm/image/upload/v1789744493/focused-male-gardener-growing-evergreen-plants-gray-haired-middle-aged-man-glasses-wearing-blue-shirt-apron-checking-small-thujas-greenhouse-commercial-gardening-summer-concept_glcrsi.jpg"
              alt="Farmers harvesting fresh herbs"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-7 sm:bottom-10 sm:left-10">
              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-white/70">
                Where it begins
              </span>

              <p className="mt-2 font-manrope text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl">
                The farm
              </p>
            </div>
          </div>

          {/* PRODUCT / CRAFT IMAGE */}
          <div className="group relative min-h-[500px] overflow-hidden bg-[#D8CCC0] md:min-h-[700px]">
            <img
              src="https://res.cloudinary.com/dasvdkncm/image/upload/v1789744777/powder-image_iro3xd.jpg"
              alt="Natural herbal ingredients and powders"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-7 sm:bottom-10 sm:left-10">
              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.3em] text-white/70">
                What we make
              </span>

              <p className="mt-2 font-manrope text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl">
                7ALP
              </p>
            </div>
          </div>

          {/* CENTER BRAND STATEMENT */}
          <div className="absolute left-1/2 top-1/2 z-20 flex h-[155px] w-[155px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F4EDE2] shadow-[0_20px_70px_rgba(33,27,23,0.18)] sm:h-[190px] sm:w-[190px]">
            <div className="text-center">
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.3em] text-[#756A62]">
                Direct
              </span>

              <div className="mx-auto my-3 h-px w-10 bg-[#C56B4E]" />

              <span className="block font-manrope text-xl font-medium tracking-[-0.05em] sm:text-2xl">
                Farm
                <br />
                to
                <br />
                You
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          FARM → 7ALP → CUSTOMER FLOW
      ========================================================= */}
      <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 md:py-16 lg:px-14">
        <div className="border-y border-[#D8CCC0] py-8 md:py-10">
          <div className="grid gap-7 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            {/* FARMER */}
            <div>
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.3em] text-[#91847A]">
                01 · Source
              </span>

              <h4 className="mt-2 font-manrope text-xl font-medium tracking-[-0.04em]">
                Farmers
              </h4>

              <p className="mt-2 max-w-xs font-manrope text-sm leading-6 text-[#756A62]">
                Ingredients begin with the people who grow them.
              </p>
            </div>

            {/* ARROW */}
            <div className="hidden md:block">
              <div className="flex items-center gap-3 text-[#C56B4E]">
                <span className="h-px w-12 bg-[#C56B4E]/50" />
                <FiArrowUpRight size={16} />
              </div>
            </div>

            {/* 7ALP */}
            <div>
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.3em] text-[#91847A]">
                02 · Preparation
              </span>

              <h4 className="mt-2 font-manrope text-xl font-medium tracking-[-0.04em]">
                7ALP
              </h4>

              <p className="mt-2 max-w-xs font-manrope text-sm leading-6 text-[#756A62]">
                We carefully process and prepare what nature provides.
              </p>
            </div>

            {/* ARROW */}
            <div className="hidden md:block">
              <div className="flex items-center gap-3 text-[#C56B4E]">
                <span className="h-px w-12 bg-[#C56B4E]/50" />
                <FiArrowUpRight size={16} />
              </div>
            </div>

            {/* CUSTOMER */}
            <div>
              <span className="font-ibm-mono text-[8px] uppercase tracking-[0.3em] text-[#91847A]">
                03 · Destination
              </span>

              <h4 className="mt-2 font-manrope text-xl font-medium tracking-[-0.04em]">
                You
              </h4>

              <p className="mt-2 max-w-xs font-manrope text-sm leading-6 text-[#756A62]">
                Natural products make their way from our hands to yours.
              </p>
            </div>
          </div>

          {/* MOBILE FLOW LINE */}
          <div className="mt-8 flex items-center gap-3 md:hidden">
            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#756A62]">
              Farmer
            </span>

            <span className="h-px flex-1 bg-[#C56B4E]/40" />

            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#C56B4E]">
              7ALP
            </span>

            <span className="h-px flex-1 bg-[#C56B4E]/40" />

            <span className="font-ibm-mono text-[8px] uppercase tracking-[0.25em] text-[#756A62]">
              You
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          CONNECTION STATEMENT
      ========================================================= */}
      <div className="mx-auto max-w-[1700px] px-5  sm:px-8 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          {/* LEFT */}
          <div className="lg:col-span-7">
            <h3 className="font-manrope text-[clamp(3.5rem,7vw,8rem)] font-medium leading-[0.82] tracking-[-0.08em]">
              No unnecessary
              <br />
              <span className="text-[#C56B4E]">distance.</span>
            </h3>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="font-manrope text-base leading-8 text-[#756A62]">
              Our model brings the farmer, the product and the customer into a
              more direct relationship.
            </p>

            <p className="mt-5 font-manrope text-base leading-8 text-[#756A62]">
              Ingredients are sourced, prepared and delivered through a
              carefully considered journey — with the origin never feeling
              disconnected from the final product.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 border-b border-[#211B17] pb-2">
              <span className="font-ibm-mono text-[9px] uppercase tracking-[0.25em]">
                Our model
              </span>

              <FiArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmerToCustomer;
