export interface User {
    id: number
    nombres: string
    apellidos: string
    documento_identidad: string
    celular: string
    correo: string
    fecha_nacimiento: string
    edad: number
    sexo: 'M' | 'F' | 'otro'
    estado_civil: string
    grado_instruccion: string
    direccion: string
    distrito: string
    provincia: string
    departamento: string
    rol_id: string
    fecha_registro: string
    estado: number
    rol_nombre: string
}

export interface UserFormData {
    nombres: string
    apellidos: string
    documento_identidad: string
    celular: string
    correo: string
    fecha_nacimiento: string
    edad: number
    sexo?: 'M' | 'F' | 'otro'
    estado_civil?: string
    grado_instruccion?: string
    direccion?: string
    distrito?: string
    provincia?: string
    departamento?: string
    estado?: number
    rol_id: string
    password: string
    confirmPassword: string
    isEdit: boolean
} 