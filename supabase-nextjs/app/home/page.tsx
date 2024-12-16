import React from "react";
import { Phone, Bell, UserCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
			<div className="max-w-3xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-cream mb-4">
						Welcome to Dile
					</h1>
				</div>

				{/* Setup Steps */}
				<div className="space-y-8">
					{/* Step 1 */}
					<div className="bg-surface rounded-lg p-6 space-y-4">
						<div className="flex items-center space-x-4">
							<div className="bg-primary/20 p-3 rounded-full">
								<Phone className="w-6 h-6 text-primary" />
							</div>
							<h2 className="text-2xl font-semibold text-cream">
								1. Set Up Your Phone
							</h2>
						</div>
						<p className="text-cream/80 pl-16">
							First, head to Settings and enter your phone number.
							This lets Dile know how to reach you.
						</p>
						<div className="pl-16">
							<Link
								href="/settings"
								className="inline-flex items-center space-x-2 text-primary hover:text-primary-light"
							>
								<span>Go to Settings</span>
								<ArrowRight className="w-4 h-4" />
							</Link>
						</div>
					</div>

					{/* Step 2 */}
					<div className="bg-surface rounded-lg p-6 space-y-4">
						<div className="flex items-center space-x-4">
							<div className="bg-primary/20 p-3 rounded-full">
								<Bell className="w-6 h-6 text-primary" />
							</div>
							<h2 className="text-2xl font-semibold text-cream">
								2. Start Using Dile
							</h2>
						</div>
						<p className="text-cream/80 pl-16">
							Call{" "}
							<span className="text-primary font-mono">
								+1 (563) 661-6756
							</span>{" "}
							any time to:
						</p>
						<ul className="pl-16 space-y-2 text-cream/80">
							<li className="flex items-center space-x-2">
								<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
								<span>
									Leave a note - Dile will craft it how you
									want it.
								</span>
							</li>
							<li className="flex items-center space-x-2">
								<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
								<span>
									Schedule a reminder - Dile will call you
									back at your specified time.
								</span>
							</li>
						</ul>
					</div>

					{/* Step 3 */}
					<div className="bg-surface rounded-lg p-6 space-y-4">
						<div className="flex items-center space-x-4">
							<div className="bg-primary/20 p-3 rounded-full">
								<UserCircle className="w-6 h-6 text-primary" />
							</div>
							<h2 className="text-2xl font-semibold text-cream">
								3. Customize Your Experience
							</h2>
						</div>
						<p className="text-cream/80 pl-16">
							Complete your Profile to personalize your Dile
							experience. Set your Bio to &quot;Just Notes!&quot;
							for example, and during calls Dile will remember
							your preference and skip over talking about
							reminders.
						</p>
						<div className="pl-16">
							<Link
								href="/account"
								className="inline-flex items-center space-x-2 text-primary hover:text-primary-light"
							>
								<span>Go to Profile</span>
								<ArrowRight className="w-4 h-4" />
							</Link>
						</div>
					</div>
				</div>

				{/* Getting Started */}
				<div className="mt-12 text-center">
					<p className="text-cream/60">
						Need help? Just call Dile and say &quot;Help&quot; to
						get a walkthrough of all features.
					</p>
				</div>
			</div>
		</div>
	);
}
