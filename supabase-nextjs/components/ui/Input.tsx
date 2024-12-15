"use client";
import React, { forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	icon?: React.ReactNode;
	helper?: string;
	showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			error,
			icon,
			helper,
			className = "",
			type = "text",
			showPasswordToggle = false,
			...props
		},
		ref,
	) => {
		const [showPassword, setShowPassword] = React.useState(false);
		const [isFocused, setIsFocused] = React.useState(false);

		const inputType = showPasswordToggle
			? showPassword
				? "text"
				: "password"
			: type;

		return (
			<div className="w-full space-y-1">
				{label && (
					<label className="block text-sm font-medium text-cream/80 mb-1">
						{label}
					</label>
				)}

				<div className="relative">
					{/* Input wrapper */}
					<div
						className={`
            relative flex items-center w-full rounded-md 
            border transition-all duration-200
            ${
				error
					? "border-red-500 focus-within:border-red-500"
					: "border-cream/20 focus-within:border-primary hover:border-cream/30"
			}
            ${isFocused ? "bg-surface" : "bg-background"}
          `}
					>
						{/* Leading Icon */}
						{icon && (
							<div className="pl-3">
								<div
									className={`w-5 h-5 text-cream/50 ${isFocused ? "text-primary" : ""}`}
								>
									{icon}
								</div>
							</div>
						)}

						{/* Input */}
						<input
							ref={ref}
							type={inputType}
							className={`
                w-full px-3 py-2 bg-transparent text-cream placeholder:text-cream/30
                focus:outline-none focus:ring-0 
                ${icon ? "pl-2" : "pl-3"}
                ${showPasswordToggle ? "pr-10" : "pr-3"}
                ${className}
              `}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							{...props}
						/>

						{/* Password Toggle */}
						{showPasswordToggle && (
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 text-cream/50 hover:text-cream/80 focus:outline-none"
							>
								{showPassword ? (
									<EyeOff className="w-4 h-4" />
								) : (
									<Eye className="w-4 h-4" />
								)}
							</button>
						)}
					</div>
				</div>

				{/* Error Message */}
				{error && <p className="text-sm text-red-500 mt-1">{error}</p>}

				{/* Helper Text */}
				{helper && !error && (
					<p className="text-sm text-cream/50 mt-1">{helper}</p>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";

export default Input;
