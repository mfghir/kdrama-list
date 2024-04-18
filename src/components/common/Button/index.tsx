import React from 'react'
import styles from "./Button.module.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
}

const Button = ({ children, type, onClick, loading }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={styles.container}
            disabled={loading}
        >
            {loading ? "Processing...." : children}
        </button>
    )
}

export default Button