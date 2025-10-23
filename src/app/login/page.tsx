// src/app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    try {
      const res = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error || "Erro ao autenticar");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", data.nome);
      router.push("/dashboard");
    } catch (err) {
      setErro("Erro de conexão com o servidor");
    }
  }

  return (
    <div className="page-center">
      <div className="app-container" style={{ maxWidth: 420 }}>
        <div className="card">
          <h2>Login</h2>
          <form onSubmit={handleLogin} className="form">
            <input className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="form-control" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" type="submit">Entrar</button>
              <button type="button" className="btn secondary" onClick={() => { setEmail(''); setSenha(''); }}>Limpar</button>
            </div>
            {erro && <div className="alert" style={{ marginTop: 8 }}>{erro}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
