import { NextResponse } from "next/server";
import dbConnect from "../../../../libs/mongodb";
import Director from "../../../../models/Director";

export async function GET(request) {
  await dbConnect();
  const directors = await Director.find();
  return NextResponse.json({ directors });
}

export async function POST(request) {
  const { firstName, lastName, movies, dob, age } = await request.json();
  await dbConnect();
  await Director.create({
    firstName,
    lastName,
    movies,
    dob,
    age,
  });
  return NextResponse.json(
    { message: "Director has been created!" },
    { status: 201 }
  );
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await dbConnect();
  await Diretor.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Director has been deleted" },
    { status: 200 }
  );
}
