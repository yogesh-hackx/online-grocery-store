import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiRupee } from "react-icons/bi";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product._id}`}>
      <article className="flex flex-col gap-4 p-4 rounded-2xl items-center shadow-xl border-gray-200 border cursor-pointer">
        <div className="w-28 h-28 relative">
          <Image src={product.imgURLThumb} layout="fill" objectFit="contain" />
        </div>
        <h1 className="font-bold text-center">{product.name}</h1>
        <div className="card-bottom w-full min-w-fit flex justify-between gap-4 items-center">
          <h2 className="flex gap-3 text-xl">
            <p className="flex items-center font-semibold">
              <BiRupee />
              {product.sellingPrice}
            </p>
            <p className="line-through flex items-center text-lg text-gray-500">
              <BiRupee />
              {product.MRP}
            </p>
          </h2>
          <button className="text-white font-bold text-xl rounded-lg shadow-lg h-10 w-10 green-btn-gradient">
            +
          </button>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
