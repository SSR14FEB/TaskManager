import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";


function CustomBarChart({ data, label, colors }) {
  // Normalize priority for color mapping
  const getBarColors = (priority = '') => {
    switch (priority.toLowerCase()) {
      case 'low': return '#00BC7D';
      case 'medium': return '#FE9900';
      case 'high': return '#FF1F57';
      default: return '#8884d8'; // fallback color
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid stroke="none" />
        <XAxis
          dataKey="priority"
          tick={{ fontSize: 12, fill: "#555" }}
          stroke="none"
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#555" }}
          stroke="none"
        />
        <Tooltip />
        <Bar
          dataKey="count"
          nameKey="priority"
          name=" "
          radius={[10, 10, 0, 0]}
          activeDot={{r:8,fill:"yellow"}}
          activeStyle = {{fill:"green"}}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColors(entry.priority)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export { CustomBarChart };
