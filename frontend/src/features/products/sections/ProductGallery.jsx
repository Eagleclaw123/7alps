const ProductGallery = ({ product }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#F8FAF8]">
      <img
        src={product.ProductImage}
        alt={product.ProductName}
        className="h-[550px] w-full object-cover"
      />
    </div>
  );
};

export default ProductGallery;
