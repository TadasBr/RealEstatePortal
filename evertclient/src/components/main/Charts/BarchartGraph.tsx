import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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
    <BarChart width={600} height={600} data={barChartData}>
    <Bar dataKey="count" fill="green" className="font-bold"/>
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="uniqueText"/>
    <YAxis label={{ value: 'Count', angle: -90}}/>
  </BarChart>
  );
};

export default BarchartGraph;
