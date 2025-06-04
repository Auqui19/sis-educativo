import { create } from 'zustand'
import Cookies from 'js-cookie'

const ACCESS_TOKEN = 'access_token'
const USER_DATA = 'user_data'

interface User {
  id: number
  documento_identidad: string
  rol_id: number
}

interface AuthState {
  auth: {
    user: User | null
    setUser: (user: User) => void
    accessToken: string
    setAccessToken: (token: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const cookieToken = Cookies.get(ACCESS_TOKEN)
  const cookieUser = Cookies.get(USER_DATA)

  const initToken = cookieToken ? JSON.parse(cookieToken) : ''
  const initUser = cookieUser ? JSON.parse(cookieUser) : null

  return {
    auth: {
      user: initUser,
      setUser: (user) => {
        Cookies.set(USER_DATA, JSON.stringify(user))
        set((state) => ({ ...state, auth: { ...state.auth, user } }))
      },
      accessToken: initToken,
      setAccessToken: (accessToken) => {
        Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken))
        set((state) => ({ ...state, auth: { ...state.auth, accessToken } }))
      },
      resetAccessToken: () => {
        Cookies.remove(ACCESS_TOKEN)
        set((state) => ({ ...state, auth: { ...state.auth, accessToken: '' } }))
      },
      reset: () => {
        Cookies.remove(ACCESS_TOKEN)
        Cookies.remove(USER_DATA)
        set((state) => ({
          ...state,
          auth: { ...state.auth, user: null, accessToken: '' },
        }))
      },
    },
  }
})

// export const useAuth = () => useAuthStore((state) => state.auth)
