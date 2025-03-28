"use client";

import React from "react";
import ReactECharts from "echarts-for-react";

type ChartProps = {
  width: number;
  height: number;
};

const LineCharto: React.FC<ChartProps> = ({ width, height }) => {
  const options = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };

  return <ReactECharts option={options} style={{ width, height }} />;
};

export default LineCharto;
