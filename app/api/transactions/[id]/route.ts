import { connectDB } from "@/lib/mongodb";
import { Transaction } from "@/models/Transaction";

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; 

  try {
    await connectDB();
    await Transaction.findByIdAndDelete(id);
    return Response.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return Response.json({ error: "Failed to delete" }, { status: 500 });
  }
}


export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const { amount, date, description } = await req.json();
    await connectDB();

    const updated = await Transaction.findByIdAndUpdate(
      id,
      { amount, date, description },
      { new: true }
    );

    return Response.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return Response.json({ error: "Failed to update" }, { status: 500 });
  }


}
