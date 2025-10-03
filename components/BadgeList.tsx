import { Badges } from './Badges'

interface BadgeListProps {
  title?: string
  badges: string
}

export function BadgeList({ title, badges }: BadgeListProps) {
  return (
    <dl className="mt-4">
      {title && (
        <dt className="text-zinc-700 dark:text-zinc-300 font-medium mb-2">
          {title}
        </dt>
      )}
      <dd className="flex flex-wrap gap-2">
        <Badges badges={badges} />
      </dd>
    </dl>
  )
}
