"use client";

import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import ExploreMenu from "@/components/layout/ExploreMenu";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import Link from "next/link";
import Phone from "@/components/icons/Phone";
import Email from "@/components/icons/Email";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  function test(test) {
    setIsLoading(test);
  }
  console.log(isLoading);
  return (
    <>
      <Hero />
      <ExploreMenu test={test} />
      <HomeMenu test={test} />
      <section className=" my-10 text-start" id="about">
        <SectionHeaders mainHeader={"About us"} />
        <div className="flex flex-col-reverse md:grid md:grid-cols-[0.4fr_0.6fr] items-center gap-7 mb-[50px]">
          <div className="text-gray-500 mt-4 flex flex-col gap-7 text-sm md:text-base">
            <p>
              Welcome to YumYard, your ultimate destination for culinary
              convenience and gastronomic delight! At YumYard, we&#39;ve crafted
              a seamless food ordering experience designed to tantalize your
              taste buds and satisfy your cravings with just a few taps.
            </p>

            <p>
              Join our vibrant community of food enthusiasts and let YumYard
              elevate your dining experience. Whether it&#39;s a quick bite on
              the go, a cozy night in, or a gathering with friends, YumYard is
              your go-to platform for culinary convenience and culinary
              exploration. Download the app now and embark on a journey of
              flavor with YumYard!
            </p>
            <Link
              className="border border-primary rounded-full px-4 py-2 text-primary font-semibold text-center mt-3"
              href={"/menu"}
            >
              Go to menu
            </Link>
          </div>
          <div>
            <Image
              className="rounded-3xl"
              src="/about.png"
              width={700}
              height={700}
              alt="image"
              loading="lazy"
            />
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </section>
      <section className="text-start my-4 md:my-8" id="contact">
        <SectionHeaders mainHeader={"Contact us"} />
        <div className="mt-8 flex md:flex-row flex-col justify-center items-center gap-10 md:gap-20">
          <a
            className="md:text-2xl underline text-primary flex gap-3 items-center"
            href="tel:+46738123123"
          >
            <Phone className="md:w-8 md:h-8 w-5 h-5" />
            +46 738 123 123
          </a>
          <a
            className="md:text-2xl underline text-primary flex gap-2 items-center"
            href="mailto:yumyard@gmail.com"
          >
            <Email className="md:w-8 md:h-8 w-5 h-5" />
            yumyard@gmail.com
          </a>
        </div>
      </section>
    </>
  );
}
