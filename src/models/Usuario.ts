import mongoose, { Schema, Document } from "mongoose";

export interface IUsuario extends Document {
  nome: string;
  email: string;
  senha: string;
  papel: "admin" | "operador";
}

const UsuarioSchema = new Schema<IUsuario>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  papel: { type: String, enum: ["admin", "operador"], default: "operador" },
});

export default mongoose.models.Usuario || mongoose.model<IUsuario>("Usuario", UsuarioSchema);
