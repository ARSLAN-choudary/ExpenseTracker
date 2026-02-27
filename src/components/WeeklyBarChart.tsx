"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"

const chartData = [
  { day: "Fri", amount: 45 },
  { day: "Sat", amount: 95 },
  { day: "Sun", amount: 85 },
  { day: "Mon", amount: 30 },
  { day: "Tue", amount: 48 },
  { day: "Wed", amount: 130 },
  { day: "Thu", amount: 0 },
]

export function WeeklyBarChart() {
  return (
    <ChartContainer config={{}} className="h-[250px] w-full">
      <BarChart data={chartData} margin={{ left: -20 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="day" axisLine={true} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
        <YAxis 
          axisLine={true} 
          tickLine={false} 
          domain={[0, 140]} 
          ticks={[0, 35, 70, 105, 140]} 
          tick={{fill: '#94a3b8', fontSize: 12}} 
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="amount" fill="#10b981" radius={[2, 2, 0, 0]} barSize={40} />
      </BarChart>
    </ChartContainer>
  )
}