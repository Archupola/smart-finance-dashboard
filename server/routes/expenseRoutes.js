const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");

/* GET ALL EXPENSES */
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

/* ADD EXPENSE */
router.post("/", async (req, res) => {
  try {
    const newExpense = new Expense(req.body);

    await newExpense.save();

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

/* DELETE EXPENSE */
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);

    res.json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;