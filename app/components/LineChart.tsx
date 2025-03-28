"use client";

import ReactECharts from "echarts-for-react";

export default function Home() {
  const option = {
    series: [
      {
        type: "gauge",
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, "#67e0e3"],
              [0.7, "#37a2da"],
              [1, "#fd666d"],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: "#fff",
            width: 2,
          },
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: "#fff",
            width: 4,
          },
        },
        axisLabel: {
          color: "inherit",
          distance: 40,
          fontSize: 15,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value} kWh",
          color: "inherit",
        },
        data: [
          {
            value: (Math.random() * 100).toFixed(2), //toFixed() ca definit les nombres après la virgule ici c'est 2.
          },
        ],
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "280px", width: "400px" }} />
  );
}
