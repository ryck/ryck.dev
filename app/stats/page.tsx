import { formatDistance, isToday } from 'date-fns'
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

async function getAllMetrics() {
  const redis = await getRedis()
  // Get all keys matching health:*
  const keys = await redis.keys('*')
  const metrics: { [key: string]: any[] } = {}
  for (const key of keys) {
    // Get only the latest entry (highest score)
    const values = await redis.zRange(key, -1, -1)
    metrics[key.replace('health:', '')] = values.map((v) => {
      try {
        return JSON.parse(v)
      } catch {
        return v
      }
    })
  }
  await redis.quit()
  return metrics
}

const displayDate = (date: string) => {
  return isToday(date)
    ? 'Today'
    : formatDistance(new Date(date), new Date(), { addSuffix: true })
}

export default async function StatsPage() {
  let metrics: Record<string, any[]> = {}
  try {
    metrics = await getAllMetrics()
  } catch (e) {
    return notFound()
  }

  return (
    console.log('Metrics:', JSON.stringify(metrics, null, 2)),
    (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6">Health Metrics</h1>
        {Object.keys(metrics).length === 0 && <p>No data found.</p>}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600">
              Steps
            </h2>
            <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200">
              {metrics['step_count']?.[0]?.qty}
            </p>
            <p className="text-xs text-gray-500 mt-2 text-right">
              {displayDate(metrics['step_count']?.[0]?.date)}
            </p>
          </div>

          <div className="rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600">
              Heart rate
            </h2>
            <div className="flex flex-row gap-6 items-end">
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
            <p className="text-xs text-gray-500 mt-2 text-right">
              {displayDate(metrics['heart_rate']?.[0]?.date)}
            </p>
          </div>

          <div className="rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600">
              Resting Heart Rate
            </h2>
            <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200">
              {metrics['resting_heart_rate']?.[0]?.qty}
            </p>
            <p className="text-xs text-gray-500 mt-2 text-right">
              {displayDate(metrics['resting_heart_rate']?.[0]?.date)}
            </p>
          </div>

          <div className="rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600">
              Flights Climbed
            </h2>
            <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200">
              {metrics['flights_climbed']?.[0]?.qty}
            </p>
            <p className="text-xs text-gray-500 mt-2 text-right">
              {displayDate(metrics['flights_climbed']?.[0]?.date)}
            </p>
          </div>

          <div className="rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600">
              Blood Oxygen Saturation
            </h2>
            <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200">
              {metrics['blood_oxygen_saturation']?.[0]?.qty}
            </p>
            <p className="text-xs text-gray-500 mt-2 text-right">
              {displayDate(metrics['blood_oxygen_saturation']?.[0]?.date)}
            </p>
          </div>

          <div className="rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center">
            <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600">
              Sleeping Wrist Temp
            </h2>
            <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200">
              {metrics['apple_sleeping_wrist_temperature']?.[0]?.qty}
            </p>
            <p className="text-xs text-gray-500 mt-2 text-right">
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
