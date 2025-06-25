import { ArrowBigDownDash } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Software Engineer specializing in Front-End development with React and CSS',
}

export default function ResumePage() {
  return (
    <main className="space-y-12 py-6">
      <a
        href="https://docs.google.com/document/d/1ssO3Fj086DYUb9aeWsSLcszMXl52eAW9SRL3lvBdk0c/export?format=pdf&tab=t.0"
        className="bg-grey-light hover:bg-grey text-grey-darkest group inline-flex items-center rounded font-bold transition"
      >
        <ArrowBigDownDash className="mr-2 h-6 w-6 text-yellow-600 group-hover:animate-bounce dark:text-yellow-600" />
        <span>Download PDF</span>
      </a>
      {/* About Section */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-yellow-600">About</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          I am a Software Engineer with a strong focus on Front-End development,
          specializing in React and CSS. I&apos;m passionate about crafting
          responsive, user-friendly interfaces with smooth animations and clean
          design. Beyond the front end, I bring a solid foundation in PHP,
          NodeJs and full-stack development.
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

      {/* Skills Section */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-yellow-600">Skills</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-2 text-lg font-medium">HTML</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              HTML5, Semantic, Accessibility, ARIA, Responsive Web Design
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">CSS</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              CSS3, Sass, Less, BEM, OOCSS, SMACSS, Flexbox, CSS Grid, PostCSS,
              TailwindCSS
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">JavaScript</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              ES6, TypeScript, GraphQL, Unit Testing, Jest, E2E Testing, Cypress
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">React</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Redux, Redux Toolkit, NextJS, React Router, Reach Router, Emotion,
              Styled Components, React Testing Library, Framer Motion, Storybook
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">Backend</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              PHP, NodeJS, Express, Docker, Jenkins, Linux, GitHub Actions
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">Tools</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              GIT, gitflow, Jenkins, Heroku, AWS, Netlify, Vercel, Webpack,
              ESLint, Prettier, Sketch, Figma, Adobe Photoshop, Google Analytics
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-yellow-600">Experience</h2>
        {/* Timeline replaces previous div wrapper */}
        <ol className="relative ml-2 border-l border-zinc-300 transition dark:border-zinc-700">
          {/* Engineering Manager at 10x Banking */}
          <li className="group mb-12 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-slate-200 dark:bg-zinc-800 dark:ring-zinc-900">
              <span className="block h-3 w-3 rounded-full bg-slate-900 group-hover:animate-pulse group-hover:bg-yellow-600 dark:bg-slate-200"></span>
            </span>
            <div className="mb-2 flex flex-col gap-x-2 gap-y-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium">
                Engineering Manager at{' '}
                <a
                  href="https://10xbanking.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400"
                >
                  10x Banking
                </a>
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                July 2019 — July 2025
              </span>
            </div>
            <div className="space-y-4">
              <p className="text-zinc-600 dark:text-zinc-400">
                As Engineering Manager, I was responsible for initiating the
                Bank Manager / Console UI project from the ground up—both
                technically and organizationally. This included defining the
                architecture, writing the initial codebase, and assembling the
                development team through hiring, planning, and day-to-day
                management, as well as being responsible for the delivery of the
                project.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Bank Manager / Console UI is a single-page application (SPA)
                built using React, Redux, React Hook Form, and Material UI,
                among other technologies. It provides a powerful and intuitive
                interface to manage the full capabilities of the 10x platform.
                Users can create and manage financial products, configure
                governance settings, and handle key reference data such as index
                rates and VAT rates—all from a streamlined UI.
              </p>
            </div>
          </li>

          {/* Senior Software Engineer at 10x Banking */}
          <li className="group mb-12 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-slate-200 dark:bg-zinc-800 dark:ring-zinc-900">
              <span className="block h-3 w-3 rounded-full bg-slate-900 group-hover:animate-pulse group-hover:bg-yellow-600 dark:bg-slate-200"></span>
            </span>
            <div className="mb-2 flex flex-col gap-x-2 gap-y-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium">
                Senior Software Engineer at{' '}
                <a
                  href="https://10xbanking.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400"
                >
                  10x Banking
                </a>
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                July 2018 — June 2019
              </span>
            </div>
            <div className="space-y-4">
              <p className="text-zinc-600 dark:text-zinc-400">
                Worked as part of an Agile team developing the mobile
                application using React Native, along with TypeScript, React
                Navigation, Redux, Axios among others. The app served as a
                comprehensive showcase of the 10x Platform&apos;s capabilities,
                including onboarding, KYX, cryptocurrency features, OTPs, and
                more.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                One of my key responsibilities was leading the implementation of
                the onboarding flow, which included integrating KYX verification
                using Onfido, managing complex user states, and ensuring a
                seamless and secure experience across iOS and Android devices.
              </p>
            </div>
          </li>

          {/* Senior Drupal Developer / Lead Developer at Bookatable By Michelin */}
          <li className="group mb-12 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-slate-200 dark:bg-zinc-800 dark:ring-zinc-900">
              <span className="block h-3 w-3 rounded-full bg-slate-900 group-hover:animate-pulse group-hover:bg-yellow-600 dark:bg-slate-200"></span>
            </span>
            <div className="mb-2 flex flex-col gap-x-2 gap-y-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium">
                Senior Drupal Developer / Lead Developer at{' '}
                <a
                  href="https://www.michelin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Bookatable By Michelin
                </a>
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                November 2016 — May 2019
              </span>
            </div>
            <div className="space-y-4">
              <p className="text-zinc-600 dark:text-zinc-400">
                I initially joined as a Drupal Developer, supporting several
                Michelin restaurant websites built on Drupal 7, including
                restaurants.michelin.fr, bookatable.com/de, guia.michelin.es,
                and guida.michelin.it. My responsibilities included maintaining
                and enhancing these sites, as well as supporting the release of
                new paper guides through data ingestion and migration processes.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Later, I was promoted to Lead Developer, where I established a
                new team and led the development of all Bookatable consumer
                websites. These were rebuilt using Drupal 8 and integrated with
                a Node.js service layer via AWS SNS for efficient communication
                and event handling.
              </p>
            </div>
          </li>

          {/* Senior Drupal Themer at PwC */}
          <li className="group mb-12 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-slate-200 dark:bg-zinc-800 dark:ring-zinc-900">
              <span className="block h-3 w-3 rounded-full bg-slate-900 group-hover:animate-pulse group-hover:bg-yellow-600 dark:bg-slate-200"></span>
            </span>
            <div className="mb-2 flex flex-col gap-x-2 gap-y-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium">
                Senior Drupal Themer at{' '}
                <a
                  href="https://www.pwc.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400"
                >
                  PwC
                </a>
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                August 2016 — October 2016
              </span>
            </div>
            <div className="space-y-4">
              <p className="text-zinc-600 dark:text-zinc-400">
                As a Themer, I was responsible for implementing responsive,
                accessible front-end designs for a council management portal for
                the UK Government. This involved working with SCSS, JavaScript,
                Drupal Behaviors, and Gulp to bring designs to life across
                devices.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                In addition to theming, I also contributed to the development of
                custom Drupal modules and provided backend support, ensuring
                smooth integration and performance across the platform.
              </p>
            </div>
          </li>

          {/* Senior Drupal Engineer at BBC Worldwide */}
          <li className="group mb-12 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-slate-200 dark:bg-zinc-800 dark:ring-zinc-900">
              <span className="block h-3 w-3 rounded-full bg-slate-900 group-hover:animate-pulse group-hover:bg-yellow-600 dark:bg-slate-200"></span>
            </span>
            <div className="mb-2 flex flex-col gap-x-2 gap-y-2 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-medium">
                Senior Drupal Engineer at{' '}
                <a
                  href="http://www.bbcworldwide.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400"
                >
                  BBC Worldwide
                </a>
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                November 2012 — July 2016
              </span>
            </div>
            <div className="space-y-4">
              <p className="text-zinc-600 dark:text-zinc-400">
                During my time at BBC Worldwide, I worked on two key projects:
                BBC Good Food and BBC Store.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                At BBC Good Food, I was the Lead Themer, collaborating closely
                with the design team to translate their concepts into
                responsive, accessible front-end code. I used standard
                technologies (CSS, JavaScript, templating) along with Drupal
                development—covering areas such as custom modules, user roles,
                content workflows, and newsletter integration. Given the
                site&apos;s high traffic, I also worked with Akamai and Varnish
                to optimize performance and caching.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                For BBC Store, I contributed as a Themer, handling similar
                front-end and Drupal responsibilities. In addition, I served as
                the primary liaison between the design agency and the Drupal
                development team, ensuring consistent communication, technical
                alignment, and accurate implementation of design specifications.
                This role also involved extensive third-party integrations,
                including APIGEE (API gateway) and Vindicia (payment and
                subscription services).
              </p>
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
              <p className="text-zinc-600 dark:text-zinc-400">
                Maintained and extended both new and legacy front-end codebases,
                ensuring design consistency and performance across browsers and
                devices.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Developed interactive prototypes and implemented new features
                based on evolving UI/UX requirements.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Created mockups and layout designs, collaborating with designers
                and stakeholders to translate ideas into production-ready code.
              </p>
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
                October 2010 — September 2011
              </span>
            </div>
            <div className="space-y-4">
              <p className="text-zinc-600 dark:text-zinc-400">
                Developed and maintained the public-facing Defaqto website,
                ensuring performance, responsiveness, and accessibility.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Created and customized Drupal modules to implement new
                functionality tailored to business needs.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Designed and prototyped new layouts and UI components,
                collaborating with stakeholders to align with brand and user
                experience goals.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Supported the entire deployment lifecycle, including
                development, testing, and production rollout.
              </p>
            </div>
          </li>
        </ol>
      </section>
    </main>
  )
}
