import { BovineData, TrendData, StructuralData } from '@/types/dashboard';
import mockData from './mockData.json';
import trendData from './trendData.json';
import structuralData from './structuralData.json';

export function getDashboardData(): BovineData[] {
  return mockData as BovineData[];
}

export function getTrendData(): TrendData[] {
  return trendData as TrendData[];
}

export function getStructuralData(): StructuralData[] {
  return structuralData as StructuralData[];
}


