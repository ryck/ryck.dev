import { ArrowBigDownDash } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import { BadgeList } from '@/components/BadgeList'
import { Badges } from '@/components/Badges'

const url = process.env.WEBSITE_URL ?? 'https://ryck.dev'
const ogTitle = 'Ricardo Gonzalez'
const ogDescription = 'Senior Software Engineer / Manager'
const ogPublishedTime = 'Resume'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Ricardo Gonzalez - Senior Software Engineer / Manager - CV',
  openGraph: {
    title: 'Resume',
    url: 'https://ryck.dev/resume',
    images: [
      {
        url: `${url}/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}&publishedTime=${encodeURIComponent(ogPublishedTime)}`,
      },
    ],
  },
  twitter: {
    title: 'Resume',
    images: [
      {
        url: `${url}/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}&publishedTime=${encodeURIComponent(ogPublishedTime)}`,
        alt: 'Resume',
      },
    ],
  },
}

export default async function ResumePage() {
  return (
    <main className="space-y-12 py-6 h-resume">
      {/* About Section with h-card */}
      <section className="h-card">
        <h2 className="mb-4 text-2xl font-bold text-yellow-600">About</h2>
        <div className="hidden">
          <span className="p-name">Ricardo Gonzalez</span>
          <span className="p-job-title">
            Senior Software Engineer / Manager
          </span>
          <a className="u-url" href="https://ryck.dev">
            https://ryck.dev
          </a>
          <a className="u-email" href="mailto:contact@ryck.dev">
            contact@ryck.dev
          </a>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 p-summary">
          I am a Senior Software Engineer with a strong focus on Front-End
          development, specializing in React and CSS. I&apos;m passionate about
          crafting responsive, user-friendly interfaces with smooth animations
          and clean design. Beyond the front end, I bring a solid foundation in
          React Native,PHP, NodeJs and full-stack development.
        </p>
        <p className="text-zinc-600 dark:text-zinc-400 p-summary mt-4">
          I also have experience as a Team Lead and Engineer Manager, having led
          teams to deliver high-quality software solutions.
        </p>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Over the years, I&apos;ve worked on high-traffic websites and complex
          platforms, gaining extensive experience with technologies like
          Next.js, Drupal, and WordPress. My background also includes leadership
          roles—serving as a lead developer, managing releases, and
          participating in hiring processes. I thrive in dynamic environments
          where performance, scalability, and user experience matter.
        </p>
      </section>

      <Link
        href="https://docs.google.com/document/d/1ssO3Fj086DYUb9aeWsSLcszMXl52eAW9SRL3lvBdk0c/export?format=pdf&tab=t.0"
        className="bg-grey-light hover:bg-grey text-grey-darkest group inline-flex items-center rounded font-bold transition"
      >
        <ArrowBigDownDash className="mr-2 h-6 w-6 text-yellow-600 transition-all duration-300 ease-in-out group-hover:animate-bounce group-hover:scale-110 group-hover:translate-y-1 dark:text-yellow-600" />
        <span>Download PDF</span>
      </Link>

      {/* Skills Section */}
      <section className="p-skill">
        <h2 className="mb-4 text-2xl font-bold text-yellow-600">Skills</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-skill">
            <h3 className="mb-2 text-lg font-medium p-skill-name">HTML</h3>
            <aside className="text-zinc-600 dark:text-zinc-400 p-skill-description flex flex-wrap gap-2">
              <Badges badges="HTML5, Semantic, Accessibility (ARIA / WACG), RWD, PWD" />
            </aside>
          </div>
          <div className="h-skill">
            <h3 className="mb-2 text-lg font-medium p-skill-name">CSS</h3>
            <aside className="text-zinc-600 dark:text-zinc-400 p-skill-description flex flex-wrap gap-2">
              <Badges badges="CSS3, SASS, LESS, SCSS, BEM, OOCSS, SMACSS, Flexbox, CSS Grid, PostCSS, TailwindCSS, CSS Animations" />
            </aside>
          </div>
          <div className="h-skill">
            <h3 className="mb-2 text-lg font-medium p-skill-name">
              JavaScript
            </h3>
            <aside className="text-zinc-600 dark:text-zinc-400 p-skill-description flex flex-wrap gap-2">
              <Badges badges="ES6+/7, TypeScript, Unit Testing, Jest, E2E Testing, Cypress" />
            </aside>
          </div>
          <div className="h-skill">
            <h3 className="mb-2 text-lg font-medium p-skill-name">
              React Ecosystem
            </h3>
            <aside className="text-zinc-600 dark:text-zinc-400 p-skill-description flex flex-wrap gap-2">
              <Badges badges="React Native, Redux, Redux Toolkit, NextJS, React Router, Reach Router, Emotion, Styled Components, React Testing Library, Framer Motion, Storybook, Zustand, Tanstack Query" />
            </aside>
          </div>
          <div className="h-skill">
            <h3 className="mb-2 text-lg font-medium p-skill-name">Back-End</h3>
            <aside className="text-zinc-600 dark:text-zinc-400 p-skill-description flex flex-wrap gap-2">
              <Badges badges="PHP, NodeJS, Express, Docker, MySQL, GraphQL, Jenkins, Linux, GitHub Actions, REST APIs, OAuth2 / OIDC" />
            </aside>
          </div>
          <div className="h-skill">
            <h3 className="mb-2 text-lg font-medium p-skill-name">
              DevOps and Tools
            </h3>
            <aside className="text-zinc-600 dark:text-zinc-400 p-skill-description flex flex-wrap gap-2">
              <Badges badges="Git, GitFlow, Jenkins, Heroku, AWS, Netlify, Vercel, Webpack, ESLint, Biome, Husky, Prettier, Sketch, Figma, NPM, YARN, PNPM, Bun, Gulp" />
            </aside>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="p-experience">
        <h2 className="mb-4 text-2xl font-bold text-yellow-600">Experience</h2>
        {/* Timeline replaces previous div wrapper */}
        <ol className="relative ml-2 border-l border-zinc-300 transition dark:border-zinc-700">
          {/* Engineering Manager at 10x Banking */}
          <li className="group mb-12 ml-6 h-event">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-slate-200 dark:bg-zinc-800 dark:ring-zinc-900">
              <span className="block h-3 w-3 rounded-full bg-slate-900 group-hover:animate-pulse group-hover:bg-yellow-600 dark:bg-slate-200"></span>
            </span>
            <div className="mb-2 flex flex-col gap-x-2 gap-y-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium">
                <span className="p-job-title">
                  Senior Software Developer → Lead Developer → Engineering
                  Manager
                </span>{' '}
                at{' '}
                <a
                  href="https://10xbanking.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400 h-card"
                >
                  <span className="p-name">10x Banking</span>
                  <span className="u-url hidden">https://10xbanking.com</span>
                </a>
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                <time className="dt-start" dateTime="2019-07">
                  July 2019
                </time>{' '}
                —{' '}
                <time className="dt-end" dateTime="2025-07">
                  July 2025
                </time>
              </span>
            </div>
            <div className="space-y-4 p-description">
              <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Started and grew a new project from a greenfield project into
                  a mission-critical product part of the basic 10x platform
                  proposal.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Progressed from Senior Developer → Lead Developer →
                  Engineering Manager, ultimately leading architecture,
                  delivery, and multi-squad team growth.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Modernized the frontend stack through several large-scale
                  migrations (build tools, state management, UI libraries,
                  forms) to ensure scalability and maintainability.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Defined and maintained REST and GraphQL API contracts,
                  enabling reliable integrations across banking services.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Implemented CI/CD with Jenkins, served as Release Manager, and
                  introduced enterprise-grade features such as SSO, i18n, and
                  WCAG 2.1 accessibility compliance.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delivered high-performance data handling for very large
                  datasets (like insights or transactions), ensuring speed and
                  responsiveness at scale.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Fostered a quality-driven culture, achieving full unit test
                  coverage and modernizing end-to-end testing with Cypress.
                </li>
              </ul>
              <BadgeList badges="React, Redux/RTK, React Hook Form, Material UI, Vite, Cypress, Vitest, Jenkins, REST, GraphQL, SSO" />
            </div>
          </li>

          {/* Senior Software Engineer at 10x Banking */}
          <li className="group mb-12 ml-6 h-event">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-slate-200 dark:bg-zinc-800 dark:ring-zinc-900">
              <span className="block h-3 w-3 rounded-full bg-slate-900 group-hover:animate-pulse group-hover:bg-yellow-600 dark:bg-slate-200"></span>
            </span>
            <div className="mb-2 flex flex-col gap-x-2 gap-y-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium">
                <span className="p-job-title">Senior Software Engineer</span> at{' '}
                <a
                  href="https://10xbanking.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400 h-card"
                >
                  <span className="p-name">10x Banking</span>
                  <span className="u-url hidden">https://10xbanking.com</span>
                </a>
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                <time className="dt-start" dateTime="2018-07">
                  July 2018
                </time>{' '}
                —{' '}
                <time className="dt-end" dateTime="2019-06">
                  June 2019
                </time>
              </span>
            </div>
            <div className="space-y-4 p-description">
              <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Developed a high-performance banking mobile app in React
                  Native using TypeScript, Redux, and React Navigation.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Implemented core 10x platform features: onboarding, KYX,
                  crypto transactions, and OTP authentication, reducing
                  onboarding friction.
                </li>
              </ul>
              <BadgeList badges="React Native, TypeScript, Redux, React Navigation, Axios, Onfido, KYX, iOS, Android" />
            </div>
          </li>

          {/* Senior Drupal Developer / Lead Developer at Bookatable By Michelin */}
          <li className="group mb-12 ml-6 h-event">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-slate-200 dark:bg-zinc-800 dark:ring-zinc-900">
              <span className="block h-3 w-3 rounded-full bg-slate-900 group-hover:animate-pulse group-hover:bg-yellow-600 dark:bg-slate-200"></span>
            </span>
            <div className="mb-2 flex flex-col gap-x-2 gap-y-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium">
                <span className="p-job-title">
                  Senior Drupal Developer → Lead Developer
                </span>{' '}
                at{' '}
                <a
                  href="https://www.michelin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400 h-card"
                >
                  <span className="p-name">Bookatable By Michelin</span>
                  <span className="u-url hidden">
                    https://www.michelin.com/
                  </span>
                </a>
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                <time className="dt-start" dateTime="2016-11">
                  November 2016
                </time>{' '}
                —{' '}
                <time className="dt-end" dateTime="2019-05">
                  May 2018
                </time>
              </span>
            </div>
            <div className="space-y-4 p-description">
              <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Maintained and enhanced Michelin&apos;s restaurant sites built
                  in Drupal 7, including restaurants.michelin.fr,
                  bookatable.com/de, guia.michelin.es, guida.michelin.it.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Handled data ingestion and migration in support of printed
                  guide releases.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Promoted to Lead Developer, forming a new team to build
                  consumer-facing websites in Drupal 8, backed by a Node.js
                  service layer communicating via AWS SNS.
                </li>
              </ul>
              <BadgeList badges="Drupal 7, Drupal 8, PHP, Node.js, AWS SNS, MySQL, Data Migration" />
            </div>
          </li>

          {/* Senior Drupal Themer at PwC */}
          <li className="group mb-12 ml-6 h-event">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-slate-200 dark:bg-zinc-800 dark:ring-zinc-900">
              <span className="block h-3 w-3 rounded-full bg-slate-900 group-hover:animate-pulse group-hover:bg-yellow-600 dark:bg-slate-200"></span>
            </span>
            <div className="mb-2 flex flex-col gap-x-2 gap-y-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium">
                <span className="p-job-title">Senior Drupal Themer</span> at{' '}
                <a
                  href="https://www.pwc.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400 h-card"
                >
                  <span className="p-name">PwC</span>
                  <span className="u-url hidden">https://www.pwc.co.uk/</span>
                </a>
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                <time className="dt-start" dateTime="2016-08">
                  August 2016
                </time>{' '}
                —{' '}
                <time className="dt-end" dateTime="2016-10">
                  October 2016
                </time>
              </span>
            </div>
            <div className="space-y-4 p-description">
              <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Implemented responsive, accessible front-end designs for a
                  council management portal for the UK Government using SCSS,
                  JavaScript, Drupal Behaviors, and Gulp.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Contributed to custom Drupal module development and provided
                  backend support, ensuring smooth integration and performance
                  across the platform.
                </li>
              </ul>
              <BadgeList badges="Drupal 7, PHP, SCSS, JavaScript, Gulp, Responsive Design, Accessibility" />
            </div>
          </li>

          {/* Senior Drupal Engineer at BBC Worldwide */}
          <li className="group mb-12 ml-6 h-event">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-slate-200 dark:bg-zinc-800 dark:ring-zinc-900">
              <span className="block h-3 w-3 rounded-full bg-slate-900 group-hover:animate-pulse group-hover:bg-yellow-600 dark:bg-slate-200"></span>
            </span>
            <div className="mb-2 flex flex-col gap-x-2 gap-y-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium">
                <span className="p-job-title">Senior Drupal Engineer</span> at{' '}
                <a
                  href="http://www.bbcworldwide.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400 h-card"
                >
                  <span className="p-name">BBC Worldwide</span>
                  <span className="u-url hidden">
                    http://www.bbcworldwide.com/
                  </span>
                </a>
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                <time className="dt-start" dateTime="2012-11">
                  November 2012
                </time>{' '}
                —{' '}
                <time className="dt-end" dateTime="2016-07">
                  July 2016
                </time>
              </span>
            </div>
            <div className="space-y-4 p-description">
              <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Led theming for BBC Good Food, collaborating with design teams
                  to create responsive, accessible front-end code and
                  implementing custom modules, user roles, content workflows,
                  and newsletter integration.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Optimized performance for high-traffic sites using Akamai and
                  Varnish caching solutions to handle scale effectively.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Served as primary liaison between design agencies and
                  development teams for BBC Store, ensuring accurate
                  implementation of design specifications.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Integrated third-party services including APIGEE (API gateway)
                  and Vindicia (payment and subscription services) for BBC
                  Store.
                </li>
              </ul>
              <BadgeList badges="Drupal 7, PHP, CSS, JavaScript, Akamai, Varnish, APIGEE, Vindicia, Newsletter Integration" />
            </div>
          </li>

          {/* Drupal Themer at NBC Universal */}
          <li className="group mb-12 ml-6 h-event">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-slate-200 dark:bg-zinc-800 dark:ring-zinc-900">
              <span className="block h-3 w-3 rounded-full bg-slate-900 group-hover:animate-pulse group-hover:bg-yellow-600 dark:bg-slate-200"></span>
            </span>
            <div className="mb-2 flex flex-col gap-x-2 gap-y-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium">
                <span className="p-job-title">Drupal Themer</span> at{' '}
                <a
                  href="http://www.nbcuniversal.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400 h-card"
                >
                  <span className="p-name">NBC Universal</span>
                  <span className="u-url hidden">
                    http://www.nbcuniversal.com/
                  </span>
                </a>
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                <time className="dt-start" dateTime="2012-02">
                  February 2012
                </time>{' '}
                —{' '}
                <time className="dt-end" dateTime="2012-11">
                  November 2012
                </time>
              </span>
            </div>
            <div className="space-y-4 p-description">
              <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Oversaw theming strategy for a large-scale, multilingual
                  platform spanning 18+ websites in 10+ languages.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Led feature development, collaborated with design agencies
                  (ClearLeft, DesignBuzz), and participated in UX reviews.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ensured consistency, scalability, and accessibility as part of
                  a major platform overhaul.
                </li>
              </ul>
              <BadgeList badges="Drupal 6, PHP, CSS, JavaScript, Multilingual, i18n, UX Design, Scalability" />
            </div>
          </li>
          {/* Senior Web Developer at theOTHERmedia */}
          <li className="group mb-12 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-slate-200 dark:bg-zinc-800 dark:ring-zinc-900">
              <span className="block h-3 w-3 rounded-full bg-slate-900 group-hover:animate-pulse group-hover:bg-yellow-600 dark:bg-slate-200"></span>
            </span>
            <div className="mb-2 flex flex-col gap-x-2 gap-y-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium">
                Front End Developer at{' '}
                <a
                  href="http://www.othermedia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400"
                >
                  theOTHERmedia
                </a>
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                September 2011 — February 2012
              </span>
            </div>
            <div className="space-y-4">
              <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Maintained and extended both new and legacy front-end
                  codebases, ensuring design consistency and performance across
                  browsers and devices.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Developed interactive prototypes and implemented new features
                  based on evolving UI/UX requirements.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Created mockups and layout designs, collaborating with
                  designers and stakeholders to translate ideas into
                  production-ready code.
                </li>
              </ul>
              <BadgeList badges="HTML, CSS, JavaScript, Cross-browser Compatibility, UI/UX Design, Prototyping" />
            </div>
          </li>

          {/* Senior Web Developer at defaqto */}
          <li className="group mb-12 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-slate-200 dark:bg-zinc-800 dark:ring-zinc-900">
              <span className="block h-3 w-3 rounded-full bg-slate-900 group-hover:animate-pulse group-hover:bg-yellow-600 dark:bg-slate-200"></span>
            </span>
            <div className="mb-2 flex flex-col gap-x-2 gap-y-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium">
                Front End Developer at{' '}
                <a
                  href="http://www.defaqto.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400"
                >
                  defaqto
                </a>
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                October 2010 — September 2011
              </span>
            </div>
            <div className="space-y-4">
              <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Developed and maintained the public-facing Defaqto website,
                  ensuring performance, responsiveness, and accessibility.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Created and customized Drupal modules to implement new
                  functionality tailored to business needs.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Designed and prototyped new layouts and UI components,
                  collaborating with stakeholders to align with brand and user
                  experience goals.
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 me-2 text-yellow-600 dark:text-yellow-500 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Supported the entire deployment lifecycle, including
                  development, testing, and production rollout.
                </li>
              </ul>
              <BadgeList badges="Drupal 5, PHP, HTML, CSS, JavaScript, Responsive Design, Performance Optimization" />
            </div>
          </li>
        </ol>
      </section>
    </main>
  )
}
