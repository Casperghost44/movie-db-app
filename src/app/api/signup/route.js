import dbConnect from "../../../../libs/mongodb";
import User from '../../../../models/User'

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

export async function POST(request){
    const reqBody = await request.json();
    const { email, password } = reqBody;

    await dbConnect();

    const user = await User.findOne({email: email});

    if(user){
        return NextResponse.json({message: "User already exist"}, {status: 400})
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
        email: email,
        password: hashedPassword
    })

    const savedUser = await newUser.save();

    return NextResponse.json({message: "User has been created successfully!"}, {status: 201});

}