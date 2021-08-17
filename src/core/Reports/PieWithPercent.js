import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell, } from "recharts";
import { colors } from './../../app/themes/variables';

const PieWithPercent = (props) => {
  const [state, setState] = useState({ activeIndex: 0 });
  const mapChangesToState = (value) => setState({ ...state, ...value });

  const onPieEnter = (_, index) => {
    mapChangesToState({
      activeIndex: index,
    });
  };

  const COLORS = [
    colors.openTicketBackground,
    colors.xenieBlue,
    colors.inProgressTicketBackground,
    colors.awaitingTicketBackground,
    colors.xenieBlue,
    colors.escalatedTicketBackground,
    colors.closedTicketBackground,
    colors.xenieBlue,
    colors.resolvedTicketBackground,
    colors.xenieBlue,
    colors.xenieBlue];

  const SLACOLORS = [
    '#0088FE',
    colors.resolvedTicketBackground,
  ];

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
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
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
        >{`${props.tooltipLabel || props.name} (${value})`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${props.percentLabel || "Rate"} ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={state.activeIndex}
          activeShape={renderActiveShape}
          data={props.data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={props.data.length === 2 ? SLACOLORS[index % SLACOLORS.length] : COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieWithPercent;
