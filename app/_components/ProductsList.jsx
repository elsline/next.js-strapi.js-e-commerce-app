import React from "react";
import ProductItem from "./ProductItem";
import SkeletonCard2 from "../_components/SkeletonCard2";

function ProductsList({ productsList, isLoading }) {
  return (
    <div className="productsList gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading && <SkeletonCard2 height={225} cards={12} />}
      {productsList.map((item) => (
        <div className="product " key={item.id}>
          <ProductItem product={item} />
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
