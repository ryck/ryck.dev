import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'redis'

type MetricEntry = {
  [key: string]: string | number | undefined
}

type Metric = {
  name: string
  data: MetricEntry[]
}

let redis: ReturnType<typeof createClient> | null = null
async function getRedis() {
  if (!process.env.REDIS_URL) {
    throw new Error('Redis URL not configured')
  }
  if (!redis) {
    redis = createClient({ url: process.env.REDIS_URL })
    await redis.connect()
  }
  return redis
}

// POST /api/health
export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
  }

  let body: { data?: { metrics?: Metric[] } } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Clean up: remove 'source', round up every number property, and order keys alphabetically in all metrics
  if (body?.data?.metrics && Array.isArray(body.data.metrics)) {
    body.data.metrics = body.data.metrics.map((metric) => {
      if (Array.isArray(metric.data)) {
        metric.data = metric.data.map((entry) => {
          // Clean and order keys alphabetically
          const keys = Object.keys(entry)
            .filter((key) => key !== 'source')
            .sort()
          const cleaned: MetricEntry = {}
          for (const key of keys) {
            if (typeof entry[key] === 'number') {
              cleaned[key] = Math.ceil(entry[key] as number)
            } else {
              cleaned[key] = entry[key]
            }
          }
          return cleaned
        })
      }
      return metric
    })
  }

  // Store the cleaned data in Redis
  const metrics = body?.data?.metrics as Metric[]
  
  try {
    const redisClient = await getRedis()
    for (const metric of metrics) {
      const metricName = metric.name
      for (const entry of metric.data) {
        if (!entry.date) continue
        // Extract date and hour (YYYY-MM-DD HH)
        const dateObj = new Date(String(entry.date))
        const y = dateObj.getFullYear()
        const m = String(dateObj.getMonth() + 1).padStart(2, '0')
        const d = String(dateObj.getDate()).padStart(2, '0')
        const dateHourStr = `${y}${m}${d}` // e.g., 20250705
        const score = parseInt(dateHourStr, 10)
        // Remove all existing entries with this score (date) before adding the new one
        const existing = await redisClient.zRangeByScore(
          `${metricName}`,
          score,
          score,
        )
        if (Array.isArray(existing) && existing.length > 0) {
          await redisClient.zRem(`${metricName}`, existing)
        }
        await redisClient.zAdd(`${metricName}`, [
          { score, value: JSON.stringify(entry) },
        ])
      }
    }
  } catch (error) {
    console.error('Redis error:', error)
    return NextResponse.json({ 
      status: 'error', 
      message: 'Redis not available, data not stored',
      received: body 
    }, { status: 500 })
  }

  return NextResponse.json({ status: 'ok', received: body })
}
