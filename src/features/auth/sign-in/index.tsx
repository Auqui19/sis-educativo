import { Card, CardContent } from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardContent>
          <UserAuthForm />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
