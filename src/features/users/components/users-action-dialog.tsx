'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { SelectDropdown } from '@/components/select-dropdown'
import { User, UserFormData } from '../types'

const API_URL = import.meta.env.VITE_API_URL

const formSchema = z
  .object({
    nombres: z.string().min(1, { message: 'Los nombres son requeridos' }),
    apellidos: z.string().min(1, { message: 'Los apellidos son requeridos' }),
    documento_identidad: z
      .string()
      .min(1, { message: 'El documento es requerido' }),
    celular: z.string().min(1, { message: 'El celular es requerido' }),
    correo: z
      .string()
      .min(1, { message: 'El correo es requerido' })
      .email({ message: 'El correo no es válido' }),
    fecha_nacimiento: z
      .string()
      .min(1, { message: 'La fecha de nacimiento es requerida' })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'El formato debe ser YYYY-MM-DD',
      }),
    edad: z.number().min(1, { message: 'La edad es requerida' }),
    sexo: z.enum(['M', 'F', 'otro']).optional(),
    estado_civil: z.string().optional(),
    grado_instruccion: z.string().optional(),
    direccion: z.string().optional(),
    distrito: z.string().optional(),
    provincia: z.string().optional(),
    departamento: z.string().optional(),
    estado: z.number().min(0).max(1).optional(),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    rol_id: z.string().min(1, { message: 'El rol es requerido' }),
    confirmPassword: z.string(),
    isEdit: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof formSchema>

interface UsersActionDialogProps {
  open: boolean
  onOpenChange: () => void
  currentRow?: User
}

const rolOptions = [
  { label: 'Administrador', value: '1' },
  { label: 'Secretaria', value: '2' },
  { label: 'Vendedor', value: '3' },
]

const sexoOptions = [
  { label: 'Masculino', value: 'M' },
  { label: 'Femenino', value: 'F' },
  { label: 'Otro', value: 'otro' },
]

const estadoOptions = [
  { label: 'Activo', value: '1' },
  { label: 'Inactivo', value: '0' },
]

export function UsersActionDialog({
  open,
  onOpenChange,
  currentRow,
}: UsersActionDialogProps) {
  const isEdit = !!currentRow
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          password: '',
          confirmPassword: '',
          isEdit,
          edad: Number(currentRow.edad),
          estado: currentRow.estado ? 1 : 0,
        }
      : {
          nombres: '',
          apellidos: '',
          documento_identidad: '',
          correo: '',
          rol_id: '',
          celular: '',
          fecha_nacimiento: '',
          edad: 0,
          sexo: undefined,
          estado_civil: '',
          grado_instruccion: '',
          direccion: '',
          distrito: '',
          provincia: '',
          departamento: '',
          estado: 1,
          password: '',
          confirmPassword: '',
          isEdit,
        },
  })

  const handleClose = () => {
    form.reset()
    onOpenChange()
  }

  const onSubmit = async (values: FormData) => {
    try {
      const response = await fetch(`${API_URL}/usuario.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombres: values.nombres,
          apellidos: values.apellidos,
          documento_identidad: values.documento_identidad,
          celular: values.celular,
          correo: values.correo,
          fecha_nacimiento: values.fecha_nacimiento,
          edad: values.edad,
          sexo: values.sexo,
          estado_civil: values.estado_civil,
          grado_instruccion: values.grado_instruccion,
          direccion: values.direccion,
          distrito: values.distrito,
          provincia: values.provincia,
          departamento: values.departamento,
          estado: values.estado,
          password: values.password,
          rol_id: values.rol_id,
        }),
      })

      const result = await response.json()

      if (result.message === 'Usuario creado con éxito') {
        toast.success('Usuario creado exitosamente')
        handleClose()
      } else {
        toast.error(result.message || 'Error al crear usuario')
      }
    } catch (error) {
      toast.error('Error al crear usuario')
    }
  }

  const isPasswordTouched = !!form.formState.dirtyFields.password

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>
            {currentRow ? 'Editar Usuario' : 'Nuevo Usuario'}
          </DialogTitle>
          <DialogDescription>
            {currentRow
              ? 'Modifica los datos del usuario'
              : 'Ingresa los datos del nuevo usuario'}
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 max-h-[70vh] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='nombres'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombres *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Juan'
                          autoComplete='off'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='apellidos'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellidos *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Pérez'
                          autoComplete='off'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='documento_identidad'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Documento *</FormLabel>
                      <FormControl>
                        <Input placeholder='12345678' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='celular'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celular *</FormLabel>
                      <FormControl>
                        <Input placeholder='987654321' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='correo'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='juan.perez@gmail.com'
                          type='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='fecha_nacimiento'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Nacimiento *</FormLabel>
                      <FormControl>
                        <Input type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='edad'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Edad *</FormLabel>
                      <FormControl>
                        <Input type='number' min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='rol_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol *</FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Selecciona un rol'
                        items={rolOptions}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sexo'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Selecciona el sexo'
                        items={sexoOptions}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='estado_civil'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado Civil</FormLabel>
                      <FormControl>
                        <Input placeholder='Soltero' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='grado_instruccion'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grado de Instrucción</FormLabel>
                      <FormControl>
                        <Input placeholder='Superior' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='direccion'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder='Av. Principal 123' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='distrito'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distrito</FormLabel>
                      <FormControl>
                        <Input placeholder='San Isidro' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='provincia'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provincia</FormLabel>
                      <FormControl>
                        <Input placeholder='Lima' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='departamento'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departamento</FormLabel>
                      <FormControl>
                        <Input placeholder='Lima' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='estado'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <SelectDropdown
                        defaultValue={field.value?.toString()}
                        onValueChange={(value) => field.onChange(Number(value))}
                        placeholder='Selecciona el estado'
                        items={estadoOptions}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña *</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder='********' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Contraseña *</FormLabel>
                      <FormControl>
                        <PasswordInput
                          disabled={!isPasswordTouched}
                          placeholder='********'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button variant='outline' type='button' onClick={handleClose}>
            Cancelar
          </Button>
          <Button type='submit' form='user-form'>
            {isEdit ? 'Guardar cambios' : 'Crear usuario'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
