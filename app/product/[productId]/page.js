"use client";

import productsApis from "../../_utils/productsApis";
import React, { useEffect, useState } from "react";
import ProductInfo from "./_components/ProductInfo";
import ProductBanner from "./_components/ProductBanner";
import SimilarProducts from "./_components/SimilarProducts";
import Breadcrumb from "../../_components/Breadcrumb";

function Product({ params }) {
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [similarProduct, setSimilarProduct] = useState([]);
  useEffect(() => {
    getProductBuyID_();
    setIsLoading(false);
  }, []);
  const getProductBuyID_ = () => {
    productsApis.getProductBuyID(params?.productId).then((res) => {
      setProduct(res.data.data.attributes);
      getProductsByCategory_(res.data.data.attributes);
      setProductId(res.data.data);
    });
  };
  const getProductsByCategory_ = (product) => {
    productsApis.getProductsByCategory(product?.category).then((res) => {
      setSimilarProduct(res.data.data);
    });
  };
  return (
    <div className="product-page py-28">
      <div className="container">
        <Breadcrumb productName={product?.title} productID={productId?.id} />
        <div className="flex flex-col lg:flex-row justify-between mt-12 lg:items-center gap-4 ">
          <ProductBanner img={product?.image?.data?.attributes?.url} />
          <ProductInfo
            product={productId}
            title={product?.title}
            description={product?.description[0]?.children[0]?.text}
            category={product?.category}
            price={product?.price}
            instantDelivery={product?.instanDelivery}
          />
        </div>
        <h2 className="lg:mt-32 mt-14 text-3xl font-[700] mb-4">
          Similar Products
        </h2>
        <SimilarProducts products={similarProduct} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Product;
