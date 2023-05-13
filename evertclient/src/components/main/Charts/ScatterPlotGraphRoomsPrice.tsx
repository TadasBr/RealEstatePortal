import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Scatter,
  ScatterChart,
} from "recharts";

interface ScatterPlotData {
  firstNumber: number;
  secondNumber: number;
}

interface Props {
  scatterPlotData: ScatterPlotData[];
}

const ScatterPlotGraphRoomsPrice: React.FC<Props> = ({ scatterPlotData }) => {
  return (
    <ScatterChart margin={{ left: 30 }} width={1200 } height={600}>
      <CartesianGrid />
      <XAxis type="number" dataKey="firstNumber" name="Price" unit="€" />
      <YAxis
        type="number"
        dataKey="secondNumber"
        name="Room count"
        unit=" rooms"
        ticks={[1, 2, 3, 4, 5]}
      />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter data={scatterPlotData} fill="#8884d8" />
    </ScatterChart>
  );
};

export default ScatterPlotGraphRoomsPrice;
