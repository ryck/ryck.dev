import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMonthName(date: string) {
  const month = new Date(date).toLocaleString('default', { month: 'short' })
  return month
}
