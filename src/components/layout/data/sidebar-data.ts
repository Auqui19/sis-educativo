import {
  IconLayoutDashboard,
  IconUsers,
} from '@tabler/icons-react'
import { type NavGroup } from '../types'

export interface SidebarData {
  user: {
    name: string
    email: string
    avatar: string
  }
  teams: {
    label: string
    value: string
  }[]
  navGroups: NavGroup[]
}

export const sidebarData: SidebarData = {
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://github.com/shadcn.png',
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
