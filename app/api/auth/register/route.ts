import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db'; // Ajusta la ruta según dónde tengas la conexión a la DB

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar usuario en la base de datos
    const result = await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    return NextResponse.json({ message: 'Usuario registrado correctamente' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al registrar usuario' }, { status: 500 });
  }
}
