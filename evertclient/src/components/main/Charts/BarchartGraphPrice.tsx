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
  price: number
}

interface Props {
  barChartData: BarChartData[];
}

const BarchartGraphPrice: React.FC<Props> = ({ barChartData }) => {
  return (
    <BarChart margin={{left: 30, bottom: 70}} width={1200} height={600} data={barChartData}>
    <Bar dataKey="price" fill="#82ca9d" className="font-bold"/>
    <CartesianGrid stroke="#ccc" vertical={false}/>
    <XAxis dataKey="uniqueText" angle={-90} dy={40} interval="preserveStartEnd"/>
    <Tooltip cursor={{ strokeDasharray: "3 3" }}/>
    <YAxis  unit="€"/>
  </BarChart>
  );
};

export default BarchartGraphPrice;
