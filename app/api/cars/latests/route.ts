import CarModel, { ICar } from "@/app/models/car";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";



// GET ALL CARS
export async function GET(context: any) {
  const { params } = context;
  await connectDB();
  try {
    const lastCars = await CarModel.find({new: true})
      .sort({ createdAt: -1 }) 
      .limit(10); 
    return NextResponse.json(lastCars);
  } catch (error) {
    return NextResponse.json({ msg: "ERROR_GET_CAR" });
  }
}
