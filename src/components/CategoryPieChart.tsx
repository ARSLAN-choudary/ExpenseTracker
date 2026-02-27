"use client"

import { Pie, PieChart, Cell, LabelList } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"

const chartData = [
  { name: "Food & Dining", value: 22, fill: "#ff6b6b" }, // Coral/Red
  { name: "Transport", value: 9, fill: "#4ecdc4" },  // Teal
  { name: "Entertainment", value: 18, fill: "#f06292" }, // Pink
  { name: "Bills & Utilities", value: 18, fill: "#a29bfe" }, // Purple
  { name: "Shopping", value: 8, fill: "#9deed9" },  // Mint
  { name: "Health", value: 18, fill: "#fbc2eb" },   // Light Pink
  { name: "Education", value: 21, fill: "#aedff7" }, // Sky Blue
]

export function CategoryPieChart() {
  return (
    <ChartContainer config={{}} className="mx-auto aspect-square max-h-[350px]">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={0}
          outerRadius={80}
          stroke="#fff"
          strokeWidth={2}
          isAnimationActive={true}
          // Padding taake labels slice ke upar na charhein
          paddingAngle={0}
        >
          {/* Slices ke bahar values show karne ke liye */}
          <LabelList 
            dataKey="value" 
            position="outside" 
            offset={15}
            formatter={(value: number) => `${value}%`}
            fill="#94a3b8" // Image jesa light gray color
            fontSize={11}
            fontWeight={600}
            stroke="none"
          />

          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}