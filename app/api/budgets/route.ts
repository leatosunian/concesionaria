import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import BudgetModel from "@/app/models/budget";
import BudgetBonifModel from "@/app/models/budgetbonif";
import connectDB from "@/lib/db";

export async function POST(request: NextRequest, response: NextResponse) {
  await connectDB();
  try {
    const data = await request.json();

    const uploadedBudget = await BudgetModel.create(data.budgetData);
    console.log(uploadedBudget);

    if (data.bonifs.length > 0) {
      data.bonifs.map(async (bonif: any) => {
        bonif.budgetID = uploadedBudget._id;
        bonif.leadID = data.budgetData.leadID;
        const uploadedBudgetBonif = await BudgetBonifModel.create(bonif);
        console.log(uploadedBudgetBonif);
      });
    }
    return NextResponse.json({ msg: "BUDGET_UPLOADED", uploadedBudget });
  } catch (error) {
    return NextResponse.json({ msg: "BUDGET_UPLOAD_ERROR" }, { status: 400 });
  }
}

