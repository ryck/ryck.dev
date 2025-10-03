interface BadgesProps {
  badges: string
}

export function Badges({ badges }: BadgesProps) {
  const badgeArray = badges
    .split(',')
    .map((badge) => badge.trim())
    .filter(Boolean)

  return (
    <>
      {badgeArray.map((badge) => (
        <span
          key={badge}
          className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 ring-1 ring-inset ring-zinc-600/20 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-400/20 dark:hover:bg-zinc-700"
        >
          {badge}
        </span>
      ))}
    </>
  )
}
