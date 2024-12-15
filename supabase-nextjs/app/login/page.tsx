// app/login/page.tsx
"use client";
import { login, signup } from "./actions";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
	const [errors, setErrors] = useState({ email: "", password: "" });

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="w-full max-w-md space-y-8">
				{/* Header */}
				<div className="text-center">
					<h2 className="text-3xl font-bold text-cream">
						Welcome back
					</h2>
					<p className="mt-2 text-cream/60">
						Sign in to your account
					</p>
				</div>

				{/* Form */}
				<form className="mt-8 space-y-6">
					<div className="space-y-4">
						<Input
							label="Email"
							id="email"
							name="email"
							type="email"
							icon={<Mail />}
							placeholder="Enter your email"
							required
							error={errors.email}
						/>

						<Input
							label="Password"
							id="password"
							name="password"
							showPasswordToggle
							placeholder="Enter your password"
							required
							error={errors.password}
						/>
					</div>

					{/* Additional features */}
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 rounded border-cream/20 bg-background text-primary focus:ring-primary"
							/>
							<label
								htmlFor="remember-me"
								className="ml-2 block text-sm text-cream/80"
							>
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<a
								href="#"
								className="text-primary hover:text-primary-light"
							>
								Forgot your password?
							</a>
						</div>
					</div>

					{/* Buttons */}
					<div className="space-y-3">
						<Button
							type="submit"
							variant="primary"
							fullWidth
							formAction={login}
						>
							Sign in
						</Button>

						<Button
							type="submit"
							variant="outline"
							fullWidth
							formAction={signup}
						>
							Create account
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
