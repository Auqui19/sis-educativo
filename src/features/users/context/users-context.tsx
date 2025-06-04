import React, { useState } from 'react'
import { User } from '../components/users-columns'

export type UsersDialogType = 'add' | 'edit' | 'delete' | 'invite' | null

interface UsersContextType {
  open: UsersDialogType
  setOpen: (type: UsersDialogType) => void
  currentRow: User | null
  setCurrentRow: (user: User | null) => void
}

interface Props {
  children: React.ReactNode
}

const UsersContext = React.createContext<UsersContextType | null>(null)

export default function UsersProvider({ children }: Props) {
  const [open, setOpen] = useState<UsersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)

  return (
    <UsersContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUsers = () => {
  const context = React.useContext(UsersContext)
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider')
  }
  return context
}
