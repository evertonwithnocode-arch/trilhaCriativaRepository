import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

const data = [
  { month: "Jan", percentage: 65 },
  { month: "Fev", percentage: 72 },
  { month: "Mar", percentage: 69 },
  { month: "Mai", percentage: 74 },
  { month: "Jun", percentage: 78 },
  { month: "Jul", percentage: 81 },
];

const colors = ["#F6C544", "#F6C544", "#F6C544", "#F6C544", "#F6C544", "#F89C2C"];

export default function PerformanceChart() {
  const [selectedPeriod, setSelectedPeriod] = React.useState('6');
  return (
    <div className="w-full h-[600px] bg-[#FFF5DA] rounded-xl pl-80 pt-10 pb-10 pr-80">
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-2xl font-bold text-gray-800">Evolução do desempenho</h2>
        <div className="flex items-center gap-3">
          <button className={`flex h-10 justify-center items-center gap-2 px-5 py-2 rounded-xl border-2 border-solid ${selectedPeriod === '6' ? 'shadow-[0_3px_0_0_#FFE0B2] bg-[#FFFCF2] border-[#FBDEB1]' : 'bg-[#FBDEB1] border-[#FBDEB1]'}`}>
            6 meses
          </button>
          <button className={`flex h-10 justify-center items-center gap-2 px-5 py-2 rounded-xl border-2 border-solid ${selectedPeriod === '6' ? 'shadow-[0_3px_0_0_#FFE0B2] bg-[#FFFCF2] border-[#FBDEB1]' : 'bg-[#FBDEB1] border-[#FBDEB1]'}`}>
            12 meses
          </button>
        </div>
        <div className=" w-[248px] h-[48px] ">
          <select className="px-3 py-1  w-[248px] h-[48px] rounded-lg border border-[#FFDFA8] text-[16px] font-medium text-gray-700 shadow-sm">
            <option>Geral</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} barSize={90}>
          <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f0dca7" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#333", fontSize: 16 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#333", fontSize: 18 }}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Bar dataKey="percentage" radius={[20, 20, 0, 0]}>
            <LabelList
              dataKey="percentage"
              position="insideTop"
              offset={20}
              style={{ fill: "#BB9205", fontWeight: "900", fontSize: 20 }}
              formatter={(value: number) => `${value}%`}
            />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
