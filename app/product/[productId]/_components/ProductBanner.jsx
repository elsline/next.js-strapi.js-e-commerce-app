import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";

function ProductBanner({ img }) {
  return (
    <div className=" flex-1 ">
      {img ? (
        <Image
          className="rounded-[16px]"
          src={img}
          alt="banner"
          width={650}
          height={200}
        />
      ) : (
        <>
          <div className="lg:block hidden">
            <Skeleton height={350} />
          </div>
          <div className="lg:hidden block">
            <Skeleton height={240} />
          </div>
        </>
      )}
    </div>
  );
}

export default ProductBanner;
