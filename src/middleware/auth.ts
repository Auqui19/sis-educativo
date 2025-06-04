import { redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'

export function requireAuth() {
    const auth = useAuthStore.getState().auth
    const isAuthenticated = !!auth.accessToken

    if (!isAuthenticated) {
        throw redirect({
            to: '/sign-in',
            search: {
                redirect: window.location.pathname,
            },
        })
    }
} 