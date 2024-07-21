"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { CartContext } from "../_context/CartContext";
import cartApis from "../_utils/cartApis";
import Cart from "../_components/Cart";

function Header() {
  const { cart, setCart } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [active, setActive] = useState("");
  const { user } = useUser();
  useEffect(() => {
    const url = window.location.href.toString();
    const loggedIn = url.includes("sign-up") || url.includes("sign-in");
    setIsLoggedIn(loggedIn);
  }, []);
  useEffect(() => {
    user && getCartItems();
  }, [user]);

  const getCartItems = () => {
    cartApis
      .getUserCartItems(user.primaryEmailAddress.emailAddress)
      .then((res) => {
        res.data.data.forEach((cartItem) => {
          console.log(cartItem?.attributes?.products?.data[0]);
          setCart((oldCart) => [
            ...oldCart,
            {
              id: cartItem.id,
              product: cartItem?.attributes?.products?.data[0],
            },
          ]);
        });
      });
  };
  const clickEvent = () => {
    setActive("!flex");
  };
  const clickEvent2 = () => {
    setActive("");
  };

  return (
    !isLoggedIn && (
      <header className="bg-white container ">
        <div className="  justify-center flex h-16  items-center gap-8 ">
          <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    {" "}
                    Home{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Explore{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Projects{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    About Us{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Contact Us{" "}
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {
                <>
                  <SignedOut>
                    <div className="sm:flex sm:gap-4">
                      <a
                        className="block rounded-md   bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary"
                        href="/sign-in"
                      >
                        Login
                      </a>

                      <a
                        className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition  hover:text-secondary sm:block"
                        href="/sign-up"
                      >
                        Register
                      </a>
                    </div>
                  </SignedOut>
                  <SignedIn>
                    <div className="flex items-center gap-2 font-[700]">
                      <div className="The-Cart ">
                        <div className="cart-icon relative">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-7 cursor-pointer"
                            onClick={() => clickEvent()}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                          </svg>
                          <Cart
                            className={`${active}`}
                            close={() => clickEvent2()}
                          />
                        </div>
                      </div>
                      <span className="font-[700] text-[18px]">{`( ${cart?.length} ) `}</span>
                    </div>
                    <div className="lg:flex hidden">
                      <UserButton showName />
                    </div>
                    <div className="lg:hidden flex">
                      <UserButton />
                    </div>
                  </SignedIn>
                </>
              }

              <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    )
  );
}

export default Header;
