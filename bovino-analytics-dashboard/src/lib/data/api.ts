import { BovineData } from '@/types/dashboard';
import mockData from './mockData.json';

export function getDashboardData(): BovineData[] {
  return mockData as BovineData[];
}
