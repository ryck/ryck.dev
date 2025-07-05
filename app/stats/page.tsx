import { formatDistance, isToday } from 'date-fns'
import {
  Droplets,
  Footprints,
  Heart,
  HeartPulse,
  Thermometer,
  TrendingUp,
} from 'lucide-react'
import { notFound } from 'next/navigation'
import { createClient } from 'redis'

export const metadata = {
  title: 'Life Stats',
  description: 'Latest life metrics and stats overview.',
}

async function getRedis() {
  const redis = createClient({ url: process.env.REDIS_URL })
  await redis.connect()
  return redis
}

type MetricEntry = {
  [key: string]: string | number | undefined
}

type MetricsMap = {
  [key: string]: MetricEntry[]
}

async function getAllMetrics(): Promise<MetricsMap> {
  const redis = await getRedis()
  // Get all keys matching health:*
  const keys = await redis.keys('*')
  const metrics: MetricsMap = {}
  for (const key of keys) {
    // Get only the latest entry (highest score)
    const values = await redis.zRange(key, -1, -1)
    metrics[key] = values.map((v) => {
      try {
        return JSON.parse(v) as MetricEntry
      } catch {
        return v as unknown as MetricEntry
      }
    })
  }
  await redis.quit()
  return metrics
}

const displayDate = (date: string | number | undefined) => {
  if (typeof date !== 'string') return null
  return isToday(date)
    ? 'Today'
    : formatDistance(new Date(date), new Date(), { addSuffix: true })
}

export default async function StatsPage() {
  let metrics: MetricsMap = {}
  try {
    metrics = await getAllMetrics()
  } catch {
    return notFound()
  }

  return (
    console.log('Metrics:', JSON.stringify(metrics, null, 2)),
    (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6">Health Metrics</h1>
        {Object.keys(metrics).length === 0 && <p>No data found.</p>}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
            <Footprints className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
            <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
              Steps
            </h2>
            <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
              {metrics['step_count']?.[0]?.qty}
            </p>
            <p className="text-xs text-gray-500 mt-2 text-right z-10">
              {displayDate(metrics['step_count']?.[0]?.date)}
            </p>
          </div>

          <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
            <HeartPulse className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
            <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
              Heart rate
            </h2>
            <div className="flex flex-row gap-6 items-end z-10">
              <div className="flex flex-col items-center">
                <span className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                  Max
                </span>
                <span className="text-3xl font-bold text-zinc-500 dark:text-zinc-200">
                  {metrics['heart_rate']?.[0]?.Max ?? '--'}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                  Min
                </span>
                <span className="text-3xl font-bold text-zinc-500 dark:text-zinc-200">
                  {metrics['heart_rate']?.[0]?.Min ?? '--'}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                  Avg
                </span>
                <span className="text-3xl font-bold text-zinc-500 dark:text-zinc-200">
                  {metrics['heart_rate']?.[0]?.Avg ?? '--'}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-right z-10">
              {displayDate(metrics['heart_rate']?.[0]?.date)}
            </p>
          </div>

          <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
            <Heart className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
            <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
              Resting Heart Rate
            </h2>
            <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
              {metrics['resting_heart_rate']?.[0]?.qty}
            </p>
            <p className="text-xs text-gray-500 mt-2 text-right z-10">
              {displayDate(metrics['resting_heart_rate']?.[0]?.date)}
            </p>
          </div>

          <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
            <TrendingUp className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
            <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
              Flights Climbed
            </h2>
            <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
              {metrics['flights_climbed']?.[0]?.qty}
            </p>
            <p className="text-xs text-gray-500 mt-2 text-right z-10">
              {displayDate(metrics['flights_climbed']?.[0]?.date)}
            </p>
          </div>

          <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
            <Droplets className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
            <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
              Blood Oxygen Saturation
            </h2>
            <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
              {metrics['blood_oxygen_saturation']?.[0]?.qty}
            </p>
            <p className="text-xs text-gray-500 mt-2 text-right z-10">
              {displayDate(metrics['blood_oxygen_saturation']?.[0]?.date)}
            </p>
          </div>

          <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
            <Thermometer className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
            <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
              Sleeping Wrist Temp
            </h2>
            <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
              {metrics['apple_sleeping_wrist_temperature']?.[0]?.qty}
            </p>
            <p className="text-xs text-gray-500 mt-2 text-right z-10">
              {displayDate(
                metrics['apple_sleeping_wrist_temperature']?.[0]?.date,
              )}
            </p>
          </div>
          {/* Add more metrics here as needed */}
        </div>
      </main>
    )
  )
}
