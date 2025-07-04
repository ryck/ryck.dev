import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'redis'

let redis: ReturnType<typeof createClient> | null = null
async function getRedis() {
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

  let body: any
  try {
    body = await req.json()
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Clean up: remove 'source', round up every number property, and order keys alphabetically in all metrics
  if (body?.data?.metrics && Array.isArray(body.data.metrics)) {
    body.data.metrics = body.data.metrics.map((metric: any) => {
      if (Array.isArray(metric.data)) {
        metric.data = metric.data.map((entry: any) => {
          // Clean and order keys alphabetically
          const keys = Object.keys(entry)
            .filter((key) => key !== 'source')
            .sort()
          const cleaned: any = {}
          for (const key of keys) {
            if (typeof entry[key] === 'number') {
              cleaned[key] = Math.ceil(entry[key])
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

  console.log('Cleaned body:', JSON.stringify(body, null, 2))

  // Store the cleaned data in Redis
  const metrics = body.data.metrics
  const redisClient = await getRedis()
  for (const metric of metrics) {
    const metricName = metric.name
    for (const entry of metric.data) {
      if (!entry.date) continue
      // Extract date part only (YYYY-MM-DD)
      const dateStr = entry.date.slice(0, 10).replace(/-/g, '')
      const score = parseInt(dateStr, 10) // e.g., 20250703
      await redisClient.zAdd(`${metricName}`, [
        { score, value: JSON.stringify(entry) },
      ])
    }
  }

  return NextResponse.json({ status: 'ok', received: body })
}
