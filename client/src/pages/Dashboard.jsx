import { useEffect, useState } from "react";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Charts from "../components/Charts";
import CSVUpload from "../components/CSVUpload";
import Insights from "../components/Insights";
import DashboardCards from "../components/DashboardCards";
import Filters from "../components/Filters";

import MonthlyTrend from "../components/MonthlyTrend";
import CategoryCards from "../components/CategoryCards";


import API from "../services/api";

function Dashboard({ darkMode }) {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] =
    useState([]);

  const [budget, setBudget] =
    useState(5000);

  const fetchExpenses = async () => {
    try {
      const { data } =
        await API.get("/expenses");

      setExpenses(data);
      setFilteredExpenses(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const exportCSV = () => {
    const headers = [
      "Title",
      "Amount",
      "Category",
      "Type",
    ];

    const rows =
      filteredExpenses.map((item) => [
        item.title,
        item.amount,
        item.category,
        item.type,
      ]);

    const csv =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download =
      "transactions.csv";

    link.click();
  };

  const income =
    filteredExpenses
      .filter(
        (item) =>
          item.type === "Income"
      )
      .reduce(
        (acc, item) =>
          acc + item.amount,
        0
      );

  const totalExpenses =
    filteredExpenses
      .filter(
        (item) =>
          item.type !== "Income"
      )
      .reduce(
        (acc, item) =>
          acc + item.amount,
        0
      );

  const balance =
    income - totalExpenses;

  const savings =
    income > 0
      ? (
          (balance / income) *
          100
        ).toFixed(1)
      : 0;

  const transactions =
    filteredExpenses.length;

  const growth =
    income > 0
      ? (
          (income -
            totalExpenses) /
          income
        ) * 100
      : 0;

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-slate-900 p-8"
          : "min-h-screen bg-gray-100 p-8"
      }
    >
      <div className="flex justify-between items-center mb-8">

        <div>

          <h1
            className={
              darkMode
                ? "text-5xl font-bold text-white"
                : "text-5xl font-bold text-black"
            }
          >
            Smart Finance Dashboard
          </h1>

          <p
            className={
              darkMode
                ? "text-gray-400 mt-2"
                : "text-gray-600 mt-2"
            }
          >
            Manage your income,
            expenses and savings.
          </p>

        </div>

        <button
          onClick={exportCSV}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg"
        >
          Export CSV
        </button>

      </div>

      <DashboardCards
        income={income}
        expenses={totalExpenses}
        balance={balance}
        savings={savings}
        budget={budget}
        setBudget={setBudget}
        transactions={transactions}
        growth={growth.toFixed(1)}
        darkMode={darkMode}
      />

      <Filters
        expenses={expenses}
        setFilteredExpenses={
          setFilteredExpenses
        }
        darkMode={darkMode}
      />

      <div className="mb-8">
        <CSVUpload
          fetchExpenses={
            fetchExpenses
          }
          darkMode={darkMode}
        />
      </div>

      <div className="mb-8">
        <ExpenseForm
          fetchExpenses={
            fetchExpenses
          }
          darkMode={darkMode}
        />
      </div>

      <div className="mb-8">
        <Charts
          expenses={
            filteredExpenses
          }
          darkMode={darkMode}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">

  <MonthlyTrend
    expenses={filteredExpenses}
    darkMode={darkMode}
  />

  <CategoryCards
    expenses={filteredExpenses}
    darkMode={darkMode}
  />

</div>

      <div className="mb-8">
        <ExpenseList
          expenses={
            filteredExpenses
          }
          fetchExpenses={
            fetchExpenses
          }
          darkMode={darkMode}
        />
      </div>

      <Insights
        expenses={
          filteredExpenses
        }
        darkMode={darkMode}
      />
    </div>
  );
}

export default Dashboard;