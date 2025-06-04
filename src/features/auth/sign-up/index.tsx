import { Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export default function SignUp() {
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>
            Crear una cuenta
          </CardTitle>
          <CardDescription>
            Ingresa tu correo y contraseña para crear una cuenta. <br />
            ¿Ya tienes una cuenta?{' '}
            <Link
              to='/sign-in'
              className='hover:text-primary underline underline-offset-4'
              search={{ redirect: null }}
            >
              Iniciar sesión
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            Al crear una cuenta, aceptas nuestros{' '}
            <Link
              to='/'
              className='hover:text-primary underline underline-offset-4'
              search={{ redirect: null }}
            >
              Términos de Servicio
            </Link>{' '}
            y{' '}
            <Link
              to='/'
              className='hover:text-primary underline underline-offset-4'
              search={{ redirect: null }}
            >
              Política de Privacidad
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
