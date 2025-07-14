"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, name, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      // Tự đăng nhập sau khi đăng ký
      await signIn("credentials", { email, password, callbackUrl: "/" });
    } else {
      alert("Email đã tồn tại");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Đăng ký</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <Button type="submit" className="w-full">
          Đăng ký
        </Button>
      </form>
      <p className="mt-4 text-center text-sm">
        Đã có tài khoản?{" "}
        <a href="/auth/login" className="text-blue-600 hover:underline">
          Đăng nhập
        </a>
      </p>
    </div>
  );
}
