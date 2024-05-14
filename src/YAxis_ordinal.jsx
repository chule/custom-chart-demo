import { useMemo } from "react";
import * as d3 from "d3";

const XAxis = ({ domain, range }) => {
  const ticks = useMemo(() => {
    const yScale = d3.scalePoint().domain(domain).range(range);
    const height = range[1] - range[0];
    // const pixelsPerTick = 100;
    // const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));
    return yScale.domain().map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [domain.join("-"), range.join("-")]);





  return (
    <g>
      {/* <path
        d={["M", range[0], 6, "v", -6, "H", range[1], "v", 6].join(" ")}
        fill="none"
        stroke="currentColor"
      /> */}
      {ticks.map(({ value, yOffset }) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          <line x2="6" stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "end",
              transform: "translate(-10px, 5px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </g>
  );
};

export default XAxis;
