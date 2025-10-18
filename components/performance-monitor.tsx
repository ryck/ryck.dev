'use client'

import { useEffect } from 'react'

interface WebVitalMetric {
  name: string
  value: number
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean
  value: number
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals in development
    if (process.env.NODE_ENV === 'development') {
      const logWebVitals = (metric: WebVitalMetric) => {
        console.log(`🚀 ${metric.name}: ${metric.value}`)
      }

      // Monitor LCP
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              logWebVitals({
                name: 'LCP',
                value: entry.startTime,
              })
            }
          }
        })
        observer.observe({ entryTypes: ['largest-contentful-paint'] })
      }

      // Monitor CLS
      let clsValue = 0
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as LayoutShiftEntry
            if (layoutShiftEntry.hadRecentInput) continue
            clsValue += layoutShiftEntry.value
            logWebVitals({
              name: 'CLS',
              value: clsValue,
            })
          }
        })
        observer.observe({ entryTypes: ['layout-shift'] })
      }
    }
  }, [])

  return null // This component doesn't render anything
}