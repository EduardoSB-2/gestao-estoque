"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Produto = {
  _id: string;
  nome: string;
  tipo: string;
  material?: string;
  quantidade: number;
  estoqueMinimo: number;
};

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [form, setForm] = useState<any>({ nome: "", tipo: "", material: "", quantidade: 0, estoqueMinimo: 1 });
  const [editId, setEditId] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const router = useRouter();
  
  async function carregar() {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProdutos(data);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks
  useEffect(() => { carregar(); }, []);

  function filtrar() {
    if (!busca) return produtos;
    const termo = busca.toLowerCase();
    return produtos.filter(p => p.nome.toLowerCase().includes(termo) || p.tipo.toLowerCase().includes(termo));
  }

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    try {
      const url = editId ? `/api/produtos/${editId}` : "/api/produtos";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setMensagem(data.error || "Erro");
        return;
      }
      setMensagem("Salvo com sucesso.");
      setForm({ nome: "", tipo: "", material: "", quantidade: 0, estoqueMinimo: 1 });
      setEditId(null);
      await carregar();
      setTimeout(() => setMensagem(null), 1500);
    } catch (err) {
      setMensagem("Erro ao salvar");
    }
  }

  function editar(prod: Produto) {
    setEditId(prod._id);
    setForm({ nome: prod.nome, tipo: prod.tipo, material: prod.material || "", quantidade: prod.quantidade, estoqueMinimo: prod.estoqueMinimo });
  }

  async function excluir(id: string) {
    if (!confirm("Confirma exclusão?")) return;
    await fetch(`/api/produtos/${id}`, { method: "DELETE" });
    await carregar();
  }

  return (
    <div className="app-container">
      <div className="spaced" style={{ marginBottom: 12 }}>
        <h2>Cadastro de Produtos</h2>
        <div>
          <button className="btn secondary" onClick={() => router.push("/dashboard")}>Voltar</button>
        </div>
      </div>

      <div className="row">
        <div style={{ flex: 1 }}>
          <div className="card">
            <h3>Listagem</h3>
            <input className="form-control" placeholder="Buscar por nome ou tipo" value={busca} onChange={(e) => setBusca(e.target.value)} />
            <table className="table" style={{ marginTop: 8 }}>
              <thead><tr><th>Nome</th><th>Tipo</th><th>Material</th><th>Qtd</th><th>Estoque Mín</th><th>Ações</th></tr></thead>
              <tbody>
                {filtrar().map(p => (
                  <tr key={p._id}>
                    <td>{p.nome}</td>
                    <td>{p.tipo}</td>
                    <td>{p.material}</td>
                    <td>{p.quantidade}</td>
                    <td>{p.estoqueMinimo}</td>
                    <td>
                      <button className="btn secondary" onClick={() => editar(p)}>Editar</button>{" "}
                      <button className="btn danger" onClick={() => excluir(p._id)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel-right">
          <div className="card">
            <h3>{editId ? "Editar Produto" : "Novo Produto"}</h3>
            <form onSubmit={handleSalvar} className="form">
              <input className="form-control" placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
              <input className="form-control" placeholder="Tipo" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} required />
              <input className="form-control" placeholder="Material" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} />
              <input className="form-control" type="number" placeholder="Quantidade" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: Number(e.target.value) })} />
              <input className="form-control" type="number" placeholder="Estoque Mínimo" value={form.estoqueMinimo} onChange={(e) => setForm({ ...form, estoqueMinimo: Number(e.target.value) })} />
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" type="submit">{editId ? "Salvar alterações" : "Criar"}</button>
                <button className="btn secondary" type="button" onClick={() => { setEditId(null); setForm({ nome: "", tipo: "", material: "", quantidade: 0, estoqueMinimo: 1 }); }}>Limpar</button>
              </div>
              {mensagem && <div className="muted" style={{ marginTop: 8 }}>{mensagem}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
