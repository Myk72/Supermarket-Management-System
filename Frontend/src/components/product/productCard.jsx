const ProductCard = ({ product, onClick = () => {} }) => {
  return (
    <div
      className="flex flex-col rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all duration-300"
      onClick={onClick}
    >
      <div className="shrink-0 overflow-hidden h-20">
        <img
          src={product?.image}
          alt={product?.name}
          className="object-cover size-full hover:scale-105 transition-all duration-500"
        />
      </div>

      <div className="text-sm flex flex-col gap-1 p-2">
        <h3 className="font-bold text-blue-800 truncate w-full">
          {product?.name}
        </h3>

        <span className="font-bold text-blue-600">${product?.price}</span>
        <span
          className={`text-gray-900
            ${product?.status === "active" ? "text-green-600" : "text-red-600"}
            `}
        >
          {product?.status.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
