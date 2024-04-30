import dbConnect from "../../../../libs/mongodb";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const reqBody = await request.json();
  const { email, password } = reqBody;

  await dbConnect();

  const user = await User.findOne({ email: email });

  if (!user) {
    return NextResponse.json(
      { message: "User does not exist" },
      { status: 400 }
    );
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return NextResponse.json({ message: "Invalid Password" }, { status: 400 });
  }

  const tokenData = { id: user._id, email: user.email };

  const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });

  const response = NextResponse.json(
    { message: "Login successfully!", user: user },
    { status: 200 }
  );

  response.cookies.set("token", token, { httpOnly: true });

  return response;
}
