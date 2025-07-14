"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Đăng nhập</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <Button type="submit" className="w-full">
          Đăng nhập
        </Button>
      </form>
      <p className="mt-4 text-center text-sm">
        Chưa có tài khoản?{" "}
        <a href="/auth/register" className="text-blue-600 hover:underline">
          Đăng ký
        </a>
      </p>
    </div>
  );
}
