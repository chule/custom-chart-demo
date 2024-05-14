import { useMemo } from "react";
import * as d3 from "d3";

const XAxis = ({ domain, range }) => {
  const ticks = useMemo(() => {
    const xScale = d3.scaleTime().domain(domain).range(range);
    const width = range[1] - range[0];
    const pixelsPerTick = 100;
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));
    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [domain, range]);

  const timeFormat = d3.timeFormat("%b %d");

  return (
    <g>
      {/* <path
        d={["M", range[0], 6, "v", -6, "H", range[1], "v", 6].join(" ")}
        fill="none"
        stroke="currentColor"
      /> */}
      {ticks.map(({ value, xOffset }) => (
        <g key={timeFormat(value)} transform={`translate(${xOffset}, 0)`}>
          <line y2="6" stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
            }}
          >
            {timeFormat(value)}
          </text>
        </g>
      ))}
    </g>
  );
};

export default XAxis;
