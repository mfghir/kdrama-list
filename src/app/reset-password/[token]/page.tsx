import ResetPassword from '@/components/forms/ResetPassword'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reset Password',
}


const page = ({ params }: { params: string }) => {
  return (
    <ResetPassword params={params} />
  )
}

export default page