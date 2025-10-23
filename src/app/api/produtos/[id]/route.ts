import { NextResponse } from "next/server";
import ProdutoController from "@/controllers/ProdutoController";
import { connectToDatabase } from "@/services/mongodb";

export async function PUT(req: Request, { params }: any) {
  await connectToDatabase();
  const data = await req.json();
  const atualizado = await ProdutoController.editar(params.id, data);
  return NextResponse.json(atualizado);
}

export async function DELETE(_: Request, { params }: any) {
  await connectToDatabase();
  await ProdutoController.excluir(params.id);
  return NextResponse.json({ ok: true });
}
