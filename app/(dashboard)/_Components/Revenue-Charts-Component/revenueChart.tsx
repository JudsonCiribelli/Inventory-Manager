"use client";

import { DayTodayRevenue } from "@/app/_data-acess/dasboard/get-dashboard";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/Components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig: ChartConfig = {
  totalRevenue: {
    label: "Receita",
  },
};
interface RevenueChartProps {
  data: DayTodayRevenue[];
}
const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-0 w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="totalRevenue" radius={4} />{" "}
      </BarChart>
    </ChartContainer>
  );
};

export default RevenueChart;
