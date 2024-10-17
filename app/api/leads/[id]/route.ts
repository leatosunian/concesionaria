import connectDB from "@/lib/db";
import LeadModel, { ILead } from "@/app/models/lead";
import { NextRequest, NextResponse } from "next/server";
import LeadVehiclesModel from "@/app/models/leadvehicles";
import CarModel from "@/app/models/car";
import TaskModel from "@/app/models/task";

// GET CAR BY UUID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const lead = await LeadModel.findOne({ _id: params.id });
    const leadVehicles = await LeadVehiclesModel.findOne({ leadID: params.id });
    const intInVehicle = await CarModel.findOne({
      uuid: leadVehicles.leadPrefVehicleUUID,
    });
    return NextResponse.json({
      msg: "LEAD_GET",
      lead,
      leadVehicles,
      intInVehicle,
    });
  } catch (error) {
    return NextResponse.json({ msg: "ERROR_GET_LEAD" });
  }
}

// DELETE CAR BY UUID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const leadDeleted = await LeadModel.findOneAndDelete({ _id: params.id });
    const leadVehiclesDeleted = await LeadVehiclesModel.findOneAndDelete({
      leadID: params.id,
    });
    const leadTasksDeleted = await TaskModel.findOneAndDelete({
      leadID: params.id,
    });
    console.log("leadDeleted", leadDeleted);
    console.log("leadVehiclesDeleted", leadVehiclesDeleted);
    console.log("leadTasksDeleted", leadTasksDeleted);

    return NextResponse.json({ msg: "CAR_DELETED" });
  } catch (error) {
    console.log("error deleted");

    return NextResponse.json({ msg: "ERROR_DELETE_CAR" });
  }
}

// EDIT CAR
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  const data: ILead = await request.json();
  try {
    const user = await LeadModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ msg: "ERROR_EDIT_CAR" });
  }
}
