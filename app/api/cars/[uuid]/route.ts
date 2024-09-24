import connectDB from "@/lib/db";
import CarModel, { ICar } from "@/app/models/car";
import { NextRequest, NextResponse } from "next/server";

// GET CAR BY UUID
export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  await connectDB();
  try {
    const car = await CarModel.findOne({ uuid: params.uuid });
    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json({ msg: "ERROR_GET_CAR" });
  }
}

// DELETE CAR BY UUID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  await connectDB();

  try {
    const user = await CarModel.findOneAndDelete({ uuid: params.uuid });
    console.log(user);
    if(user){
      console.log('deleted');
      
    }
    return NextResponse.json({msg:'CAR_DELETED'});
  } catch (error) {
    console.log('error deleted');

    return NextResponse.json({ msg: "ERROR_DELETE_CAR" });
  }
}

// EDIT CAR
export async function PUT(request: NextRequest, { params }: { params: { uuid: string } }) {
  await connectDB();
  const { uuid } = params;  
  const data: ICar = await request.json();
  try {
    const user = await CarModel.findOneAndUpdate({ uuid }, data, {
      new: true,
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ msg: "ERROR_EDIT_CAR" });
  }
}