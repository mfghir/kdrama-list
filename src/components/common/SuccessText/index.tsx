import React from 'react'
import styles from "./SuccessText.module.scss"

interface SuccessTextProps {
    text: string;
}

const SuccessText = ({ text }: SuccessTextProps) => {
    return (
        <p className={styles.text}>
            {text}
        </p>
    )
}

export default SuccessText