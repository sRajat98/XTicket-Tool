import React, { useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import Loader from "../../Components/Loader/Loader";
import { colors } from "./../../app/themes/variables";

const PieRating = ({ SLAPie }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  const COLORS = [colors.resolvedTicketBackground, "#0088FE"];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 5) * cos;
    const sy = cy + (outerRadius + 5) * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 15) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${payload.name} (${value})`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return SLAPie ? (
    <PieChart width={371} height={194} margin={-30}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        isAnimationActive={false}
        data={SLAPie}
        cx={200}
        cy={85}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        overflow={"auto"}
        onMouseEnter={onPieEnter}
      >
        {SLAPie.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  ) : (
    <Loader margintTop={"30px"} />
  );
};

export default PieRating;
