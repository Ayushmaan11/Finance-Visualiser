import mongoose, { Schema, model, models } from 'mongoose';

const transactionSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export const Transaction = models.Transaction || model('Transaction', transactionSchema);