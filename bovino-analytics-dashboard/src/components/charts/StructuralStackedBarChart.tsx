"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { getStructuralData } from '@/lib/data/api';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const rawData = payload[0].payload;
    const total = 
      rawData.intensivaCebo + 
      rawData.extensivaLeche + 
      rawData.extensivaCarne + 
      rawData.mixta + 
      rawData.otras;

    return (
      <div className="bg-white p-3 border border-slate-100 rounded-lg shadow-md text-sm">
        <p className="font-bold text-slate-900 mb-2">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry: any) => {
            const realAbsValue = rawData[entry.dataKey];
            const realPercentage = total > 0 ? (realAbsValue / total) * 100 : 0;
            
            return (
              <div key={entry.name} className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.fill }}></span>
                  <span className="text-slate-500">{entry.name}:</span>
                </div>
                <span className="font-semibold text-slate-800">
                  {realAbsValue.toLocaleString('es-ES')} ({realPercentage.toFixed(1)}%)
                </span>
              </div>
            );
          })}
        </div>
        <div className="border-t border-slate-100 mt-2 pt-2 flex justify-between gap-6 text-xs font-semibold text-slate-500">
          <span>Total Explotaciones:</span>
          <span>{total.toLocaleString('es-ES')}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function StructuralStackedBarChart() {
  const data = getStructuralData();

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          stackOffset="expand"
          margin={{
            top: 20,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="comunidad" 
            stroke="#64748b" 
            fontSize={11}
            tickLine={false}
            interval={0}
            angle={-25}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            stroke="#64748b" 
            fontSize={12}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 12, fontWeight: 500 }} />
          <Bar 
            dataKey="intensivaCebo" 
            name="Intensiva (Cebo)" 
            fill="#f97316" 
            stackId="a" 
          />
          <Bar 
            dataKey="extensivaLeche" 
            name="Extensiva (Leche)" 
            fill="#10b981" 
            stackId="a" 
          />
          <Bar 
            dataKey="extensivaCarne" 
            name="Extensiva (Carne)" 
            fill="#047857" 
            stackId="a" 
          />
          <Bar 
            dataKey="mixta" 
            name="Mixta" 
            fill="#64748b" 
            stackId="a" 
          />
          <Bar 
            dataKey="otras" 
            name="Otras" 
            fill="#cbd5e1" 
            stackId="a" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
