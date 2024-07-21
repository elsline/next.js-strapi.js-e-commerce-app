import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductItem({ product }) {
  return (
    <Link
      href={`/product/${product?.id}`}
      className="overflow-hidden "
    >
      <article className="overflow-hidden  rounded-lg shadow transition hover:shadow-lg  cursor-pointer  hover:translate-y-[-16px] tr-4">
        <Image
          src={product?.attributes?.image?.data?.attributes?.url}
          alt="banner"
          width={400}
          height={350}
          className="h-56 w-full object-cover"
        />

        <div className="bg-white p-4 sm:p-6">
          <span className="block text-xs text-gray-500">
            {product?.attributes?.category}
          </span>

          <h3 className="mt-0.5 text-lg font-[700] text-gray-900 line-clamp-1">
            {product?.attributes?.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm/relaxed text-gray-500">
            {product?.attributes?.description[0].children[0].text}
          </p>
          <p className="mt-4 line-clamp-3    text-[22px] text-end  text-black">
            <span className="text-black">$</span>
            {""}
            {product?.attributes?.price}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default ProductItem;
