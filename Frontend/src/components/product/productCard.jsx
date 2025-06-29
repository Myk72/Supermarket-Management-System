import { Barcode } from "lucide-react";
const ProductCard = ({ product, onClick = () => {} }) => {
  return (
    <div
      className="flex flex-col rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all duration-300 font-serif h-fit"
      onClick={onClick}
    >
      <div className="shrink-0 overflow-hidden h-24">
        <img
          src={product?.image}
          alt={product?.name}
          className="object-cover size-full hover:scale-105 transition-all duration-500"
        />
      </div>

      <div className="p-2 grid grid-cols-[1fr_auto] gap-x-4 items-start">
        <div>
          <h2 className="font-bold text-lg text-blue-800 truncate">
            {product?.name}
          </h2>
          <span className="text-gray-500 text-xs">
            {product?.category?.name}
          </span>
        </div>
        <div className="flex justify-end items-start">
          <span className="font-bold text-blue-600">${product?.price}</span>
        </div>

        <span className="text-xs text-gray-400 flex mt-1">
          <Barcode className="mr-1" size={14} />
          {product?.barcode}
        </span>
        <br />
        <span
          className={`mt-1 text-sm
      ${product?.status === "active" ? "text-green-600" : "text-red-600"}
    `}
        >
          {product?.status?.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
