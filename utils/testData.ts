import orderData from '../test-data/order-data.json';
import { OrderData } from './types';

export function getOrderData(): OrderData {
  return orderData as OrderData;
}

export function buildUniqueEmail(emailPrefix: string): string {
  const randomPart = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
  return `${emailPrefix}+${randomPart}@mailinator.com`;
}
