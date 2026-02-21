import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "destructive" | "ghost" | "secondary";
    size?: "default" | "sm" | "icon";
    className?: string;
}

export function Button({ variant = "default", size = "default", className = "", ...props }: ButtonProps) {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    // Variants
    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-900 border-none",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    };

    // Sizes
    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        icon: "h-10 w-10",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button className={combinedClassName} {...props} />
    );
}
