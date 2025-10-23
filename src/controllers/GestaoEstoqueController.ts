import Produto from "../models/Produto";
import Movimentacao from "../models/Movimentacao";

export default class GestaoEstoqueController {
  static async movimentar(produtoId: string, tipo: "entrada" | "saida", quantidade: number, responsavel: string) {
    const produto = await Produto.findById(produtoId);
    if (!produto) throw new Error("Produto não encontrado");

    if (tipo === "entrada") produto.quantidade += quantidade;
    else {
      produto.quantidade -= quantidade;
      if (produto.quantidade < produto.estoqueMinimo) {
        console.log(` Alerta: Produto ${produto.nome} abaixo do estoque mínimo!`);
      }
    }

    await produto.save();

    const mov = new Movimentacao({ produtoId, tipo, quantidade, responsavel });
    await mov.save();

    return { produto, mov };
  }
}
