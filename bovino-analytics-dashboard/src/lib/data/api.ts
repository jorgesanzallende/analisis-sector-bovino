import { BovineData, TrendData } from '@/types/dashboard';
import mockData from './mockData.json';
import trendData from './trendData.json';

export function getDashboardData(): BovineData[] {
  return mockData as BovineData[];
}

export function getTrendData(): TrendData[] {
  return trendData as TrendData[];
}

