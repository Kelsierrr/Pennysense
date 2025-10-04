import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },      // "YYYY-MM-DD"
    month: { type: String, required: true },     // "JUN"
    year:  { type: String, required: true },     // "2025"
    category: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    additionalInfo: { type: String, trim: true }
  },
  { timestamps: true }
);

expenseSchema.index({ user: 1, year: 1, month: 1, date: 1 });

export default mongoose.model("Expense", expenseSchema);
