import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { IconArrowUpRight, IconLoader2 } from '@tabler/icons-react'
import { SignedIn, useAuth, UserButton } from '@clerk/clerk-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { LearnMore } from '@/components/learn-more'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from '@/features/users/components/users-columns'
import { UsersDialogs } from '@/features/users/components/users-dialogs'
import { UsersPrimaryButtons } from '@/features/users/components/users-primary-buttons'
import { UsersTable } from '@/features/users/components/users-table'
import UsersProvider from '@/features/users/context/users-context'

export const Route = createFileRoute('/clerk/_authenticated/user-management')({
  component: UserManagement,
})

function UserManagement() {
  const [opened, setOpened] = useState(true)
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return (
      <div className='flex h-svh items-center justify-center'>
        <IconLoader2 className='size-8 animate-spin' />
      </div>
    )
  }

  if (!isSignedIn) {
    return <div>No autorizado</div>
  }

  return (
    <>
      <SignedIn>
        <UsersProvider>
          <Header fixed>
            <Search />
            <div className='ml-auto flex items-center space-x-4'>
              <ThemeSwitch />
              <UserButton />
            </div>
          </Header>

          <Main>
            <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
              <div>
                <h2 className='text-2xl font-bold tracking-tight'>
                  Lista de Usuarios
                </h2>
                <div className='flex gap-1'>
                  <p className='text-muted-foreground'>
                    Administra los usuarios y sus roles aquí.
                  </p>
                  <LearnMore
                    open={opened}
                    onOpenChange={setOpened}
                    contentProps={{ side: 'right' }}
                  >
                    <p>
                      Esta es la misma vista que{' '}
                      <Link
                        to='/users'
                        search={{ redirect: null }}
                        className='text-blue-500 underline decoration-dashed underline-offset-2'
                      >
                        '/users'
                      </Link>
                    </p>

                    <p className='mt-4'>
                      Puedes cerrar sesión o gestionar/eliminar tu cuenta a
                      través del menú de Perfil de Usuario en la esquina
                      superior derecha de la página.
                      <IconArrowUpRight className='inline-block size-4' />
                    </p>
                  </LearnMore>
                </div>
              </div>
              <UsersPrimaryButtons />
            </div>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
              <UsersTable columns={columns} />
            </div>
          </Main>

          <UsersDialogs />
        </UsersProvider>
      </SignedIn>
    </>
  )
}
