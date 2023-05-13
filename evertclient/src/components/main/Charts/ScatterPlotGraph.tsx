import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Scatter,
  ScatterChart,
  ResponsiveContainer,
} from "recharts";

interface ScatterPlotData {
  firstNumber: number;
  secondNumber: number;
}

interface Props {
  scatterPlotData: ScatterPlotData[];
}

const ScatterPlotGraph: React.FC<Props> = ({ scatterPlotData }) => {
  return (
    <ScatterChart margin={{ left: 30 }} width={700} height={600}>
      <CartesianGrid />
      <XAxis type="number" dataKey="firstNumber" name="Price" unit="€" />
      <YAxis
        type="number"
        dataKey="secondNumber"
        name="Sell time"
        unit="days"
      />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter data={scatterPlotData} fill="#8884d8" />
    </ScatterChart>
  );
};

export default ScatterPlotGraph;
