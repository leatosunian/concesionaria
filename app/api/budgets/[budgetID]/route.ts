import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import BudgetModel from "@/app/models/budget";
import BudgetBonifModel from "@/app/models/budgetbonif";
import connectDB from "@/lib/db";

// get budget by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { budgetID: string } }
) {
  await connectDB();
  try {
    const budget = await BudgetModel.findOne({ _id: params.budgetID });
    console.log(budget);
    
    const budgetBonifs = await BudgetBonifModel.find({budgetID: params.budgetID})
    return NextResponse.json({msg: 'BUDGET_GET', budget, budgetBonifs});
  } catch (error) {
    return NextResponse.json({ msg: "ERROR_GET_BUDGETS" });
  }
}
