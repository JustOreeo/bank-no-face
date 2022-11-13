import React, { Component } from "react";
import Chart from "react-apexcharts";
import { demoUsers } from "../../constants/demoUsers";

class DashChart extends Component {
  constructor(props) {
    super(props);

    const userList = JSON.parse(localStorage.getItem("users"));

    /* replace "demoUsers" with actual users list from local storage */
    const userCountByDate = {};
    userList.forEach(({ dateCreated }) => {
      userCountByDate[dateCreated] = (userCountByDate[dateCreated] || 0) + 1;
    });

    const userCount = Object.entries(userCountByDate).map(
      ([dateCreated, users]) => ({ dateCreated, users })
    );

    const yTotalUsers = userCount.map((chartdata) => chartdata.users);
    /* const yTotalMoney = demoChartData.map((chartdata) => chartdata.money); */
    const xDate = userCount.map((chartdata) => {
      return `${chartdata.dateCreated}`;
    });

    this.state = {
      series: [
        {
          name: "Total Number of Users",
          type: "line",
          data: [...yTotalUsers],
        },
        /*         {
          name: "Money in the Bulsa",
          type: "column",
          data: [...yTotalMoney],
        }, */
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
          width: [6, 4],
          /* colors: ["#00FF00"], */
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
          type: "category",
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
            /* opposite: true,
            labels: {
              show: true,
              formatter: (value) => {
                return new Intl.NumberFormat("fil-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(value);
              },
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
