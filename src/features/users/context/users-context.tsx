import { createContext, useContext, useState } from 'react'
import { User } from '../types'

type OpenState = 'add' | 'edit' | 'delete' | null

interface UsersContextType {
  open: OpenState
  setOpen: (state: OpenState) => void
  currentRow: User | null
  setCurrentRow: (user: User | null) => void
}

const UsersContext = createContext<UsersContextType | undefined>(undefined)

export function useUsers() {
  const context = useContext(UsersContext)
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider')
  }
  return context
}

export default function UsersProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState<OpenState>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)

  return (
    <UsersContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
