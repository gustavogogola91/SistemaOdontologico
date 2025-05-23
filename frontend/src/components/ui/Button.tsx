"use client";

type ButtonProps = {
    variant?: "success" | "danger" | "primary";
    size?: "small" | "medium" | "large";
    children: React.ReactNode;
    onClick?: () => void;
}
export default function Button({
    variant = "primary",
    size = "medium",
    children,
    onClick,
}: ButtonProps) {

    const baseClasses = "bg-blue rounded-[8px] font-bold text-[24px] cursor-pointer uppercase text-white text-center"

    const variants = {
        primary: "",
        danger: "",
        success: "bg-green",
    };

    const sizes = {
        small: "w-[150px] h-[35px]",
        medium: "w-[215px] h-[50px]",
        large: "",
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
            onClick={onClick}>
            {children}
        </button>
    )

}