'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MarketData {
    year: string;
    price: number;
}

interface MarketChartProps {
    data: MarketData[];
}

export function MarketChart({ data }: MarketChartProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-full">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Market Trends</h2>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Median Price']}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#0ea5e9"
                            strokeWidth={3}
                            dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
