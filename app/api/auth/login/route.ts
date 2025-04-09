import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    // Buscar usuario en la base de datos
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

    if (!user || !user.password) {
      return NextResponse.json({ error: 'Correo o contraseña incorrectos' }, { status: 401 });
    }

    // Comparar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Correo o contraseña incorrectos' }, { status: 401 });
    }

    // Crear cookie de sesión (Ejemplo simple)
    const response = NextResponse.json({ message: 'Inicio de sesión exitoso' }, { status: 200 });
    response.cookies.set('auth_token', 'some_token_value', { httpOnly: true, path: '/' });

    return response;
  } catch (error) {
    console.error('Error en el login:', error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
