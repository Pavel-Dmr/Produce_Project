function Create_Chart(yyyy, d40, d30, d20, d10, d0) {
  let temp = document.createElement("canvas");
  temp.id = "my_chart";

  $(".pop_main_graph").empty();
  $(".pop_main_graph").append(temp);

  var ctx = document.getElementById("my_chart").getContext("2d");
  var my_chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["40일전", "30일전", "20일전", "10일전", "당일"],
      datasets: [
        {
          label: yyyy,
          data: [d40, d30, d20, d10, d0],
          backgroundColor: [
            "rgba(255,99,132,0.2)",
            "rgba(54,162,235,0.2)",
            "rgba(255,206,86,0.2)",
            "rgba(75,192,192,0.2)",
            "rgba(153,102,255,0.2)",
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54,162,235,1)",
            "rgba(255,206,86,1)",
            "rgba(75,192,192,1)",
            "rgba(153,102,255,1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function Create_Chart2(yyyy, d40, d30, d20, d10, d0) {
  let temp = document.createElement("canvas");
  temp.id = "my_chart2";

  $(".pop_main_graph2").empty();
  $(".pop_main_graph2").append(temp);

  var ctx = document.getElementById("my_chart2").getContext("2d");
  var my_chart2 = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["40일전", "30일전", "20일전", "10일전", "당일"],
      datasets: [
        {
          label: yyyy,
          data: [d40, d30, d20, d10, d0],
          backgroundColor: [
            "rgba(255,99,132,0.2)",
            "rgba(54,162,235,0.2)",
            "rgba(255,206,86,0.2)",
            "rgba(75,192,192,0.2)",
            "rgba(153,102,255,0.2)",
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54,162,235,1)",
            "rgba(255,206,86,1)",
            "rgba(75,192,192,1)",
            "rgba(153,102,255,1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
