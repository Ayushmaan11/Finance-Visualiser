import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Budget from "@/models/Budget";

export async function GET() {
  try {
    await connectDB();
    const budgets = await Budget.find().sort({ category: 1 });
    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    console.error("GET Error", error);
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }      
}

export async function POST(request: Request) {
    await connectDB();
    const { category, amount } = await request.json();

    try{
        const updated = await Budget.findOneAndUpdate(
            { category },
            { amount },
            { new: true, upsert: true }
        );
        return NextResponse.json(updated, { status: 201 });      
    } catch(error) {
        console.error("POST Error", error);
        return NextResponse.json({ error: "Failed to update budget" }, { status: 500 });
    }
}