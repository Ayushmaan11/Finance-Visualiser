import {connectDB} from "@/lib/mongodb";
import { Transaction } from "@/models/Transaction";

//Post

export async function POST(request: Request) {
    try{
        const {amount,date,description,category} = await request.json();
        await connectDB();

        const transaction = await Transaction.create({
            amount, date, description, category,
        });
        return Response.json(transaction, {status: 201});    
    } catch (error) {
        console.error("POST Error", error);
        return Response.json({error: "Failed to add transaction"}, {status: 500});
    }
}

//Get
export async function GET() {
    try {
        await connectDB();
        const transactions = await Transaction.find().sort({date: -1});
        return Response.json(transactions, {status: 200});
    } catch (error) {
        console.error("GET Error", error);
        return Response.json({error: "Failed to fetch transactions"}, {status: 500});
    }
}