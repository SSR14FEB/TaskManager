import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"
function CustomPiChart({data, label, colors}) {
  console.log("data",data)
  return (
    <ResponsiveContainer width="100%" height={325}>
      <PieChart>
      <Pie
      data={data}
      dataKey="count"
      nameKey="status"
      cx="50%"
      cy="50%"
      outerRadius={130}
      innerRadius={100}
      labelLine={false}>
      {data.map((entery, index)=>(
        <Cell key={`Cell-${index}`} fill={colors[index % colors.length]}/>
      ))}
      </Pie>
      <Tooltip/>
      <Legend/>
      </PieChart>
    </ResponsiveContainer>
  )
}

export {CustomPiChart}