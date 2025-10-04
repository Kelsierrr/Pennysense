import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { protect } from "../middleware/auth.js";
import Expense from "../models/Expense.js";
import { monthAbbrFromDate } from "../utils/month.js";

const router = express.Router();
router.use(protect);

/**
 * GET /api/expenses?month=JUN&year=2025&page=1&limit=50
 */
router.get("/", asyncHandler(async (req, res) => {
  const { month, year, page = 1, limit = 100 } = req.query;
  const query = { user: req.user._id };
  if (month) query.month = month;
  if (year) query.year = year;

  const docs = await Expense.find(query)
    .sort({ date: -1, createdAt: -1 })
    .skip((+page - 1) * +limit)
    .limit(+limit);

  res.json(docs);
}));

/**
 * POST /api/expenses
 * Accepts either a single expense object or an array (bulk add)
 */
router.post("/", asyncHandler(async (req, res) => {
  const body = Array.isArray(req.body) ? req.body : [req.body];

  const payload = body.map(e => {
    // derive normalized fields
    const jsDate = e.date ? new Date(e.date) : new Date();
    const yyyy = jsDate.getFullYear().toString();
    const mm = String(jsDate.getMonth() + 1).padStart(2, "0");
    const dd = String(jsDate.getDate()).padStart(2, "0");

    return {
      user: req.user._id,
      date: `${yyyy}-${mm}-${dd}`,
      month: monthAbbrFromDate(jsDate),  // "JUN"
      year: yyyy,                        // "2025"
      category: e.category,
      amount: Number(e.amount || 0),
      additionalInfo: e.additionalInfo || ""
    };
  });

  const created = await Expense.insertMany(payload);
  res.status(201).json(created);
}));

router.get("/:id", asyncHandler(async (req, res) => {
  const doc = await Expense.findOne({ _id: req.params.id, user: req.user._id });
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
}));

router.put("/:id", asyncHandler(async (req, res) => {
  const update = { ...req.body };
  if (update.date) {
    const jsDate = new Date(update.date);
    update.month = monthAbbrFromDate(jsDate);
    update.year = jsDate.getFullYear().toString();
  }
  const doc = await Expense.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    update,
    { new: true }
  );
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
}));

router.delete("/:id", asyncHandler(async (req, res) => {
  const doc = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ ok: true });
}));

export default router;
