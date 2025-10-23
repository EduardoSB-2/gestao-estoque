import { NextResponse } from "next/server";
import UsuarioController from "@/controllers/UsuarioController";
import { connectToDatabase } from "@/services/mongodb";

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, senha } = await req.json();
  try {
    const data = await UsuarioController.login(email, senha);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
