import mongoose, { Schema, Document } from "mongoose";

export interface IMovimentacao extends Document {
  produtoId: mongoose.Types.ObjectId;
  tipo: "entrada" | "saida";
  quantidade: number;
  data: Date;
  responsavel: string;
}

const MovimentacaoSchema = new Schema<IMovimentacao>({
  produtoId: { type: Schema.Types.ObjectId, ref: "Produto", required: true },
  tipo: { type: String, enum: ["entrada", "saida"], required: true },
  quantidade: { type: Number, required: true },
  data: { type: Date, default: Date.now },
  responsavel: { type: String, required: true },
});

export default mongoose.models.Movimentacao || mongoose.model<IMovimentacao>("Movimentacao", MovimentacaoSchema);
