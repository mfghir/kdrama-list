// import ResetPassword from '@/app/components/Auth/ResetPassword'
// import { ResetPasswordProps } from '@/app/types'
import ResetPassword from '@/components/forms/ResetPassword'
import { ResetPasswordProps } from '@/lib/types'
import React from 'react'

const page = ({ params }: ResetPasswordProps) => {
    return (
        <ResetPassword
            params={params}
        />
    )
}

export default page