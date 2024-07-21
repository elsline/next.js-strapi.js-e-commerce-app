import React from "react";

function Hero() {
  const styles = {
    backgroundImage: "url('/hero-bg.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <section style={styles} className="hero bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex ">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-[700] sm:text-5xl text-white">
            All Your Digital Products
            <strong className="font-[700] text-primary sm:block">
              Is One Click Away
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-white">
            Start Exploring State of the Art Assets Now!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full tr-4  rounded bg-primary px-12 py-3 text-sm font-[400] text-white shadow hover:bg-secondary focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              className="block w-full tr-4  rounded px-12 py-3 text-sm font-[400] text-white shadow hover:text-secondary  focus:outline-none focus:ring active:text-secondary border border-primary hover:border-secondary sm:w-auto "
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
