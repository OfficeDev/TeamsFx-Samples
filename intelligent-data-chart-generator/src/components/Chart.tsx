import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart(prop: {
  data: any[];
  xKey: string;
  yKey: string;
}) {
  const { data, xKey, yKey } = prop;
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} maxBarSize={20}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={yKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
