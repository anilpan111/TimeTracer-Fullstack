import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const VerticalBarChart = ({chartData}) => {



  const series =  [
    {
      name: "Remaining",
      data: chartData.remainingMinutes,
    },
    {
      name: "Completed",
      data: chartData.completedMinutes,
    },
    
  ]

  const options ={
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false,
      },
      
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end", // 'around', 'end'
        borderRadiusWhenStacked: "last", // 'all', 'last'
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      categories: chartData.categories,
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  }

  return (
    <div>
      <div id="chart" className="bg-colorLevel3">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={450}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default VerticalBarChart;
