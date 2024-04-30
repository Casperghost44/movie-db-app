import { NextResponse } from "next/server";
import dbConnect from "../../../../libs/mongodb";
import Movie from "../../../../models/Movie";

export async function GET(request) {
  const actor = request.nextUrl.searchParams.get("actor") || "";
  const genre = request.nextUrl.searchParams.get("genre") || "";
  const director = request.nextUrl.searchParams.get("director") || "";

  await dbConnect();

  if (actor) {
    const movies = await Movie.find({ cast: actor });

    return new NextResponse(JSON.stringify(movies), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (director) {
    const movies = await Movie.find({ genre: genre });

    return new NextResponse(JSON.stringify(movies), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (director) {
    const movies = await Movie.find({ director: director });

    return new NextResponse(JSON.stringify(movies), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const movies = await Movie.find();
  return NextResponse.json({ movies });
}

export async function POST(request) {
  const { title, genre, rating, reviews, dor, director, cast, length } =
    await request.json();
  await dbConnect();
  await Movie.create({
    title,
    genre,
    rating,
    reviews,
    dor,
    director,
    cast,
    length,
    imagePath,
  });
  return NextResponse.json(
    { message: "Movie has been created!" },
    { status: 201 }
  );
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await dbConnect();
  await Movie.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Movie has been deleted" },
    { status: 200 }
  );
}
