import CarModel, { ICar } from "@/app/models/car";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

// GET ALL CARS
export async function GET(context: any) {
  const { params } = context;
  await connectDB();
  try {
    const lastCars = await CarModel.find()
    console.log(lastCars);
    
    // Verifica si se encontraron documentos
    if (lastCars.length === 0) {
      return NextResponse.json({ msg: "NO_CARS_FOUND" }, { status: 404 });
    }

    return NextResponse.json(lastCars);
  } catch (error) {
    return NextResponse.json({ msg: "ERROR_GET_CAR" });
  }
}
