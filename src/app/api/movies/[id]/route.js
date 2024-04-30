import { NextResponse } from "next/server";
import dbConnect from "../../../../../libs/mongodb";
import Movie from "../../../../../models/Movie";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newTitle: title,
    newGenre: genre,
    newRating: rating,
    newReviews: reviews,
    newDor: dor,
    newDiretor: director,
    newCast: cast,
    newLength: length,
  } = await request.json();
  await dbConnect();
  await Movie.findByIdAndUpdate(id, {
    title,
    genre,
    rating,
    reviews,
    dor,
    director,
    cast,
    length,
  });
  return NextResponse.json({ message: "Movie Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await dbConnect();
  const movie = await Movie.findById({ _id: id })
    .populate("cast")
    .populate("director")
    .populate("reviews");
  return NextResponse.json({ movie }, { status: 200 });
}
