function CategoryCards({
  expenses,
  darkMode,
}) {

  const totals = {};

  expenses.forEach((item) => {

    if (item.type === "Income")
      return;

    if (!totals[item.category]) {
      totals[item.category] = 0;
    }

    totals[item.category] +=
      item.amount;

  });

  const categories =
    Object.entries(totals);

  return (
    <div
      className={
        darkMode
          ? "bg-slate-800 rounded-2xl p-6 shadow-lg"
          : "bg-white rounded-2xl p-6 shadow-lg"
      }
    >

      <h2
        className={
          darkMode
            ? "text-white text-2xl font-bold mb-6"
            : "text-black text-2xl font-bold mb-6"
        }
      >
        Spending By Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {categories.map(
          ([category, amount]) => (

            <div
              key={category}
              className={
                darkMode
                  ? "bg-slate-700 rounded-xl p-5 text-center"
                  : "bg-gray-100 rounded-xl p-5 text-center"
              }
            >

              <h3 className="font-bold text-lg">
                {category}
              </h3>

              <p className="text-red-500 text-2xl font-bold mt-2">
                ₹{amount}
              </p>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default CategoryCards;