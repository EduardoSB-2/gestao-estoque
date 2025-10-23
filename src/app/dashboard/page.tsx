"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<string | null>(null);

  useEffect(() => {
    const nome = localStorage.getItem("usuario");
    // eslint-disable-next-line react-hooks/set-state-in-effect
setUsuario(localStorage.getItem("usuario"));

    setUsuario(nome);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    router.push("/login");
  }

  return (
    <div className="app-container">
      <div className="spaced" style={{ marginBottom: 16 }}>
        <div>
          <h2>Bem-vindo{usuario ? `, ${usuario}` : ""}!</h2>
          <p className="small">Painel Principal</p>
        </div>
        <div className="row gap-8">
          <button className="btn secondary" onClick={() => router.push("/produtos")}>Cadastro de Produto</button>
          <button className="btn secondary" onClick={() => router.push("/gestaoestoque")}>Gestão de Estoque</button>
          <button className="btn ghost" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
