import {
  IconLayoutDashboard,
  IconUsers,
} from '@tabler/icons-react'

export interface SidebarData {
  user: {
    name: string
    email: string
    image: string
  }
  teams: {
    label: string
    value: string
  }[]
  navGroups: {
    title: string
    items: {
      title: string
      url?: string
      icon?: any
      badge?: string
      items?: {
        title: string
        url: string
        icon?: any
        badge?: string
      }[]
    }[]
  }[]
}

export const sidebarData: SidebarData = {
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    image: 'https://github.com/shadcn.png',
  },
  teams: [
    {
      label: 'Personal Account',
      value: 'personal',
    },
    {
      label: 'Acme Inc.',
      value: 'acme-inc',
    },
    {
      label: 'Monsters Inc.',
      value: 'monsters',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Usuarios',
          url: '/users',
          icon: IconUsers,
        },
      ],
    },
  ],
}
