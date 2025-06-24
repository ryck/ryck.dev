import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Rick González',
  description:
    'A selection of personal and professional projects by Rick González',
}

export default function ProjectsPage() {
  return (
    <main className="space-y-12 py-6">
      <section>
        <h1 className="mb-4 text-3xl font-bold text-yellow-600">Projects</h1>
        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          Here you can find a selection of my personal and professional
          projects. I enjoy working on web applications, open source, and
          creative experiments. More coming soon!
        </p>
        {/* Add your project cards or list here */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Example project card */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-2 text-xl font-semibold">Project Name</h2>
            <p className="mb-2 text-zinc-600 dark:text-zinc-400">
              Short project description goes here. You can add more details,
              links, or images as needed.
            </p>
            <a href="#" className="text-blue-600 underline dark:text-blue-400">
              View project
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
