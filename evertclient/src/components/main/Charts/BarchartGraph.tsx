import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface BarChartData {
  uniqueText: string,
  count: number
}

interface Props {
  barChartData: BarChartData[];
}

const BarchartGraph: React.FC<Props> = ({ barChartData }) => {
  return (
    <BarChart margin={{left: 30}} width={800} height={600} data={barChartData}>
    <Bar dataKey="count" fill="#82ca9d" className="font-bold"/>
    <CartesianGrid stroke="#ccc" vertical={false}/>
    <XAxis dataKey="uniqueText"/>
    <Tooltip cursor={{ strokeDasharray: "3 3" }}/>
    <YAxis label={{ value: 'Count', angle: -90}}/>
  </BarChart>
  );
};

export default BarchartGraph;
