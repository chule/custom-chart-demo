import { useMemo } from "react";
import * as d3 from "d3";

import XAxis from "./XAxis";
import YAxis from "./YAxis";
import useChartDimensions from "./useChartDimensions";

const chartSettings = {
  marginTop: 50,
  marginRight: 10,
  marginBottom: 25,
  marginLeft: 50,
};

const CustomChart = ({ data }) => {
  const [ref, dms] = useChartDimensions(chartSettings);

  const parseTime = d3.timeParse("%Y-%m-%d");

  const xScale = useMemo(
    () =>
      d3
        .scaleTime()
        .domain([
          parseTime(data.chart.xAxis[0]),
          parseTime(data.chart.xAxis[data.chart.xAxis.length - 1]),
        ])
        .range([50, dms.boundedWidth - 50]),
    [dms.boundedWidth]
  );

  const values = data.chart.series.flat(1);

  const extent = d3.extent(values);

  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain(extent)
        .range([dms.boundedHeight - 50, 20]),
    [dms.boundedHeight]
  );

  const customData = data.chart.legends.map((d, i) => {
    return {
      name: d,
      color: data.chart.colors[i],
      values: data.chart.series[i].map((value, index) => {
        return { price: value, date: data.chart.xAxis[index] };
      }),
    };
  });

  const lineBuilder = d3
    .line()
    .x((d) => xScale(parseTime(d.date)))
    .y((d) => yScale(d.price));

  console.log(
    customData,
    xScale(parseTime("2024-03-07")),
    parseTime("2024-03-07")
  );

  return (
    <div className="Chart__wrapper" ref={ref} style={{ height: "600px" }}>
      <svg width={dms.width} height={dms.height}>
        <g
          transform={`translate(${[dms.marginLeft, dms.marginTop].join(",")})`}
        >
          {/* <rect
            width={dms.boundedWidth}
            height={dms.boundedHeight}
            fill="lavender"
          /> */}

          {/* {customData[0].values.map((d, i) => (
            <circle
              key={i}
              cx={xScale(parseTime(d.date))}
              cy={yScale(d.price)}
              r="6"
            />
          ))} */}

          {customData.map((row) => {
            return (
              <g key={row.name}>
                <path
                  key={row.name}
                  d={lineBuilder(row.values)}
                  stroke={row.color}
                  fill="none"
                  strokeWidth={6}
                />

                {row.values.map((d, i) =>
                  d.price !== null ? (
                    <circle
                      key={i}
                      cx={xScale(parseTime(d.date))}
                      cy={yScale(d.price)}
                      r="6"
                      fill={row.color}
                      stroke="white"
                    />
                  ) : null
                )}
              </g>
            );
          })}

          <g transform={`translate(${[0, dms.boundedHeight].join(",")})`}>
            <XAxis domain={xScale.domain()} range={xScale.range()} />
          </g>

          <YAxis domain={yScale.domain()} range={yScale.range()} />
        </g>
      </svg>
    </div>
  );
};

export default CustomChart;
