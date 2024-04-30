import { NextResponse } from "next/server";
import dbConnect from "../../../../libs/mongodb";
import Actor from "../../../../models/Actor";

export async function GET(request) {
  await dbConnect();
  const actors = await Actor.find();
  return NextResponse.json({ actors });
}

export async function POST(request) {
  const { firstName, lastName, dob, age, movies, imageUrl } =
    await request.json();
  await dbConnect();
  await Actor.create({
    firstName,
    lastName,
    dob,
    age,
    movies,
    imageUrl,
  });
  return NextResponse.json(
    { message: "Actor has been created!" },
    { status: 201 }
  );
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await dbConnect();
  await Actor.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Actor has been deleted" },
    { status: 200 }
  );
}
