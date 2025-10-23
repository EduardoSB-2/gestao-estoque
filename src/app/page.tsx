"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Tentando login com:", email, senha);

    if (email === "admin123@gmail.com" && senha === "123456") {
      alert("Login realizado com sucesso!");
      window.location.href = "/dashboard"; 
    } else {
      alert("Usuário ou senha incorretos.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100 mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="exemplo@bistro.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mt-6">
          © 2025 Almoxarifado
        </p>
      </div>
    </main>
  );
}
