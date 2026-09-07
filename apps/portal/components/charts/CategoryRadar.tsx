"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";

interface CategoryRadarProps {
  data: {
    category: string;
    score: number;
    passed: number;
    total: number;
  }[];
}

export function CategoryRadar({ data }: CategoryRadarProps) {
  const chartData = data.map((item) => ({
    subject: item.category,
    A: item.score || Math.round((item.passed / Math.max(1, item.total)) * 100),
    fullMark: 100,
  }));

  return (
    <div 
      className="h-[300px] w-full" 
      role="img" 
      aria-label="Gráfico de Radar mostrando o domínio por categoria de aprendizagem"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'var(--muted)', fontSize: 10, fontWeight: 600 }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '12px' }}
            itemStyle={{ color: 'var(--atlas-orange)', fontWeight: 'bold' }}
            formatter={(value: unknown) => [`${value}%`, 'Domínio']}
          />
          <Radar
            name="Domínio"
            dataKey="A"
            stroke="var(--atlas-orange)"
            fill="var(--atlas-orange)"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
