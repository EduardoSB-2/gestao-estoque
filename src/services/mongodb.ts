import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gestao-estoque";

if (!MONGODB_URI) throw new Error("Defina MONGODB_URI em .env.local");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
