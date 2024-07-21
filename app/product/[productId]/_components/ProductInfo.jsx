"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import cartApis from "../../../_utils/cartApis";
import { CartContext } from "../../../_context/CartContext";

function ProductInfo(props) {

  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const handleAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [props.product?.id],
        },
      };
      cartApis.addToCart(data).then((res) => {
        setCart((oldCart) => [
          ...oldCart,
          {
            id: res?.data?.data?.id,
            product: props?.product,
          },
        ]);
      });
    }
  };
  return (
    <div className="flex flex-1 flex-col ">
      <h2 className="text-[32px] font-[700]">{props.title || <Skeleton />}</h2>
      <h3 className="text-[24px] text-black/40 font-[700]">
        {props.category || <Skeleton width={100} />}
      </h3>
      <p className="  my-2">{props.description || <Skeleton count={3} />}</p>
      {props.instantDelivery === true && (
        <span className="flex items-center gap-2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>
          instant Delivery
        </span>
      )}
      {props.price ? (
        <span className="text-3xl mt-4 mb-1 text-primary font-[700] ">
          ${props.price}
        </span>
      ) : (
        <Skeleton width={100} />
      )}
      {props.price ? (
        <button
          className="flex text-[22px]  gap-2 justify-center items-center lg:w-fit sm:w-fit mt-4 lg:mt-2 tr-4  hover:bg-secondary  rounded-[20px] border  px-4 py-3   text-white bg-primary  "
          onClick={() => handleAddToCart()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          Add to cart
        </button>
      ) : (
        <Skeleton width={150} height={30} />
      )}
    </div>
  );
}

export default ProductInfo;
