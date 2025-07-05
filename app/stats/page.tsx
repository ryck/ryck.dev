import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  formatDistance,
  isToday,
} from 'date-fns'
import {
  BookOpen,
  Calendar,
  Droplets,
  Eclipse,
  Footprints,
  GitBranch,
  GitCommitVertical,
  Heart,
  HeartPulse,
  Orbit,
  RulerDimensionLine,
  Star,
  Thermometer,
  TrendingUp,
  Users,
} from 'lucide-react'
import { notFound } from 'next/navigation'
import React from 'react'
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

type MetricEntry = Record<string, string | number | undefined>

type MetricsMap = Record<string, MetricEntry[]>

async function getHealthMetrics(): Promise<MetricsMap> {
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
        return { value: v } as MetricEntry
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

type GitHubStats = {
  public_repos: number
  followers: number
  totalStars: number
  totalForks: number
  totalCommits: number | null
  topRepo: {
    name: string
    stars: number
    url: string
  } | null
}

async function getGitHubStats(): Promise<GitHubStats> {
  const userRes = await fetch('https://api.github.com/users/ryck', {
    next: { revalidate: 3600 },
  })
  if (!userRes.ok) throw new Error('Failed to fetch GitHub user')
  const user = await userRes.json()
  const reposRes = await fetch(
    'https://api.github.com/users/ryck/repos?per_page=100',
    { next: { revalidate: 3600 } },
  )
  if (!reposRes.ok) throw new Error('Failed to fetch GitHub repos')
  const repos = await reposRes.json()
  const totalStars = repos.reduce(
    (sum: number, r: any) => sum + (r.stargazers_count || 0),
    0,
  )
  const totalForks = repos.reduce(
    (sum: number, r: any) => sum + (r.forks_count || 0),
    0,
  )
  const topRepo = repos.sort(
    (a: any, b: any) => b.stargazers_count - a.stargazers_count,
  )[0]
  // Fetch total commits (sum of all public repo default branch commits)
  let totalCommits = null
  try {
    let commitCount = 0
    for (const repo of repos) {
      // Include forked repos as well
      const commitsRes = await fetch(
        `https://api.github.com/repos/ryck/${repo.name}/commits?per_page=1`,
        { next: { revalidate: 3600 } },
      )
      if (commitsRes.ok) {
        const link = commitsRes.headers.get('link')
        if (link) {
          // Parse last page number from link header
          const match = link.match(/&page=(\d+)>; rel="last"/)
          if (match) {
            commitCount += parseInt(match[1], 10)
          } else {
            // Only one page
            commitCount += 1
          }
        } else {
          // Only one commit
          commitCount += 1
        }
      }
    }
    totalCommits = commitCount
  } catch {}
  return {
    public_repos: user.public_repos,
    followers: user.followers,
    totalStars,
    totalForks,
    totalCommits,
    topRepo: topRepo
      ? {
          name: topRepo.name,
          stars: topRepo.stargazers_count,
          url: topRepo.html_url,
        }
      : null,
  }
}

export default async function StatsPage() {
  let healthMetrics: MetricsMap = {}
  let githubStats: GitHubStats = {
    public_repos: 0,
    followers: 0,
    totalStars: 0,
    totalForks: 0,
    totalCommits: null,
    topRepo: null,
  }
  try {
    healthMetrics = await getHealthMetrics()
    githubStats = await getGitHubStats()
  } catch {
    return notFound()
  }

  const bday = new Date(1979, 10, 15)
  const now = new Date()

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-6">Age </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <Calendar className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            Years
          </h2>
          <p className="text-6xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {differenceInYears(now, bday)}
          </p>
        </div>

        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <Calendar className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            Months
          </h2>
          <p className="text-6xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {differenceInMonths(now, bday)}
          </p>
        </div>

        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <Calendar className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            Days
          </h2>
          <p className="text-6xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {differenceInDays(now, bday)}
          </p>
        </div>

        {/* Add more metrics here as needed */}
      </div>
      <h2 className="text-2xl font-bold mb-6 mt-9">Space </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <Orbit className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            Moon Orbits
          </h2>
          <p className="text-6xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {Math.round(differenceInDays(now, bday) / 27.3)}
          </p>
        </div>

        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <RulerDimensionLine className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            Moon Distance
          </h2>
          <p className="text-6xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {Math.round(differenceInYears(now, bday) * 3.8)}
          </p>
          <p className="text-xs text-gray-500 mt-2 text-right z-10">
            cm further away since 15/10/1979
          </p>
        </div>

        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <Eclipse className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            Solar Eclipses
          </h2>
          <p className="text-6xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            68
          </p>
        </div>

        {/* Add more metrics here as needed */}
      </div>
      <h2 className="text-2xl font-bold mb-6 mt-9">Health </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <Footprints className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            Steps
          </h2>
          <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {healthMetrics['step_count']?.[0]?.qty ?? '--'}
          </p>
          <p className="text-xs text-gray-500 mt-2 text-right z-10">
            {displayDate(healthMetrics['step_count']?.[0]?.date)}
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
                {healthMetrics['heart_rate']?.[0]?.Max ?? '--'}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                Min
              </span>
              <span className="text-3xl font-bold text-zinc-500 dark:text-zinc-200">
                {healthMetrics['heart_rate']?.[0]?.Min ?? '--'}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                Avg
              </span>
              <span className="text-3xl font-bold text-zinc-500 dark:text-zinc-200">
                {healthMetrics['heart_rate']?.[0]?.Avg ?? '--'}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-right z-10">
            {displayDate(healthMetrics['heart_rate']?.[0]?.date)}
          </p>
        </div>

        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <Heart className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            Resting Heart Rate
          </h2>
          <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {healthMetrics['resting_heart_rate']?.[0]?.qty ?? '--'}
          </p>
          <p className="text-xs text-gray-500 mt-2 text-right z-10">
            {displayDate(healthMetrics['resting_heart_rate']?.[0]?.date)}
          </p>
        </div>

        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <TrendingUp className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            Flights Climbed
          </h2>
          <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {healthMetrics['flights_climbed']?.[0]?.qty ?? '--'}
          </p>
          <p className="text-xs text-gray-500 mt-2 text-right z-10">
            {displayDate(healthMetrics['flights_climbed']?.[0]?.date)}
          </p>
        </div>

        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <Droplets className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            Blood Oxygen Saturation
          </h2>
          <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {healthMetrics['blood_oxygen_saturation']?.[0]?.qty ?? '--'}
          </p>
          <p className="text-xs text-gray-500 mt-2 text-right z-10">
            {displayDate(healthMetrics['blood_oxygen_saturation']?.[0]?.date)}
          </p>
        </div>

        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <Thermometer className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-12 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            Sleeping Wrist Temp
          </h2>
          <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {healthMetrics['apple_sleeping_wrist_temperature']?.[0]?.qty ??
              '--'}
          </p>
          <p className="text-xs text-gray-500 mt-2 text-right z-10">
            {displayDate(
              healthMetrics['apple_sleeping_wrist_temperature']?.[0]?.date,
            )}
          </p>
        </div>
        {/* Add more metrics here as needed */}
      </div>
      {/* GITHUB SECTION */}
      <h2 className="text-2xl font-bold mb-6 mt-9">GitHub</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-2">
        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <BookOpen className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-10 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize z-10 text-yellow-600">
            Public Repos
          </h2>
          <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {githubStats.public_repos}
          </p>
        </div>
        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <Star className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-10 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize z-10 text-yellow-600">
            Total Stars
          </h2>
          <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {githubStats.totalStars}
          </p>
        </div>
        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <Users className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-10 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize z-10 text-yellow-600">
            Followers
          </h2>
          <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {githubStats.followers}
          </p>
        </div>
        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <GitBranch className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-10 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize z-10 text-yellow-600">
            Total Forks
          </h2>
          <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {githubStats.totalForks}
          </p>
        </div>
        <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <GitCommitVertical className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-10 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize z-10 text-yellow-600">
            Total Commits
          </h2>
          <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {githubStats.totalCommits ?? '--'}
          </p>
        </div>
        {githubStats.topRepo && (
          <div className="relative rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
            <Star className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-10 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
            <h2 className="text-xl font-semibold mb-2 capitalize z-10 text-yellow-600">
              Top Repo
            </h2>
            <a
              href={githubStats.topRepo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold underline z-10"
            >
              {githubStats.topRepo.name}
            </a>
            <p className="text-xs text-gray-500 z-10">
              {githubStats.topRepo.stars} ⭐
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
