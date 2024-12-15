import { SignupButton } from "@/components/auth/SignupButton";
import { LoginButton } from "@/components/auth/LoginButton";

export default function Home() {
	return (
		<main className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
			<div className="max-w-2xl w-full text-center space-y-12">
				{/* Hero Section */}
				<div className="space-y-6">
					<h1 className="text-6xl font-bold text-cream mb-4">
						Dile AI
					</h1>

					{/* Text placeholders with gradient underline effect */}
					<p className="text-xl text-cream/80 mb-8">
						Better reminders, notes and more through your voice.
					</p>
					<p className="text-lg text-cream/60 relative inline-block">
						Unlock yourself - experience the power by signing up or
						logging in.
						<span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary opacity-50"></span>
					</p>
				</div>

				{/* Button Group */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
					<SignupButton />
					<LoginButton />
				</div>
			</div>

			{/* Optional: Floating background gradient */}
			<div className="fixed inset-0 -z-10 bg-background">
				<div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-30 blur-3xl"></div>
			</div>
		</main>
	);
}
