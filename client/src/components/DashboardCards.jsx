function DashboardCards({
  income,
  expenses,
  balance,
  savings,
  budget,
  setBudget,
  transactions,
  growth,
  darkMode,
}) {
  const cards = [
    {
      title: "Monthly Budget",
      value: `₹${budget}`,
      color: "text-blue-500",
      icon: "💰",
    },
    {
      title: "Income",
      value: `₹${income}`,
      color: "text-green-500",
      icon: "📈",
    },
    {
      title: "Expenses",
      value: `₹${expenses}`,
      color: "text-red-500",
      icon: "📉",
    },
    {
      title: "Balance",
      value: `₹${balance}`,
      color:
        balance >= 0
          ? "text-green-500"
          : "text-red-500",
      icon: "🏦",
    },
    {
      title: "Savings",
      value: `${savings}%`,
      color: "text-purple-500",
      icon: "💵",
    },
    {
      title: "Transactions",
      value: transactions,
      color: "text-orange-500",
      icon: "📝",
    },
    {
      title: "Growth",
      value: `${growth}%`,
      color:
        growth >= 0
          ? "text-emerald-500"
          : "text-red-500",
      icon: "🚀",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={
            darkMode
              ? "bg-slate-800 border border-slate-700 rounded-2xl shadow-lg p-6 hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300"
              : "bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
          }
        >
          <div className="flex justify-between items-center mb-4">

            <h3
              className={
                darkMode
                  ? "text-gray-300 text-lg font-semibold"
                  : "text-gray-600 text-lg font-semibold"
              }
            >
              {card.title}
            </h3>

            <span className="text-3xl">
              {card.icon}
            </span>

          </div>

          <p
            className={`text-4xl font-bold ${card.color}`}
          >
            {card.value}
          </p>

          {card.title ===
            "Monthly Budget" && (
            <input
              type="number"
              value={budget}
              onChange={(e) =>
                setBudget(
                  Number(e.target.value)
                )
              }
              className={
                darkMode
                  ? "mt-5 w-full bg-slate-900 border border-slate-600 text-white rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  : "mt-5 w-full bg-white border border-gray-300 text-black rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;