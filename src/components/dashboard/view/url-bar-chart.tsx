'use client';

import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function UrlUseChart({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="5" opacity={0.5} />
        <XAxis dataKey="date" fontSize={14} tickLine={false} axisLine={false} />
        <YAxis fontSize={14} tickLine={false} axisLine={false} />
        <Tooltip labelClassName="dark:text-background font-semibold" />
        <Bar dataKey="uses" fill="#06801f" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
