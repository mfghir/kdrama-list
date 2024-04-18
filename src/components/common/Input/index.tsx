import React from 'react'
import styles from "./Input.module.scss"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = ({ label, error, type, name, onChange }: InputProps) => {

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <input
                    type={type}
                    className={styles.input}
                    name={name}
                    placeholder=" "
                    onChange={onChange}
                />

                <span className={styles.label}> {label} </span>
            </div>

            {
                error &&
                <p className={styles.errorMsg}>
                    {error}
                </p>
            }
        </div>
    )
}

export default Input