import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

const InputComp: React.FC<InputProps> = ({ label, id, ...props }) => {
    return (
        <div className="pt-3">
            <label htmlFor={id}
                className="block text-sm font-medium text-gray-300 mb-1">
                {label}
            </label>
            <input
                id={id}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400"
                {...props}
            />
        </div>
    )
}

export function Input({ label, id, ...props}: InputProps) {
    return (
        <InputComp
            label={label}
            id={id}
            {...props}
        />
    )
}
