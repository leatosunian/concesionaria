import LeadModel from "@/app/models/lead";
import LeadVehiclesModel from "@/app/models/leadvehicles";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  const data = await request.json();
  console.log(data);
  try {
    const newLeadVehicles = await LeadVehiclesModel.create(data);
    const editLeadInterestedIn = await LeadModel.findByIdAndUpdate(
      { _id: data.leadID },
      { interestedIn: data.interestedIn },
      { new: true }
    );
    console.log(editLeadInterestedIn);

    return NextResponse.json({ msg: "LEAD_VEHICLES_CREATED", newLeadVehicles });
  } catch (error) {
    return NextResponse.json({ msg: "LEAD_VEHICLES_CREATION_ERROR" });
  }
}

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const leads = await LeadVehiclesModel.find();
    return NextResponse.json({ msg: "LEAD_GET", leads });
  } catch (error) {
    return NextResponse.json({ msg: "GET_LEAD_ERROR" });
  }
}

export async function PUT(request: NextRequest) {
  await connectDB();
  const data = await request.json();
  console.log(data);

  try {
    const editedLead = await LeadVehiclesModel.findByIdAndUpdate(
      { _id: data._id },
      data,
      { new: true }
    );
    return NextResponse.json({ msg: "LEAD_EDITED", editedLead });
  } catch (error) {
    return NextResponse.json({ msg: "EDIT_LEAD_ERROR" });
  }
}

export async function DELETE(request: NextRequest) {
  await connectDB();
  const data = await request.json();
  console.log(data);

  try {
    await LeadVehiclesModel.findByIdAndDelete(data);
    return NextResponse.json({ msg: "LEAD_DELETED" });
  } catch (error) {
    return NextResponse.json({ msg: "DELETE_LEAD_ERROR" });
  }
}
