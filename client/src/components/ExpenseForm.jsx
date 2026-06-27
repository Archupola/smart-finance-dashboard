import { useState } from "react";
import API from "../services/api";

function ExpenseForm({
  fetchExpenses,
  darkMode,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState("Expense");

  const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/expenses", {
  title,
  amount: Number(amount),
  category,
  type,
  date,
});

      setTitle("");
      setAmount("");
      setCategory("Food");
      setType("Expense");
      
      setDate(
  new Date().toISOString().split("T")[0]
);


      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const inputStyle = darkMode
    ? "w-full bg-slate-900 border border-slate-600 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    : "w-full bg-white border border-gray-300 text-black placeholder-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const selectStyle = darkMode
    ? "w-full bg-slate-900 border border-slate-600 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    : "w-full bg-white border border-gray-300 text-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form
      onSubmit={handleSubmit}
      className={
        darkMode
          ? "bg-slate-800 text-white p-6 rounded-2xl shadow-lg mb-6"
          : "bg-white p-6 rounded-2xl shadow-lg mb-6"
      }
    >
      <h2 className="text-3xl font-bold mb-6">
        Add Transaction
      </h2>

      <div className="grid md:grid-cols-5 gap-4">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputStyle}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={inputStyle}
          required
        />

        <input
  type="date"
  value={date}
  onChange={(e) =>
    setDate(e.target.value)
  }
  className={inputStyle}
/>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={selectStyle}
        >
          <option>Expense</option>
          <option>Income</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={selectStyle}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Bills</option>
          <option>Salary</option>
          <option>Freelancing</option>
          <option>Investment</option>
          <option>Other</option>
        </select>

      </div>

      <button
        type="submit"
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300"
      >
        Add Transaction
      </button>

    </form>
  );
}

export default ExpenseForm;