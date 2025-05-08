"use client";

type ButtonProps = {
    variant?: "success" | "danger" | "primary";
    children: React.ReactNode;
    onClick?: () => void;
}
export default function Button({
    variant = "primary",
    children,
    onClick,
}: ButtonProps) {

    const baseClasses = ""

    const variants = {
        primary: "",
        danger: "",
    };

    return(
        <button>
            
        </button>
    )
    
}