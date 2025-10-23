import Usuario from "../models/Usuario";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UsuarioController {
  static async login(email: string, senha: string) {
    const user = await Usuario.findOne({ email });
    if (!user) throw new Error("Usuário não encontrado");
    const ok = await bcrypt.compare(senha, user.senha);
    if (!ok) throw new Error("Senha incorreta");
    const token = jwt.sign({ id: user._id, papel: user.papel }, process.env.JWT_SECRET!, { expiresIn: "2h" });
    return { token, nome: user.nome };
  }

  static async cadastrar(nome: string, email: string, senha: string) {
    const existe = await Usuario.findOne({ email });
    if (existe) throw new Error("Email já cadastrado");
    const hash = await bcrypt.hash(senha, 10);
    const novo = new Usuario({ nome, email, senha: hash });
    await novo.save();
    return novo;
  }
}
