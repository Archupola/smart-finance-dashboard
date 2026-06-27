import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Charts({
  expenses,
  darkMode,
}) {

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

  const pieData =
    Object.entries(categoryTotals).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

  const COLORS = [
    "#2563eb",
    "#ef4444",
    "#22c55e",
    "#eab308",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#f97316",
  ];

  return (
    <div
      className={
        darkMode
          ? "bg-slate-800 rounded-2xl shadow-lg p-6"
          : "bg-white rounded-2xl shadow-lg p-6"
      }
    >
      <h2
        className={
          darkMode
            ? "text-white text-2xl font-bold mb-8"
            : "text-black text-2xl font-bold mb-8"
        }
      >
        Expense Analytics
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">

        <div>

          <h3
            className={
              darkMode
                ? "text-gray-300 text-xl font-semibold mb-4"
                : "text-gray-700 text-xl font-semibold mb-4"
            }
          >
            Spending Distribution
          </h3>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={120}
                label
              >
                {pieData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div>

          <h3
            className={
              darkMode
                ? "text-gray-300 text-xl font-semibold mb-4"
                : "text-gray-700 text-xl font-semibold mb-4"
            }
          >
            Category Comparison
          </h3>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart data={pieData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default Charts;