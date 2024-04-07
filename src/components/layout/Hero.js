import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="hero  md:mt-8 mb-5 md:mb-10 h-[400px] md:h-[450px] rounded-3xl flex align-bottom">
        <div className="py-8 md:py-12 flex flex-col justify-end ml-[7%] md:w-[50%] w-[80%]">
          <h1 className="text-4xl md:text-6xl font-regular text-white md:leading-[80px] w-full">
            Order your <br />
            favourite food here
          </h1>
          <p className="my-6 text-white  text-sm  md:text-base">
            Discover the ease of ordering from your favorite local restaurants
            or explore exciting new eateries in your area. With user-friendly
            features like customizable orders, real-time tracking, and secure
            payment options, YumYard ensures a hassle-free experience from start
            to finish.
          </p>
          <div className="flex gap-4  justify-start w-[150px]">
            <Link
              href={"/menu"}
              className="text-sm md:text-base flex justify-center bg-white font-semibold  text-gray-500 items-center gap-2  px-6 py-2 rounded-full"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
