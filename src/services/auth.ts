import axios from 'axios'

const API_URL = 'https://nextboostperu.com/sistemanb/api'

interface LoginResponse {
    success: boolean
    token: string
    usuario: {
        id: number
        documento_identidad: string
        rol_id: number
    }
}

interface LoginCredentials {
    documento_identidad: string
    password: string
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await axios.post<LoginResponse>(
            `${API_URL}/auth.php`,
            credentials
        )
        return response.data
    },
} 