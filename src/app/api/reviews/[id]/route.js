import { NextResponse } from "next/server";
import dbConnect from "../../../../../libs/mongodb";
import Review from "../../../../../models/Review";

export async function GET(request, { params }) {
  const { id } = params;
  await dbConnect();

  if (id) {
    // Get a specific review by ID
    const review = await Review.findOne({ _id: id });
    return NextResponse.json({ review }, { status: 200 });
  } else {
    // Get all reviews
    const reviews = await Review.find();
    return NextResponse.json({ reviews }, { status: 200 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { newUser, newRate, newComment } = await request.json();
  await dbConnect();
  await Review.findByIdAndUpdate(id, {
    user: newUser,
    rate: newRate,
    comment: newComment,
  });
  return NextResponse.json({ message: "Review Updated" }, { status: 200 });
}
