import { NextResponse } from "next/server";
import { connectToDatabase } from "@/services/mongodb";
import GestaoEstoqueController from "@/controllers/GestaoEstoqueController";

export async function POST(req: Request) {
  await connectToDatabase();
  const { produtoId, tipo, quantidade, responsavel } = await req.json();
  try {
    const mov = await GestaoEstoqueController.movimentar(produtoId, tipo, quantidade, responsavel);
    return NextResponse.json(mov);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
