import React from 'react';
import ApexCharts from 'react-apexcharts';

const PieChart = () => {
  const options = {
    series: [44, 55, 13, 43, 22],
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Meetings', 'Fitness', 'Study', 'Travel', 'Household'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: false,
        },
      },
    }],
  };

  return (
    <div id="chart">
      <ApexCharts options={options} series={options.series} type="pie" width={400} />
    </div>
  );
};

export default PieChart;
