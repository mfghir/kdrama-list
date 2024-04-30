import ResetPassword from '@/components/forms/ResetPassword'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reset Password',
}


// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const page = ({ params }: { params: any }) => {
  return (
    <ResetPassword params={params} />
  )
}

export default page