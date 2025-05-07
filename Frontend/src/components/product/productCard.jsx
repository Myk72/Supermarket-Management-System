const ProductCard = ({ product, onClick = () => {} }) => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden shadow-sm w-1/6 cursor-pointer hover:shadow-lg transition-all duration-300" onClick={onClick}>
      <div className="shrink-0 overflow-hidden h-20">
        <img
          src={product?.image}
          alt={product?.name}
          className="object-cover size-full"
        />
      </div>

      <div className="text-xs flex justify-center flex-col gap-1 items-center p-2">
        <h3 className="font-bold text-blue-800 truncate w-full text-center">
          {product?.name}
        </h3>

        <span className="font-bold text-blue-600">${product?.price}</span>
        <span
          className={`text-sm text-gray-900 py-1 px-2 rounded-3xl
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
