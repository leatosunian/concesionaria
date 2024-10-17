import TaskModel from "@/app/models/task";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  const data = await request.json();
  data.status = "Pendiente"
  console.log(data);
  try {
    const newTask = await TaskModel.create(data);
    return NextResponse.json({ msg: "TASK_CREATED", newTask });
  } catch (error) {
    return NextResponse.json({ msg: "TASK_CREATION_ERROR" });
  }
}


export async function PUT(request: NextRequest) {
  await connectDB();
  const data = await request.json();
  console.log(data);

  try {
    const editedLead = await TaskModel.findByIdAndUpdate(
      { _id: data._id },
      data,
      { new: true }
    );
    return NextResponse.json({ msg: "TASK_EDITED", editedLead });
  } catch (error) {
    return NextResponse.json({ msg: "EDIT_TASK_ERROR" });
  }
}

export async function DELETE(request: NextRequest) {
  await connectDB();
  const data = await request.json();
  console.log(data);

  try {
    await TaskModel.findByIdAndDelete(data);
    return NextResponse.json({ msg: "TASK_DELETED" });
  } catch (error) {
    return NextResponse.json({ msg: "DELETE_TASK_ERROR" });
  }
}
