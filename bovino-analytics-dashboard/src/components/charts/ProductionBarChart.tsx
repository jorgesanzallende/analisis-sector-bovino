"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { getDashboardData } from '@/lib/data/api';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-slate-100 rounded-lg shadow-md text-sm">
        <p className="font-bold text-slate-900">{item.comunidad}</p>
        <p className="text-slate-500 mt-1">
          Producción: <span className="font-semibold text-slate-800">{item.produccionCarne.toLocaleString('es-ES')} t</span>
        </p>
        <p className="text-slate-500">
          Precio Medio: <span className="font-semibold text-slate-800">{item.precioMedio} €/kg</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ProductionBarChart() {
  const rawData = getDashboardData();
  
  const sortedData = [...rawData].sort((a, b) => b.produccionCarne - a.produccionCarne);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis 
            dataKey="comunidad" 
            stroke="#64748b" 
            fontSize={11}
            tickLine={false}
            interval={0}
            angle={-35}
            textAnchor="end"
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={11}
            tickLine={false}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
          <Bar dataKey="produccionCarne" radius={[4, 4, 0, 0]}>
            {sortedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.clusterSostenibilidad === 'Alto' ? '#0f766e' : '#14b8a6'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
