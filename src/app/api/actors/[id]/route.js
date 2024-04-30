import { NextResponse } from "next/server";
import dbConnect from "../../../../../libs/mongodb";
import Actor from "../../../../../models/Actor";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newFirstName: firstName,
    newLastName: lastName,
    newDob: dob,
    newAge: age,
    newMovies: movies,
    newImageUrl: imageUrl,
  } = await request.json();
  await dbConnect();
  await Actor.findByIdAndUpdate(id, {
    firstName,
    lastName,
    dob,
    age,
    movies,
    imageUrl,
  });
  return NextResponse.json({ message: "Director Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await dbConnect();
  const actor = await Actor.findOne({ _id: id });
  return NextResponse.json({ actor }, { status: 200 });
}
