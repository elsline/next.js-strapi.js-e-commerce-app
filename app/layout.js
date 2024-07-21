"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { CartContext } from "./_context/CartContext";
import { useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

const roboto = Roboto({ subsets: ["latin"], weight: ["700", "400"] });

const metadata = {
  title: "E Commerce V2 ",
  description: "e commerce next.js app with strapi.js",
};

export default function RootLayout({ children }) {
  const [cart, setCart] = useState([]);
  return (
    <ClerkProvider>
      <CartContext.Provider value={{ cart, setCart }}>
        <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e6e6e6">
          <html lang="en">
            <head>
              <title>{metadata.title}</title>
              <meta name="description" content={metadata.description} />
              <link
                rel="icon"
                type="image/svg"
                sizes="32x32"
                href="/logo.svg"
              />
            </head>
            <body className={roboto.className}>
              <Header />
              {children}
            </body>
          </html>
        </SkeletonTheme>
      </CartContext.Provider>
    </ClerkProvider>
  );
}
