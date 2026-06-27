import { useMemo, useState } from "react";
import API from "../services/api";

function ExpenseList({
  expenses,
  fetchExpenses,
  darkMode,
}) {
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "",
  });

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

    const [currentPage, setCurrentPage] = useState(1);

const itemsPerPage = 10;
 
const inputStyle = darkMode
  ? "w-full bg-slate-900 border border-slate-600 text-white placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  : "w-full bg-white border border-gray-300 text-black placeholder-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

const selectStyle = darkMode
  ? "w-full bg-slate-900 border border-slate-600 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  : "w-full bg-white border border-gray-300 text-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500";


  const handleDelete = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const startEditing = (expense) => {
    setEditingId(expense._id);

    setEditData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      type: expense.type,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/expenses/${id}`, editData);

      setEditingId(null);

      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(expenses.map((e) => e.category)),
    ];
  }, [expenses]);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });


  const totalPages = Math.ceil(
  filteredExpenses.length / itemsPerPage
);

const indexOfLast =
  currentPage * itemsPerPage;

const indexOfFirst =
  indexOfLast - itemsPerPage;

const currentExpenses =
  filteredExpenses.slice(
    indexOfFirst,
    indexOfLast
  );

  return (
    <div
      className={
        darkMode
          ? "bg-gray-800 text-white p-6 rounded-xl shadow-md mt-6"
          : "bg-white p-6 rounded-xl shadow-md mt-6"
      }
    >
      <h2 className="text-2xl font-bold mb-6">
        Recent Transactions
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-6">

        <input
          type="text"
          placeholder="🔍 Search Transaction"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className={inputStyle}
        />

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
          className={selectStyle}
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

      </div>

      {filteredExpenses.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        currentExpenses.map((expense) => (
          <div
            key={expense._id}
            className={
  darkMode
    ? "border-b border-slate-700 py-4"
    : "border-b border-gray-200 py-4"
}
          >
            {editingId === expense._id ? (
              <div className="grid md:grid-cols-5 gap-3">

                <input
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      title: e.target.value,
                    })
                  }
                  className={inputStyle}
                />

                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      amount: e.target.value,
                    })
                  }
                  className={inputStyle}
                />

                <input
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      category: e.target.value,
                    })
                  }
                  className={inputStyle}
                />

                <select
                  value={editData.type}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      type: e.target.value,
                    })
                  }
                  className={selectStyle}
                >
                  <option>Expense</option>
                  <option>Income</option>
                </select>

                <button
                  onClick={() =>
                    handleUpdate(expense._id)
                  }
                  className="bg-green-600 text-white rounded-lg"
                >
                  Save
                </button>

              </div>
            ) : (
              <div className="flex justify-between items-center">

                <div>

                  <h3 className="font-semibold">
                    {expense.title}
                  </h3>

                  <p
  className={
    darkMode
      ? "text-gray-300"
      : "text-gray-500"
  }
>
                    {expense.category}
                  </p>

                  <span
                    className={
                      expense.type === "Income"
                        ? "text-green-500 text-sm font-semibold"
                        : "text-red-500 text-sm font-semibold"
                    }
                  >
                    {expense.type}
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <p
                    className={
                      expense.type === "Income"
                        ? "text-green-500 font-bold"
                        : "text-red-500 font-bold"
                    }
                  >
                    ₹{expense.amount}
                  </p>

                  <button
                    onClick={() =>
                      startEditing(expense)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(expense._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>

              </div>
            )}
          </div>
        ))
      )}

      <div className="flex justify-center items-center gap-2 mt-6">

  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.max(prev - 1, 1)
      )
    }
    disabled={currentPage === 1}
    className={
  darkMode
    ? "bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded disabled:opacity-50"
    : "bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded disabled:opacity-50"
}
  >
    Previous
  </button>

  <span className="font-semibold">
    Page {currentPage} of {totalPages || 1}
  </span>

  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, totalPages)
      )
    }
    disabled={currentPage === totalPages || totalPages === 0}
    className={
  darkMode
    ? "bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded disabled:opacity-50"
    : "bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded disabled:opacity-50"
}
  >
    Next
  </button>

</div>

    </div>
  );
}

export default ExpenseList;