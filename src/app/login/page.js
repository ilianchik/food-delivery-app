"use client";
import { useUserLoginWithGoogle } from "@/libs/Tanstack/queries";
import { signIn } from "next-auth/react";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloginWithCredentialsLoading, setIsloginWithCredentialsLoading] =
    useState(false);
  const { mutate: loginWithGoogle } = useUserLoginWithGoogle();
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  async function handleFormSubmit(ev) {
    setIsloginWithCredentialsLoading(true);
    ev.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    }).then((res) => {
      setLoginError(!res.ok);
      if (res.ok === true) {
        router.push("/");
        queryClient.invalidateQueries(["GET_USER_INFO"]);
      }
    });
    setIsloginWithCredentialsLoading(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      {loginError && (
        <div className="my-4 text-center">
          An error has occurred.
          <br />
          Please try again later
        </div>
      )}
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          disabled={isloginWithCredentialsLoading}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          disabled={isloginWithCredentialsLoading}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button disabled={isloginWithCredentialsLoading} type="submit">
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => loginWithGoogle()}
          className="flex gap-4 justify-center"
        >
          <Image
            src={"/google.png"}
            alt={""}
            width={24}
            height={24}
            loading="lazy"
          />
          Login with google
        </button>
      </form>
    </section>
  );
}
