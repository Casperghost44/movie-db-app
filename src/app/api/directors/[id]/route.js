import { NextResponse } from "next/server";
import dbConnect from "../../../../../libs/mongodb";
import Director from "../../../../../models/Director";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newFirstName: firstName,
    newLastName: lastName,
    newMovies: movies,
    newDob: dob,
    newAge: age,
  } = await request.json();
  await dbConnect();
  await Director.findByIdAndUpdate(id, {
    firstName,
    lastName,
    movies,
    dob,
    age,
  });
  return NextResponse.json({ message: "Director Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await dbConnect();
  const director = await Director.findOne({ _id: id });
  return NextResponse.json({ director }, { status: 200 });
}
