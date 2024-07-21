import Image from "next/image";
import Header from "./_components/Header";
import ProductSection from "./_components/ProductSection";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <ProductSection />
    </main>
  );
}
