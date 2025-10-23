"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Produto = { _id: string; nome: string; quantidade: number; estoqueMinimo: number };

export default function GestaoEstoquePage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selecionado, setSelecionado] = useState<string>("");
  const [tipo, setTipo] = useState<"entrada" | "saida">("entrada");
  const [quantidade, setQuantidade] = useState<number>(1);
  const [responsavel, setResponsavel] = useState<string>("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const router = useRouter();

  async function carregar() {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProdutos(data);
    if (data.length > 0 && !selecionado) setSelecionado(data[0]._id);
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks
  useEffect(() => { carregar(); }, []);

  async function handleMovimentar(e: React.FormEvent) {
    e.preventDefault();
    if (!selecionado) return setMensagem("Selecione um produto");
    try {
      const res = await fetch("/api/gestaoestoque", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produtoId: selecionado, tipo, quantidade: Number(quantidade), responsavel: responsavel || localStorage.getItem("usuario") || "desconhecido" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMensagem(data.error || "Erro");
        return;
      }
      // Verificar alerta
      const novoProduto = data.produto;
      if (novoProduto.quantidade < novoProduto.estoqueMinimo) {
        setMensagem(`Produto ${novoProduto.nome} abaixo do estoque mínimo! Qtd atual: ${novoProduto.quantidade}`);
      } else {
        setMensagem("Movimentação realizada com sucesso.");
      }
      await carregar();
      setTimeout(() => setMensagem(null), 4000);
    } catch (err) {
      setMensagem("Erro ao movimentar");
    }
  }
return (
  <div className="app-container">
    <div className="spaced" style={{ marginBottom: 12 }}>
      <h2>Gestão de Estoque</h2>
      <div className="row gap-8">
        <button className="btn secondary" onClick={() => router.push("/dashboard")}>Voltar</button>
        <button className="btn secondary" onClick={() => router.push("/produtos")}>Ir para Produtos</button>
      </div>
    </div>

    <div className="row">
      <div style={{ flex: 1 }}>
        <div className="card">
          <h3>Produtos (ordenados alfabeticamente)</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Qtd</th>
                <th>Estoque Mín</th>
              </tr>
            </thead>
            <tbody>
              {produtos
                .sort((a, b) => a.nome.localeCompare(b.nome))
                .map(p => (
                  <tr key={p._id}>
                    <td>{p.nome}</td>
                    <td>{p.quantidade}</td>
                    <td>{p.estoqueMinimo}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel-right">
        <div className="card">
          <h3>Registrar Movimentação de Produtos</h3>
          <form onSubmit={handleMovimentar} className="form">
            
            <label htmlFor="produto">Produto</label>
            <select
              id="produto"
              className="form-control"
              value={selecionado}
              onChange={(e) => setSelecionado(e.target.value)}
            >
              <option value="">-- selecione --</option>
              {produtos.map(p => (
                <option key={p._id} value={p._id}>{p.nome}</option>
              ))}
            </select>

            <label htmlFor="tipo">Tipo</label>
            <select
              id="tipo"
              className="form-control"
              value={tipo}
              /* eslint-disable @typescript-eslint/no-explicit-any */

              onChange={(e) => setTipo(e.target.value as any)}
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>

            <label htmlFor="quantidade">Quantidade</label>
            <input
              id="quantidade"
              className="form-control"
              type="number"
              value={quantidade}
              min={1}
              onChange={(e) => setQuantidade(Number(e.target.value))}
            />

            <label htmlFor="responsavel">Responsável</label>
            <input
              id="responsavel"
              className="form-control"
              value={responsavel}
              placeholder="Opcional"
              onChange={(e) => setResponsavel(e.target.value)}
            />

            <button className="btn" type="submit">
              {tipo === "entrada" ? "Registrar Entrada" : "Registrar Saída"}
            </button>

            {mensagem && (
              <div className="muted" style={{ marginTop: 8 }}>{mensagem}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  </div>
)
}