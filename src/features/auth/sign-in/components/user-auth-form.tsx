import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

const formSchema = z.object({
  documento: z.string().min(8, 'El documento debe tener al menos 8 caracteres'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

type FormData = z.infer<typeof formSchema>

const API_URL = import.meta.env.VITE_API_URL

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setAccessToken, setUser } = useAuthStore((state) => state.auth)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documento: '',
      password: '',
    },
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/auth.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documento_identidad: data.documento,
          password: data.password,
        }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Credenciales inválidas')
          return
        }
        throw new Error('Error en la solicitud')
      }

      const result = await response.json()

      if (result.success) {
        setAccessToken(result.token)
        setUser(result.usuario)
        toast.success('¡Inicio de sesión exitoso!')
        navigate({ to: '/' })
      } else {
        toast.error(result.message || 'Credenciales inválidas')
      }
    } catch (error) {
      toast.error('Error al iniciar sesión. Por favor intente nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='documento'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documento de Identidad</FormLabel>
              <FormControl>
                <Input
                  placeholder='Ingrese su documento'
                  type='text'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder='********'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </form>
    </Form>
  )
}
