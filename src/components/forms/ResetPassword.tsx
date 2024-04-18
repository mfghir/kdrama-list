"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Button from '../common/Button'
import Input from '../common/Input'
import styles from './Auth.module.scss'
// import { InputError, ResetPasswordProps } from '@/app/types'
import axios, { AxiosError } from 'axios'
// import { RESET_PASSWORD_API_URL } from '@/app/contants'
import { useRouter } from 'next/navigation'
import ErrorText from '../common/ErrorText'

import { RESET_PASSWORD_API_URL } from '@/lib'
import { InputError, ResetPasswordProps } from '@/lib/types'

const ResetPassword = ({ params }: ResetPasswordProps) => {
    const router = useRouter()

    const [data, setData] = useState({
        password: "",
        confirmPassword: ""
    })

    const [validationError, setValidationError] = useState<InputError>({})
    const [submitError, setSubmitError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (data.password.trim() === "") {
            setValidationError({ password: "Password is required" })
        }
        else if (data.confirmPassword.trim() === "") {
            setValidationError({ confirmPassword: "Confirm password is required" })
        }
        else if (data.password !== data.confirmPassword) {
            setValidationError({ confirmPassword: "Passwords don't match" })
        }
        else if (data.password.length < 6) {
            setValidationError({ password: "Password should be atleast 6 characters long" })
        }
        else {
            setValidationError({ password: "" })
            setValidationError({ confirmPassword: "" })

            try {
                setLoading(true)

                const apiRes = await axios.post(RESET_PASSWORD_API_URL, {
                    password: data.password,
                    resetToken: params.token
                })

                if (apiRes?.data.success) {
                    setSubmitError("")
                    router.push("/")
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    const errorMsg = error.response?.data?.error
                    setSubmitError(errorMsg)
                }
            }

            setLoading(false)
        }
    }

    return (
        <div className={styles.mainContainer}>
            <Link className={styles.applogo} href={"/"} >
                TechRise
            </Link>

            <form
                className={`${styles.form} ${styles.forgotPasswordForm}`}
                onSubmit={handleResetPassword}
            >
                <h2 className={styles.title}> Reset Password </h2>

                <Input
                    label={"New Password"}
                    name={"password"}
                    type={"password"}
                    onChange={handleInputChange}
                    error={validationError.password}
                />

                <Input
                    label={"Confirm Password"}
                    name={"confirmPassword"}
                    type={"password"}
                    onChange={handleInputChange}
                    error={validationError.confirmPassword}
                />

                <Button type={"submit"} loading={loading}>
                    Reset
                </Button>

                {
                    submitError &&
                    <ErrorText text={submitError} />
                }

            </form>
        </div>
    )
}

export default ResetPassword