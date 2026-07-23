"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { getTrendData } from '@/lib/data/api';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const prodData = payload.find((p: any) => p.dataKey === 'produccionTotal');
    const priceData = payload.find((p: any) => p.dataKey === 'precioMedio');
    
    return (
      <div className="bg-white p-3 border border-slate-100 rounded-lg shadow-md text-sm">
        <p className="font-bold text-slate-900">Año {label}</p>
        {prodData && (
          <p className="text-slate-500 mt-1">
            Producción: <span className="font-semibold text-sky-600">{prodData.value.toLocaleString('es-ES')} t</span>
          </p>
        )}
        {priceData && (
          <p className="text-slate-500">
            Precio Medio: <span className="font-semibold text-orange-600">{priceData.value.toFixed(2)} €/kg</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function MacroTrendChart() {
  const data = getTrendData();

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="anio" 
            stroke="#64748b" 
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            yAxisId="left"
            stroke="#0284c7" 
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            label={{ value: 'Producción Total (t)', angle: -90, position: 'insideLeft', offset: -10, fill: '#0284c7', fontSize: 13, fontWeight: 500 }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#ea580c" 
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => `${value.toFixed(1)}€`}
            label={{ value: 'Precio Medio (€/kg)', angle: 90, position: 'insideRight', offset: -10, fill: '#ea580c', fontSize: 13, fontWeight: 500 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 13, fontWeight: 500 }} />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="produccionTotal" 
            name="Producción Total (t)" 
            stroke="#0284c7" 
            strokeWidth={3}
            activeDot={{ r: 6 }} 
            dot={{ r: 4 }}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="precioMedio" 
            name="Precio Medio (€/kg)" 
            stroke="#ea580c" 
            strokeWidth={3}
            activeDot={{ r: 6 }} 
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
