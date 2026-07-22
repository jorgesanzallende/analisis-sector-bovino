"use client";

import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label
} from 'recharts';
import { getDashboardData } from '@/lib/data/api';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-slate-100 rounded-lg shadow-md text-sm">
        <p className="font-semibold text-slate-900">{item.comunidad}</p>
        <p className="text-slate-500 mt-1">
          Precio: <span className="font-semibold text-slate-800">{item.precioMedio} €/kg</span>
        </p>
        <p className="text-slate-500">
          Producción: <span className="font-semibold text-slate-800">{item.produccionCarne.toLocaleString('es-ES')} t</span>
        </p>
        <p className="text-slate-500">
          Clúster Sostenibilidad: <span className={`font-semibold ${
            item.clusterSostenibilidad === 'Alto' ? 'text-emerald-600' : 'text-amber-600'
          }`}>{item.clusterSostenibilidad}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ClusterScatterChart() {
  const data = getDashboardData();

  const dataAlto = data.filter(item => item.clusterSostenibilidad === 'Alto');
  const dataMedio = data.filter(item => item.clusterSostenibilidad === 'Medio');

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 30,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            type="number" 
            dataKey="precioMedio" 
            name="Precio Medio" 
            unit=" €/kg"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            domain={['auto', 'auto']}
          >
            <Label value="Precio Medio (€/kg)" offset={-15} position="insideBottom" fill="#475569" fontSize={13} fontWeight={500} />
          </XAxis>
          <YAxis 
            type="number" 
            dataKey="produccionCarne" 
            name="Producción de Carne" 
            unit=" t"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            domain={['auto', 'auto']}
          >
            <Label value="Producción de Carne (t)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="#475569" fontSize={13} fontWeight={500} />
          </YAxis>
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#cbd5e1' }} />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 13, fontWeight: 500 }} />
          <Scatter 
            name="Sostenibilidad Alta" 
            data={dataAlto} 
            fill="#10b981" 
            shape="circle" 
          />
          <Scatter 
            name="Sostenibilidad Media" 
            data={dataMedio} 
            fill="#f59e0b" 
            shape="circle" 
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
