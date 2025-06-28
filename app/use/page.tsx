import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Uses',
  description: 'A list of the software and hardware I use for work and play.',
}

export default function UsesPage() {
  return (
    <main className="prose prose-zinc dark:prose-invert mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold text-yellow-600">/uses</h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        Here’s a list of the hardware and software I use for development,
        productivity, and fun. I update this page regularly!
      </p>

      <h2 className="mt-8 text-2xl font-semibold text-yellow-600">Hardware</h2>
      <ul>
        <li>
          💻 <strong>MacBook Pro 14” (M1 Pro, 2021)</strong> — My trusty
          workhorse, never lets me down.
        </li>
        <li>🖥️ Apple Studio Display — Crisp pixels for days.</li>
        <li>
          ⌨️ Keychron K2 (Hot-swappable, Gateron Brown) — Clicky, thocky, and
          oh-so-satisfying.
        </li>
        <li>🖱️ Logitech MX Master 3S — The king of productivity mice.</li>
        <li>📱 iPhone 15 Pro — For doomscrolling and the occasional call.</li>
        <li>
          📲 iPad Pro 11” (2021) — My digital sketchbook and Netflix buddy.
        </li>
        <li>🎧 AirPods Pro 2 — For deep focus and dance breaks.</li>
        <li>
          🎙️ Elgato Wave:3 Microphone — For meetings and the rare podcast cameo.
        </li>
        <li>💺 Herman Miller Aeron Chair — My back says thank you.</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold text-yellow-600">
        Development Software
      </h2>
      <ul>
        <li>
          📝 <strong>VS Code</strong> — My digital playground (with Prettier,
          ESLint, Tailwind CSS, GitLens, Copilot, and more magic sprinkles).
        </li>
        <li>
          🖥️ iTerm2 + zsh + oh-my-zsh — Terminal, but make it pretty and
          powerful.
        </li>
        <li>
          🚀 Warp Terminal — For when I want my terminal to feel like the
          future.
        </li>
        <li>
          ✨ Raycast — Spotlight on steroids. I launch everything with it.
        </li>
        <li>🗄️ TablePlus — Databases, but make it friendly.</li>
        <li>📬 Postman — API wrangling made easy.</li>
        <li>🐳 Docker Desktop — Containers everywhere, chaos nowhere.</li>
        <li>🎨 Figma — Where UI dreams come true.</li>
        <li>🗒️ Notion — My second brain (and sometimes my first).</li>
        <li>🔐 1Password — Because I can’t remember anything.</li>
        <li>
          📸 CleanShot X — Screenshots, GIFs, and more, all pixel-perfect.
        </li>
        <li>🪟 Rectangle — Window management for the win.</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold text-yellow-600">
        Web & Productivity
      </h2>
      <ul>
        <li>🌐 Arc Browser — The browser that sparks joy.</li>
        <li>🧭 Safari — For when I want to feel like a true Mac user.</li>
        <li>🎵 Spotify — Coding fuel and dance party starter.</li>
        <li>💬 Slack — Where all my notifications live (and memes, too).</li>
        <li>📅 Fantastical — Calendar, but actually fantastic.</li>
        <li>✅ Things 3 — To-do lists that actually get done (sometimes).</li>
        <li>📝 Apple Notes — Quick thoughts, doodles, and shopping lists.</li>
        <li>✉️ Apple Mail — Old school, but it works.</li>
      </ul>
    </main>
  )
}
