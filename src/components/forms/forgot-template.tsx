import React from 'react'

interface EmailTemplateProps {
    name: string;
    resetLink: string;
}

const EmailTemplate = ({ name, resetLink }: EmailTemplateProps) => {
    return (
        <div style={mainStyles}>
            <h1 style={titleStyles}>
                Forgot Password
            </h1>

            <p style={textStyles}>
                Hi, {name}
            </p>

            <p style={textStyles}>
                You recently requested a password reset. To reset your password, please click the the button below:
            </p>

            <a style={linkStyles} href={resetLink}>
                Reset Password
            </a>

            <p style={textStyles}>
                This link will expire in 2 hours. If you do not reset your password within that time, you will need to request a new password reset.
                If you did not request a password reset, please ignore this email.
            </p>
        </div>
    )
}

const mainStyles: React.CSSProperties = {
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
}

const titleStyles: React.CSSProperties = {
    fontSize: '1.25rem',
    textAlign: 'center'
}

const textStyles: React.CSSProperties = {
    fontSize: '1.1rem',
}

const linkStyles: React.CSSProperties = {
    padding: '1rem 0rem',
    backgroundColor: '#007bff',
    borderRadius: '4px',
    width: '150px',
    color: '#fff',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    fontSize: '1.1rem',
    textDecoration: 'none'
}

export default EmailTemplate