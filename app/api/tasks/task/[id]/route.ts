import TaskModel from "@/app/models/task";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const task = await TaskModel.findOne({ _id: params.id });
    return NextResponse.json({ msg: "TASK_GET", task });
  } catch (error) {
    return NextResponse.json({ msg: "GET_TASK_ERROR" });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const data = await request.json();
  console.log(data);
  console.log(params.id);
  
  try {
    const editedTask = await TaskModel.findByIdAndUpdate(
      { _id: params.id },
      data,
      { new: true }
    );
    return NextResponse.json({ msg: "TASK_EDITED", editedTask });
  } catch (error) {
    return NextResponse.json({ msg: "EDIT_TASK_ERROR" });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    await TaskModel.findByIdAndDelete({_id: params.id});
    return NextResponse.json({ msg: "TASK_DELETED" });
  } catch (error) {
    return NextResponse.json({ msg: "DELETE_TASK_ERROR" });
  }
}
