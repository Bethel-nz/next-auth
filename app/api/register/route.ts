import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/;

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, email, password } = body;

		const userExist = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!name || !email || !password) {
			return NextResponse.json('All fields are required');
		}

		if (userExist) {
			return NextResponse.json('User already exists');
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashPassword,
			},
		});
		return NextResponse.json({ user });
	} catch (error) {
		return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
	}
}
