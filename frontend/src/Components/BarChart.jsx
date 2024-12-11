import React from 'react';
import ApexCharts from 'react-apexcharts';

const BarChart = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF", "#33FFC4", "#FF9133", "#6BFF33"];

  const options = {
    series: [{
      data: [21, 22, 10, 28, 16, 21, 13, 60]
    }],
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: function (chart, w, e) {
          // Handle chart click event
          console.log(chart, w, e);
        }
      }
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [
        ['John', 'Doe'],
        ['Joe', 'Smith'],
        ['Jake', 'Williams'],
        'Amber',
        ['Peter', 'Brown'],
        ['Mary', 'Evans'],
        ['David', 'Wilson'],
        ['Lily', 'Roberts'],
      ],
      labels: {
        style: {
          colors: colors,
          fontSize: '12px'
        }
      }
    }
  };

  return (
    <div id="chart">
      <ApexCharts options={options} series={options.series} type="bar" height={250} />
    </div>
  );
};

export default BarChart;
