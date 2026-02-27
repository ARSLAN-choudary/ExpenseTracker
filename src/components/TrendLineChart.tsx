"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const trendData = [
  { month: "Sep", amount: 0 },
  { month: "Oct", amount: 0 },
  { month: "Nov", amount: 0 },
  { month: "Dec", amount: 0 },
  { month: "Jan", amount: 0 },
  { month: "Feb", amount: 1116 },
]

export function TrendLineChart() {
  return (
    <ChartContainer config={{}} className="h-[200px] w-full">
      <LineChart data={trendData} margin={{ left: -20, right: 10 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis 
          dataKey="month" 
          axisLine={false} 
          tickLine={false} 
          tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} 
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          domain={[0, 1200]}
          ticks={[0, 300, 600, 900, 1200]}
          tick={{fontSize: 12, fill: '#94a3b8'}} 
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line 
          type="monotone" 
          dataKey="amount" 
          stroke="#3b82f6" 
          strokeWidth={3} 
          dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  )
}