type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
  icon: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/ryck',
    icon: '💻',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/ryck',
    icon: '🐦',
  },
  {
    label: 'Bluesky',
    link: 'https://bsky.app/profile/ryck.me',
    icon: '🦋',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/ryck',
    icon: '📸',
  },
]

export const EMAIL = 'info@ryck.me'
