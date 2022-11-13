import React, { Component } from "react";
import Chart from "react-apexcharts";

class DashChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "Total Number of Users",
          type: "line",
          data: [1, 2, 3],
        },
        {
          name: "Money in the Bulsa",
          type: "column",
          data: [10000, 20000, 30000],
        },
      ],
      options: {
        chart: {
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
        labels: ["01 Nov 2022", "02 Nov 2022", "03 Nov 2022"],
        xaxis: {
          type: "datetime",
        },
        yaxis: [
          {
            /* title: {
              text: "Money in the Bulsa",
            }, */
          },
          {
            opposite: true,
            /* title: {
              text: "Total Number of Users1",
            }, */
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
