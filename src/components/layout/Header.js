"use client";
import { CartContext } from "@/components/AppContext";
import Bars2 from "@/components/icons/Bars2";
import Cross from "@/components/icons/Cross";
import ShoppingCart from "@/components/icons/ShoppingCart";
import { useGetUserInfo } from "@/libs/Tanstack/queries";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Loader from "./Loader";

function AuthLinks({ status, userName }) {
  const { clearCart } = useContext(CartContext);
  if (status === "authenticated") {
    return (
      <>
        <Link href={"/profile"} className="whitespace-nowrap hidden md:block">
          Hello, {userName}
        </Link>
        <button
          onClick={() => {
            signOut();
            clearCart();
          }}
          className="border-primary text-primary rounded-full  px-8 py-2 hidden md:block"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link className="hidden md:block" href={"/login"}>
          Login
        </Link>
        <Link
          href={"/register"}
          className="border-primary border text-primary  rounded-full  px-8 py-2 hidden md:block"
        >
          Register
        </Link>
      </>
    );
  }
  if (status === "loading") {
    return <Loader />;
  }
}

export default function Header() {
  const { clearCart } = useContext(CartContext);
  const session = useSession();
  const status = session?.status;
  const { data: userData } = useGetUserInfo();
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const path = usePathname();
  console.log(status);

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  const handleMenuClick = (event) => {
    const target = event.target;

    // Перевірка, чи клікнуто на елемент меню
    if (target.classList.contains("element")) {
      // Закриття мобільного меню
      setMobileNavOpen(false);
    }
  };
  // useEffect(() => {
  //   mobileNavOpen
  //     ? document.body.classList.add("overflow-y-hidden")
  //     : document.body.classList.remove("overflow-y-hidden");
  // }, [mobileNavOpen]);
  return (
    <header className="">
      <div className="flex items-center md:hidden justify-between mb-3">
        <Link className="text-primary font-semibold text-2xl" href={"/"}>
          YumYard
        </Link>
        <div className="flex gap-8 items-center">
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => {
              setMobileNavOpen((prev) => !prev);
            }}
          >
            <Bars2 />
          </button>
        </div>
      </div>

      <div
        onClick={handleMenuClick}
        className={`md:hidden   grid grid-cols-[0.4fr_0.6fr] text-center h-[100dvh] w-[100vw] top-0 right-0 fixed justify-start  transition-all z-10 ${
          mobileNavOpen
            ? "translate-x-0 opacity-1 visible"
            : "translate-x-[100%] opacity-0 invisible"
        } `}
      >
        <div
          onClick={handleMenuClick}
          className="backdrop-blur-sm bg-white/60 element"
        ></div>
        <div className="flex flex-col gap-10 text-center pt-[50%] p-4 bg-gray-200 rounded-lg items-center  relative">
          <Cross className="w-6 h-6 absolute top-2 left-2 element" />
          {status === "authenticated" ? (
            <Link className="whitespace-nowrap element" href={"/profile"}>
              Profile
            </Link>
          ) : null}
          <Link className="element" href={"/"}>
            Home
          </Link>
          <Link className="element" href={"/menu"}>
            Menu
          </Link>
          <Link className="element" href={"/#about"}>
            About
          </Link>
          <Link className="element" href={"/#contact"}>
            Contact
          </Link>
          <div className="flex gap-5 justify-center absolute bottom-5 left-[50%] translate-x-[-50%]">
            {status === "authenticated" ? (
              <button
                onClick={() => {
                  signOut();
                  clearCart();
                }}
                className="border-primary text-primary rounded-full w-fit  px-6 py-2 element"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  className="border border-primary text-primary rounded-full w-fit  px-6 py-2 element"
                  href={"/login"}
                >
                  Login
                </Link>
                <Link
                  className="border border-primary text-primary rounded-full w-fit px-6 py-2 element"
                  href={"/register"}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between">
        <Link className="text-primary font-semibold text-4xl" href={"/"}>
          YumYard
        </Link>
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link
            className={
              path !== "/menu"
                ? "border-b-[3px] border-primary"
                : "hover:border-b-[3px] hover:border-primary"
            }
            href={"/"}
          >
            Home
          </Link>
          <Link
            className={
              path === "/menu"
                ? "border-b-[3px] border-primary"
                : "hover:border-b-[3px] hover:border-primary"
            }
            href={"/menu"}
          >
            Menu
          </Link>
          <Link
            className="hover:border-b-[3px] hover:border-primary"
            href={"/#about"}
          >
            About
          </Link>
          <Link
            className="hover:border-b-[3px] hover:border-primary"
            href={"/#contact"}
          >
            Contact
          </Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} />
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
