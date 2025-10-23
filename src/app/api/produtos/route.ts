import { NextResponse } from "next/server";
import { connectToDatabase } from "@/services/mongodb";
import ProdutoController from "@/controllers/ProdutoController";

export async function GET() {
  await connectToDatabase();
  const produtos = await ProdutoController.listar();
  return NextResponse.json(produtos);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const novo = await ProdutoController.criar(data);
  return NextResponse.json(novo);
}
