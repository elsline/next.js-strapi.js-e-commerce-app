"use client";

import React, { useContext } from "react";
import { CartContext } from "../_context/CartContext";
import cartApis from "../_utils/cartApis";
import Link from "next/link";
import { useRouter } from "next/navigation";

function page() {
  const { cart, setCart } = useContext(CartContext);
  const cartLoop = cart.map((item) => {
    return (
      <li key={item?.id} className="flex items-center gap-4">
        <img
          src={item?.product?.attributes?.image?.data?.attributes?.url}
          alt=""
          className="lg:w-[300px] lg:h-[160px] size-[100px] rounded object-cover"
        />

        <div>
          <h3 className="lg:text-lg text-[16px] text-gray-900 font-bold">
            {item?.product?.attributes?.title}
          </h3>

          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
            <div className="flex flex-col gap-2">
              <dt className="inline font-bold">
                {item?.product?.attributes?.category}
              </dt>
              <dd className="inline lg:text-lg  text-[16px]  text-black font-bold ">
                ${item?.product?.attributes?.price}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <form>
            <label htmlFor="Line1Qty" className="sr-only">
              {" "}
              Quantity{" "}
            </label>

            <input
              type="number"
              min="1"
              value="1"
              id="Line1Qty"
              className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            />
          </form>

          <button
            onClick={() => deleteItem(item?.id)}
            className="text-gray-600 transition hover:text-red-600"
          >
            <span className="sr-only">Remove item</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </li>
    );
  });
  const DeleteCartsItems_ = (id) => {
    cartApis.DeleteCartsItems(id).then((res) => {
      if (res) {
        setCart((oldCart) =>
          oldCart.filter((item) => item.id !== res?.data?.data?.id)
        );
      }
      console.log(res);
    });
  };
  const deleteItem = (id) => {
    DeleteCartsItems_(id);
  };
  const getTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      totalAmount = totalAmount + Number(item?.product?.attributes?.price);
    });
    return totalAmount;
  };
  const router = useRouter();
  return (
    <section>
      <div className=" px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="container">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>
          <div className="mt-8">
            <ul className="space-y-4">{cartLoop}</ul>
            <div className="mt-8 mb-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex lg:justify-end justify-center  items-center gap-4 !text-base font-bold">
                    <dt>Total:</dt>
                    <dd className="text-2xl">${getTotalAmount().toFixed(2)}</dd>
                  </div>
                </dl>

                <div className="flex justify-end  ">
                  <button
                    onClick={() =>
                      router.push(`/checkout?amount=${getTotalAmount()}`)
                    }
                    className="block lg:w-fit w-full rounded bg-primary px-5 py-3 text-sm text-gray-100 transition hover:bg-secondary"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-x-0 bottom-0 ">
            <div className="bg-indigo-600 px-4 py-3 text-white">
              <p className="text-center text-sm font-medium">
                Note: All items will be sent via Email!{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
