import TestimonialsCard from "../components/TestimonialsCard";
import testimonials from "../data/testimonials.json";

const topCards = testimonials.slice(0, 4);
const bottomCards = testimonials.slice(4, 8);

const Testimonials = () => {
  return (
    <section className="overflow-hidden mt-16">
      <div>
        <h2 className="text-[40px] mb-10 max-w-md mx-auto text-center font-semibold">
          See what our customers are saying
        </h2>
      </div>
      {/* Top Row - Right to Left */}
      <div className="mb-6 flex w-max animate-marquee-left gap-5">
        {[...topCards, ...topCards].map((item, index) => (
          <TestimonialsCard key={index} item={item} />
        ))}
      </div>

      {/* Bottom Row - Left to Right */}
      <div className="flex w-max animate-marquee-right gap-5">
        {[...bottomCards, ...bottomCards].map((item, index) => (
          <TestimonialsCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
