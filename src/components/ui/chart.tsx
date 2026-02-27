"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

export type ChartConfig = Record<string, { label?: React.ReactNode; color?: string }>

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null)

export const ChartContainer = React.forwardRef<HTMLDivElement, any>(({ config, children, className, ...props }, ref) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <div ref={ref} className={cn("flex aspect-video justify-center text-xs", className)} {...props}>
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})

export const ChartTooltip = RechartsPrimitive.Tooltip

export const ChartTooltipContent = React.forwardRef<any, any>((props, ref) => {
  const { payload, hideLabel } = props
  if (!payload?.length) return null

  return (
    <div ref={ref} className="rounded-lg border border-slate-200 bg-white p-2 shadow-md">
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.payload.fill || item.color }} />
          <span className="font-bold text-slate-800">{item.name}: ${item.value}</span>
        </div>
      ))}
    </div>
  )
})