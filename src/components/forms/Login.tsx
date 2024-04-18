import React from 'react'
import Link from 'next/link'
import Button from '../common/Button'
import Input from '../common/Input'
import styles from './Auth.module.scss'
import InfoText from './InfoText'

const LoginForm = () => {
    return (
        <>
            <Link className={styles.applogo} href={"/"} >
                TechRise
            </Link>

            <form className={styles.form}>
                <h2 className={styles.title}> Login </h2>

                <Input
                    label={"Email"}
                    name={"email"}
                />

                <Input
                    label={"Password"}
                    name={"password"}
                    type={"password"}
                />

                <Link
                    className={styles.forgotPassword}
                    href="/forgot-password"
                >
                    Forgot Password?
                </Link>

                <Button type={"submit"}>
                    Login
                </Button>

                <InfoText
                    text={"Don't have an account ?"}
                    linkTitle={"Sign up"}
                    linkHref={"/signup"}
                />

            </form>
        </>
    )
}

export default LoginForm