import { useState, useEffect } from "react";

function Filters({
  expenses,
  setFilteredExpenses,
  darkMode,
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");

  useEffect(() => {
    let filtered = [...expenses];

    if (search.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter(
        (item) => item.category === category
      );
    }

    if (type !== "All") {
      filtered = filtered.filter(
        (item) => item.type === type
      );
    }

    setFilteredExpenses(filtered);
  }, [
    search,
    category,
    type,
    expenses,
    setFilteredExpenses,
  ]);

  const categories = [
    "All",
    ...new Set(
      expenses.map(
        (item) => item.category
      )
    ),
  ];

  const inputStyle = darkMode
    ? "w-full bg-slate-900 border border-slate-600 text-white placeholder-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    : "w-full bg-white border border-gray-300 text-black placeholder-gray-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const selectStyle = darkMode
    ? "w-full bg-slate-900 border border-slate-600 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    : "w-full bg-white border border-gray-300 text-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div
      className={
        darkMode
          ? "bg-slate-800 rounded-2xl shadow-lg p-6 mb-6"
          : "bg-white rounded-2xl shadow-lg p-6 mb-6"
      }
    >
      <h2
        className={
          darkMode
            ? "text-white text-3xl font-bold mb-6"
            : "text-black text-3xl font-bold mb-6"
        }
      >
        Filters
      </h2>

      <div className="grid md:grid-cols-3 gap-5">

        <input
          type="text"
          placeholder="🔍 Search Transaction..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className={inputStyle}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className={selectStyle}
        >
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          className={selectStyle}
        >
          <option value="All">
            All Types
          </option>

          <option value="Income">
            Income
          </option>

          <option value="Expense">
            Expense
          </option>
        </select>

      </div>
    </div>
  );
}

export default Filters;