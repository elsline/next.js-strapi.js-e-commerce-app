"use client";

import React, { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import productsApis from "../_utils/productsApis";

function ProductSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    getLatestProducts_();
    setIsLoading(false);
  }, []);

  const getLatestProducts_ = () => {
    productsApis.getLatestProducts().then((res) => {
      setProductsList(res.data.data);
    });
  };

  return (
    <div className="productSection container py-28">
      <h2 className=" text-5xl text-center font-[700] mb-14">
        <span className="text-primary ">Our</span> Latest Products
      </h2>

      <ProductsList productsList={productsList} isLoading={isLoading} />
    </div>
  );
}

export default ProductSection;
