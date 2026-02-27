import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "primary" | "outline" | "destructive" | "ghost" | "secondary";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "default", size = "default", ...props }, ref) => {
        // Base premium NGO styles
        const baseStyles = "inline-flex items-center justify-center rounded-[8px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

        // Variants (NGO System)
        const variants = {
            default: "bg-[#800000] text-white hover:bg-[#a00000] shadow-[0_4px_14px_0_rgba(0,0,0,0.08)] hover:-translate-y-[2px] border border-transparent",
            primary: "bg-[#800000] text-white hover:bg-[#a00000] shadow-[0_4px_14px_0_rgba(0,0,0,0.08)] hover:-translate-y-[2px] border border-transparent",
            secondary: "bg-[#0056A6] text-white hover:bg-[#003f7a] shadow-[0_4px_14px_0_rgba(0,0,0,0.08)] hover:-translate-y-[2px] border border-transparent",
            outline: "bg-transparent border-2 border-[#0056A6] text-[#0056A6] hover:bg-[#0056A6] hover:text-white shadow-sm hover:-translate-y-[2px]",
            destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
            ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
        };

        // Sizes
        const sizes = {
            default: "px-6 py-3", // equivalent to ~ 12px 24px
            sm: "px-4 py-2 text-sm",
            lg: "px-8 py-4 text-lg rounded-[10px]",
            icon: "h-12 w-12",
        };

        const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

        return (
            <button ref={ref} className={combinedClassName} {...props} />
        );
    }
);
Button.displayName = "Button";

