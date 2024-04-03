"use client";
import {
  useUserLoginWithCredentials,
  useUserLoginWithGoogle,
} from "@/libs/Tanstack/queries";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    mutate: loginWithCredentials,
    isPending: isloginWithCredentialsLoading,
  } = useUserLoginWithCredentials();
  const { mutate: loginWithGoogle } = useUserLoginWithGoogle();

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    loginWithCredentials({ email, password });
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
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
          <Image src={"/google.png"} alt={""} width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  );
}
