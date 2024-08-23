"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const defaultConfig = {
  type: "line",
  height: 260,
  series: [
    {
      name: "Price",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      categories: [],
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
      style: {
        colors: "#616161",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400,
      },
    },
  },
};

export default function Example() {
  const [chartConfig, setChartConfig] = useState(null);
  const marketData = useSelector((state) => state.user.marketData);

  useEffect(() => {
    if (marketData) {
      setChartConfig({
        ...defaultConfig,
        series: [
          {
            name: "Price",
            data: marketData.map((data) => data.closing_price),
          },
        ],
        options: {
          ...defaultConfig.options,
          xaxis: {
            ...defaultConfig.options.xaxis,
            categories: marketData.map((data) => data.date),
          },
        },
      });
    }
  }, [marketData]);

  return chartConfig && <Chart {...chartConfig} />;
}
