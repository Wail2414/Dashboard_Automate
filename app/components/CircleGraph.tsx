"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
type ChartProps = {
  width: number;
  height: number;
};

const CircleGraph: React.FC<ChartProps> = ({ width, height }) => {
  const options = {
    title: {
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },

    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return <ReactECharts option={options} style={{ width, height }} />;
};
export default CircleGraph;
