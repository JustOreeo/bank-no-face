import React, { Component } from "react";
import Chart from "react-apexcharts";
import { demoChartData } from "../../constants/demoChartData";

class DashChart extends Component {
  constructor(props) {
    super(props);
    const yTotalUsers = demoChartData.map((chartdata) => chartdata.users);
    const yTotalMoney = demoChartData.map((chartdata) => chartdata.money);
    const xDate = demoChartData.map((chartdata) => {
      return `${chartdata.date} GMT`;
    });

    console.table(
      "12345678945612345678945612315648123",
      yTotalUsers,
      yTotalMoney,
      xDate
    );

    this.state = {
      series: [
        {
          name: "Total Number of Users",
          type: "line",
          data: [...yTotalUsers],
        },
        {
          name: "Money in the Bulsa",
          type: "column",
          data: [...yTotalMoney],
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
          height: "550",
          type: "line",
          fontFamily: "inherit",
        },
        stroke: {
          width: [2, 4],
        },
        title: {
          text: "Daily New Account",
          align: "center",
          floating: false,
          offsetY: 16,
          style: {
            fontSize: "1rem",
            fontWeight: "600",
            fontFamily: "inherit",
            color: "green",
          },
        },
        dataLabels: {
          enabled: false,
        },
        labels: [...xDate],
        xaxis: {
          range: 4,
        },
        yaxis: [
          {
            /* title: {
              text: "Total Number of Users1",
            }, */
            labels: {
              show: true,
              formatter: (value) => {
                return value.toFixed(0);
              },
            },
          },
          {
            /* title: {
                text: "Money in the Bulsa",
              }, */
            opposite: true,
            labels: {
              show: true,
              formatter: (value) => {
                return new Intl.NumberFormat("fil-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(value);
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div className="dashchart-container">
        <Chart options={this.state.options} series={this.state.series} />
      </div>
    );
  }
}

export default DashChart;
