import connectDB from "@/lib/db";
import CarModel from "@/app/models/car";
import { NextRequest, NextResponse } from "next/server";

// GET ALL CARS
export async function GET(context: any) {
  const { params } = context;
  await connectDB();
  try {
    const cars = await CarModel.find();
    return NextResponse.json(cars);
  } catch (error) {
    return NextResponse.json({ msg: "ERROR_GET_CAR" });
  }
}

// CREATE NEW CAR
export async function POST(request: NextRequest) {
  await connectDB();
  const data = await request.json();
  try {
    console.log(data);
    
    const user = await CarModel.create(data);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ msg: "ERROR_CREATE_CAR" });
  }
}



