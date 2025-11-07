import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary';
    size?: 'normal' | 'small';
    children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'normal', children, ...props }) => {
    return (
        <div>

        </div>
    )
}
