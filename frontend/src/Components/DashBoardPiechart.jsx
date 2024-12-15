import React from 'react';
import ApexCharts from 'react-apexcharts';

const DashBoardPiechart = ({eventTypes}) => {
  console.log("Event types pie:",eventTypes)
  const options = {
    series: eventTypes,
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Office Work', 'Personal', 'Health & Fitness', 'Education', 'Household Work','Travel & Vacation','Other Task'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
  };

  return (
    <div id="chart">
      <ApexCharts options={options} series={options.series} type="pie" width={440} />
    </div>
  );
};

export default DashBoardPiechart;
