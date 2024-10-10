const width = 800;
const height = 500;
const margin = {
  left: 100,
  right: 50,
  top: 50,
  bottom: 50,
};
const svg = d3.select("#svg-chart").attr("width", width).attr("height", height);

const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;

const xScale = d3.scaleLinear().domain([1890, 2024]).range([0, plotWidth]);

const yScale = d3
  .scalePoint(["a", "b", "c"])
  .domain(["", "Male", "Female and Male", "Female", "sex"])
  .range([plotHeight, 0]);

d3.csv("9.the-met-nudes.csv").then(function (data) {
  let axisBottom = d3.axisBottom(xScale);

  let axisLeft = d3.axisLeft(yScale);

  d3.select("#bottom-axis")
    .attr(
      "transform",
      "translate(" + margin.left + "," + (height - margin.bottom) + ")"
    )
    .call(axisBottom);

  d3.select("#left-axis")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(axisLeft);

  svg
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("fill", function (d) {
      return d["Artist Gender"] == "female" ? "lightred" : "lightgreen";
    })
    .attr("opacity", 0.6)
    .attr("r", 4)
    .attr("cx", function (d, i) {
      return xScale(d["Object Begin Date"]);
    })
    .attr("cy", function (d, i) {
      return yScale(d["Nudity"]);
    })
    .on("mouseover", function (e, d) {
      d3.select(this).attr("fill", "red");
    })
    .on("mouseout", function (e, d) {
      d3.select(this).attr("fill", function (d) {
        return d["Artist Gender"] == "female" ? "lightred" : "lightgreen";
      });
    })
    .on("click", function (e, d) {
      console.log(e, d);

      d3.select("#info-box").html(name);
    });
});
