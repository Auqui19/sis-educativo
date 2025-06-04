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

export default function SignIn() {
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>Login</CardTitle>
          <CardDescription>
            Ingrese su correo electrónico y contraseña <br />
            inicia sesión en tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            Al hacer clic en iniciar sesión, aceptas nuestra{' '}
            <a
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              Terminos de Servicio
            </a>{' '}
            and{' '}
            <a
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              Privacidad y Política
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
