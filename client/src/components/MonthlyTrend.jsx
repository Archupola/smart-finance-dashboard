import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function MonthlyTrend({
  expenses,
  darkMode,
}) {

  const months = {};

  expenses.forEach((item) => {

    const date = new Date(
      item.createdAt
    );

    const month =
      date.toLocaleString("default", {
        month: "short",
      });

    if (!months[month]) {
      months[month] = 0;
    }

    if (item.type !== "Income") {
      months[month] += item.amount;
    }

  });

  const data =
    Object.keys(months).map(
      (month) => ({
        month,
        amount: months[month],
      })
    );

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
            ? "text-white text-2xl font-bold mb-5"
            : "text-black text-2xl font-bold mb-5"
        }
      >
        Monthly Expense Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default MonthlyTrend;