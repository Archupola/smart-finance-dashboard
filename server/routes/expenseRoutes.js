const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");
const protect = require("../middleware/authMiddleware");

/* ==========================
GET ALL TRANSACTIONS
========================== */

router.get("/", protect, async (req, res) => {
  try {

    const expenses = await Expense.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(expenses);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

/* ==========================
ADD TRANSACTION
========================== */

router.post("/", protect, async (req, res) => {

  try {

    const expense = await Expense.create({

      title: req.body.title,

      amount: req.body.amount,

      category: req.body.category,

      type: req.body.type,

      user: req.user._id,

    });

    res.status(201).json(expense);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

/* ==========================
UPDATE
========================== */

router.put("/:id", protect, async (req, res) => {

  try {

    const expense = await Expense.findOne({

      _id: req.params.id,

      user: req.user._id,

    });

    if (!expense) {

      return res.status(404).json({

        message: "Transaction not found",

      });

    }

    expense.title = req.body.title;

    expense.amount = req.body.amount;

    expense.category = req.body.category;

    expense.type = req.body.type;

    await expense.save();

    res.json(expense);

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

});

/* ==========================
DELETE
========================== */

router.delete("/:id", protect, async (req, res) => {

  try {

    const expense = await Expense.findOne({

      _id: req.params.id,

      user: req.user._id,

    });

    if (!expense) {

      return res.status(404).json({

        message: "Transaction not found",

      });

    }

    await expense.deleteOne();

    res.json({

      message: "Deleted Successfully",

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

});

module.exports = router;