import { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useAuthStore } from '@/stores/authStore'
import { Toaster } from '@/components/ui/sonner'
import { NavigationProgress } from '@/components/navigation-progress'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  beforeLoad: () => {
    const auth = useAuthStore.getState().auth
    const isAuthenticated = !!auth.accessToken
    const isAuthRoute =
      window.location.pathname.startsWith('/(auth)') ||
      window.location.pathname === '/sign-in' ||
      window.location.pathname === '/sign-up' ||
      window.location.pathname === '/forgot-password'

    if (!isAuthenticated && !isAuthRoute && window.location.pathname !== '/') {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: window.location.pathname,
        },
      })
    }

    if (!isAuthenticated && window.location.pathname === '/') {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: '/',
        },
      })
    }
  },
  component: () => {
    return (
      <>
        <NavigationProgress />
        <Outlet />
        <Toaster duration={50000} />
        {import.meta.env.MODE === 'development' && (
          <>
            <ReactQueryDevtools buttonPosition='bottom-left' />
            <TanStackRouterDevtools position='bottom-right' />
          </>
        )}
      </>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
