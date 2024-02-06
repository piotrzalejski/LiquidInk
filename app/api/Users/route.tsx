import { NextResponse } from 'next/server';
import User from '@/app/models/User';
import bcrypt from 'bcrypt';

export async function POST(req: {
  json: () => Promise<{ fullName: string; email: string; password: string }>;
}) {
  try {
    const body = await req.json();
    console.log('lame: ', body);
    const { fullName, email, password } = body;

    console.log(fullName, email, password);

    // confirm data exists
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { message: 'All fields are required!' },
        { status: 400 }
      );
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ email: email });

    if (duplicate) {
      return NextResponse.json(
        { message: 'Email already exists!' },
        { status: 409 }
      );
    }

    // Create user
    const userData = {
      fullName,
      email,
      password,
    };

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;

    await User.create(userData);
    return NextResponse.json({ message: 'User created!' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
