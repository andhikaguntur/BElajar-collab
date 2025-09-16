// app/api/register/route.ts
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, name } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "username & password required" }, { status: 400 });
    }

    // cek jika username sudah ada
    const exists = await prisma.user.findUnique({ where: { username } });
    if (exists) {
      return NextResponse.json({ error: "username already taken" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashed,
        name,
      },
    });

    // jangan kirimkan password kembali
    const { password: _p, ...safe } = user as any;
    return NextResponse.json(safe);
  } catch (err) {
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
