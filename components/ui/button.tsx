
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "destructive";
    className?: string; // Expect className to be passed for customization
}

export function Button({ variant = "default", className = "", ...props }: ButtonProps) {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    // Variants
    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-900",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    };

    // Combine classes. 
    // specialized tailwind-merge would be better but simple string concat works for basic usage.
    // user passes className which should override or append.
    const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

    return (
        <button className={combinedClassName} {...props} />
    );
}
