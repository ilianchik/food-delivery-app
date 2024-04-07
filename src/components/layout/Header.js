"use client";
import { CartContext } from "@/components/AppContext";
import Bars2 from "@/components/icons/Bars2";
import ShoppingCart from "@/components/icons/ShoppingCart";
import { useGetUserInfo } from "@/libs/Tanstack/queries";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import Loader from "./Loader";

function AuthLinks({ status, userName }) {
  const { clearCart } = useContext(CartContext);
  if (status === "authenticated") {
    return (
      <>
        <Link href={"/profile"} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => {
            signOut();
            clearCart();
          }}
          className="border-primary text-primary rounded-full  px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link href={"/login"}>Login</Link>
        <Link
          href={"/register"}
          className="border-primary border text-primary  rounded-full  px-8 py-2"
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
  return (
    <header>
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
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
        >
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}
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
