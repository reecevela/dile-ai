"use client";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
	variant?: ButtonVariant;
	size?: ButtonSize;
	disabled?: boolean;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	fullWidth?: boolean;
	className?: string;
	children: React.ReactNode;
	formAction?: (formData: FormData) => Promise<void>;
}

const Button = ({
	children,
	variant = "primary",
	size = "medium",
	disabled = false,
	onClick,
	type = "button",
	fullWidth = false,
	className = "",
	formAction,
}: ButtonProps) => {
	const baseStyles =
		"rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";

	const variants = {
		primary:
			"bg-primary text-cream hover:bg-primary-dark focus:ring-primary-light",
		secondary:
			"bg-secondary text-cream hover:bg-secondary-dark focus:ring-secondary-light",
		outline:
			"border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary-light",
		ghost: "text-cream hover:bg-primary/10 focus:ring-primary-light",
	};

	const sizes = {
		small: "px-3 py-1.5 text-sm",
		medium: "px-4 py-2.5 text-base",
		large: "px-6 py-3 text-lg",
	};

	const classes = [
		baseStyles,
		variants[variant],
		sizes[size],
		fullWidth ? "w-full" : "",
		disabled ? "opacity-50 cursor-not-allowed" : "",
		className,
	].join(" ");

	return (
		<button
			type={type}
			className={classes}
			onClick={onClick}
			disabled={disabled}
			formAction={formAction}
		>
			{children}
		</button>
	);
};

export default Button;
