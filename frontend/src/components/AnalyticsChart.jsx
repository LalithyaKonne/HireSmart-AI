import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function AnalyticsChart() {

  const data = [
    { month: "Jan", score: 60 },
    { month: "Feb", score: 70 },
    { month: "Mar", score: 80 },
    { month: "Apr", score: 85 },
    { month: "May", score: 90 },
  ];

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">

      <h2 className="text-xl font-bold mb-4">
        ATS Score Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="score"
            fill="#3b82f6"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsChart;