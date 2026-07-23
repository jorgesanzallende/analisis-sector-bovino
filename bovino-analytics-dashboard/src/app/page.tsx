import React from 'react';
import { getDashboardData } from '@/lib/data/api';
import KPICard from '@/components/ui/KPICard';
import { Map, TrendingUp, Coins } from 'lucide-react';
import ClusterScatterChart from '@/components/charts/ClusterScatterChart';
import ProductionBarChart from '@/components/charts/ProductionBarChart';
import SpainMap from '@/components/charts/SpainMap';
import MacroTrendChart from '@/components/charts/MacroTrendChart';

export default function Home() {
  const data = getDashboardData();
  const totalComunidades = data.length;
  const totalProduccion = data.reduce((acc, item) => acc + item.produccionCarne, 0);
  const promedioPrecio = totalComunidades > 0 
    ? data.reduce((acc, item) => acc + item.precioMedio, 0) / totalComunidades 
    : 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 p-8 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Dashboard del Sector Bovino
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Análisis interactivo de producción, precios y sostenibilidad por comunidades autónomas.
          </p>
        </header>

        {/* KPIs Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="Comunidades Autónomas"
            value={totalComunidades}
            icon={<Map className="w-6 h-6 text-blue-500" />}
          />
          <KPICard
            title="Producción de Carne (t)"
            value={totalProduccion.toLocaleString('es-ES')}
            icon={<TrendingUp className="w-6 h-6 text-emerald-500" />}
          />
          <KPICard
            title="Precio Medio (€/kg)"
            value={promedioPrecio.toLocaleString('es-ES', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
            icon={<Coins className="w-6 h-6 text-amber-500" />}
          />
        </section>

        {/* Charts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Distribución de Clústeres (Precio vs. Producción)
            </h2>
            <ClusterScatterChart />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Ranking de Producción de Carne por CCAA (t)
            </h2>
            <ProductionBarChart />
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Distribución Geográfica de Sostenibilidad (Clústeres)
          </h2>
          <SpainMap />
        </section>

        {/* Data Table Preview */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Detalle por Comunidad Autónoma
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-150 text-slate-500 text-sm font-medium">
                  <th className="py-3 px-4">Comunidad</th>
                  <th className="py-3 px-4 text-right">Año</th>
                  <th className="py-3 px-4 text-right">Producción (t)</th>
                  <th className="py-3 px-4 text-right">Precio Medio (€/kg)</th>
                  <th className="py-3 px-4 text-center">Sostenibilidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-900">{item.comunidad}</td>
                    <td className="py-3.5 px-4 text-right text-slate-500">{item.anio}</td>
                    <td className="py-3.5 px-4 text-right font-mono">{item.produccionCarne.toLocaleString('es-ES')}</td>
                    <td className="py-3.5 px-4 text-right font-mono">{item.precioMedio.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        item.clusterSostenibilidad === 'Alto' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.clusterSostenibilidad}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Trend Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4 col-span-full">
          <h2 className="text-xl font-semibold text-slate-900">
            Evolución Macroeconómica (2011-2023)
          </h2>
          <MacroTrendChart />
        </section>

      </div>
    </main>
  );
}
