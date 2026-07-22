import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function KPICard({ title, value, icon }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-slate-200">
      <div className="p-3 bg-slate-50 rounded-lg text-slate-600 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-semibold text-slate-900 mt-1">{value}</p>
      </div>
    </div>
  );
}
