function Insights({
  expenses,
  darkMode,
}) {

  const income = expenses
    .filter(
      (item) =>
        item.type === "Income"
    )
    .reduce(
      (acc, item) =>
        acc + item.amount,
      0
    );

  const totalExpenses = expenses
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

  const categoryTotals = {};

  expenses.forEach((item) => {

    if (item.type === "Income")
      return;

    if (!categoryTotals[item.category]) {
      categoryTotals[item.category] = 0;
    }

    categoryTotals[item.category] +=
      item.amount;

  });

  const topCategory =
    Object.keys(categoryTotals)
      .length > 0
      ? Object.keys(
          categoryTotals
        ).reduce((a, b) =>
          categoryTotals[a] >
          categoryTotals[b]
            ? a
            : b
        )
      : "-";

  const average =
    expenses.length > 0
      ? (
          totalExpenses /
          expenses.filter(
            (e) =>
              e.type !==
              "Income"
          ).length
        ).toFixed(2)
      : 0;

  return (
    <div
      className={
        darkMode
          ? "bg-slate-800 rounded-2xl shadow-lg p-6 mt-8"
          : "bg-white rounded-2xl shadow-lg p-6 mt-8"
      }
    >

      <h2
        className={
          darkMode
            ? "text-white text-3xl font-bold mb-8"
            : "text-black text-3xl font-bold mb-8"
        }
      >
        Financial Insights
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-blue-100 rounded-xl p-5">

          <h3 className="font-bold">
            Average Expense
          </h3>

          <p className="text-3xl mt-3 text-blue-700 font-bold">
            ₹{average}
          </p>

        </div>

        <div className="bg-green-100 rounded-xl p-5">

          <h3 className="font-bold">
            Highest Category
          </h3>

          <p className="text-2xl mt-3 text-green-700 font-bold">
            {topCategory}
          </p>

        </div>

        <div className="bg-purple-100 rounded-xl p-5">

          <h3 className="font-bold">
            Current Balance
          </h3>

          <p className="text-3xl mt-3 text-purple-700 font-bold">
            ₹{balance}
          </p>

        </div>

        <div className="bg-red-100 rounded-xl p-5">

          <h3 className="font-bold">
            Total Expenses
          </h3>

          <p className="text-3xl mt-3 text-red-700 font-bold">
            ₹{totalExpenses}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Insights;