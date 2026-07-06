import ImageCarousel from "../../../shared/components/ui/ImageCarousel";

const ProductGallery = ({ product }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#F8FAF8]">
      <ImageCarousel
        images={product.ProductImages}
        alt={product.ProductName}
        imageClassName="h-[550px] w-full object-cover"
      />
    </div>
  );
};

export default ProductGallery;
