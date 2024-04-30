import { NextResponse } from "next/server";
import dbConnect from "../../../../../libs/mongodb";
import Review from "../../../../../models/Review";

export async function POST(request) {
  const { user, rate, comment } = await request.json();
  await dbConnect();
  await Review.create({
    user,
    rate,
    comment,
  });
  return NextResponse.json(
    { message: "Review has been created!" },
    { status: 201 }
  );
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await dbConnect();
  await Review.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Review has been deleted" },
    { status: 200 }
  );
}
