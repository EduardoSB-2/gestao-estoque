import mongoose, { Schema, Document } from "mongoose";

export interface IProdutos extends Document {
  nome: string;
  tipo: string;
  material?: string;
  quantidade: number;
  estoqueMinimo: number;
}

const ProdutoSchema = new Schema<IProdutos>({
  nome: { type: String, required: true },
  tipo: { type: String, required: true },
  material: { type: String },
  quantidade: { type: Number, default: 0 },
  estoqueMinimo: { type: Number, default: 1 },
});

export default mongoose.models.Produto || mongoose.model<IProdutos>("Produto", ProdutoSchema);
