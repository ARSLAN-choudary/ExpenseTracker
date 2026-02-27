"use client"

import { Pie, PieChart, Cell, LabelList } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"

// 1. Interface define karein taake TypeScript ko pata chale 'total' aane wala hai
interface CategoryPieChartProps {
  total: number;
}

const chartData = [
  { name: "Food & Dining", value: 22, fill: "#ff6b6b" },
  { name: "Transport", value: 9, fill: "#4ecdc4" },
  { name: "Entertainment", value: 18, fill: "#f06292" },
  { name: "Bills & Utilities", value: 18, fill: "#a29bfe" },
  { name: "Shopping", value: 8, fill: "#9deed9" },
  { name: "Health", value: 18, fill: "#fbc2eb" },
  { name: "Education", value: 21, fill: "#aedff7" },
]

// 2. Props mein 'total' ko destructure karein
export function CategoryPieChart({  }: CategoryPieChartProps) {
  return (
    <div className="flex flex-col items-center">
      <ChartContainer config={{}} className="mx-auto aspect-square max-h-[350px] w-full">
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
            paddingAngle={0}
          >
            <LabelList 
              dataKey="value" 
              position="outside" 
              offset={15}
              formatter={(value: number) => `${value}%`}
              fill="#94a3b8"
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

      
    </div>
  )
}