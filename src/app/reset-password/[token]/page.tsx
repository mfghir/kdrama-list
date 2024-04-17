/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
// import { SubmitButton } from '@/components/ui/submit-button'
// import { TextField } from '@/components/ui/text-field'
import { CaretLeftIcon } from '@radix-ui/react-icons'
// import { Card, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import { useState } from 'react'
import { resetPassword } from './_action'
// import { resetPassword } from './_actions'

export default function ({ params }: { params: { token: string } }) {
  const [error, setError] = useState<string>('')

  async function submit(data: FormData) {
    // @ts-ignore
    const { error } = await resetPassword(params.token, data)
    // const { error:any } = await resetPassword(params.token, data)
    setError(error || '')
  }

  return (
    <main className="max-w-xl px-4 mx-auto flex flex-col justify-center h-screen">
      <Card className="gap-4 flex flex-col">
        {/* <Flex gap="4" direction="column" asChild> */}
          <form action={submit}>
            <h1 className="text-2xl font-light">Choose a new password</h1>
            <p>You can reset your password here.</p>
            <Input
              name="password"
              type="password"
              // size="3"
              placeholder="Password"
            />
            <Input
              name="confirm"
              type="password"
              // size="3"
              placeholder="Confirm password"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button>Reset Password</Button>
            <Link
              href="/"
              className="text-sm text-neutral-700/80 flex items-center"
            >
              <CaretLeftIcon />
              <span>Return to Login</span>
            </Link>
          </form>
        {/* </Flex> */}
      </Card>
    </main>
  )
}