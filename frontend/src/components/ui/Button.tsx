import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary';
    size?: 'normal' | 'small';
    children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'normal', children, ...props }) => {
    const baseClasses = "font-bold rounded-lg transition-transform transform hover:scale-105 focus:outline-none";

    const variantClasses = "bg-gray-800 hover:bg-[#00003c] text-white focus:ring-gray-100 mt-2 border border-gray-600";

    const sizeClasses = {
        normal: "py-2 px-4",
        small: "py-1 px-2 text-sm",
    };

    return (
        <button className={`${baseClasses} ${variantClasses} ${sizeClasses[size]}`} {...props}>
            {children}
        </button>
    )
}
