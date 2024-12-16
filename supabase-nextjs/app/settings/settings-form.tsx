"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { Phone } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SettingsForm({ user }: { user: User | null }) {
	const supabase = createClient();
	const [loading, setLoading] = useState(true);
	const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
	const [saveStatus, setSaveStatus] = useState<
		"idle" | "saving" | "success" | "error"
	>("idle");

	const getPhoneNumber = useCallback(async () => {
		try {
			setLoading(true);
			const { data, error, status } = await supabase
				.from("users")
				.select("phone_number")
				.eq("id", user?.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setPhoneNumber(data.phone_number);
			}
		} catch (error) {
			console.error("Error loading phone number:", error);
		} finally {
			setLoading(false);
		}
	}, [user, supabase]);

	useEffect(() => {
		getPhoneNumber();
	}, [user, getPhoneNumber]);

	async function updatePhoneNumber({
		phone_number,
	}: {
		phone_number: string | null;
	}) {
		try {
			setSaveStatus("saving");
			const { error } = await supabase.from("users").upsert({
				id: user?.id as string,
				phone_number,
				updated_at: new Date().toISOString(),
			});
			if (error) throw error;
			setSaveStatus("success");
			setTimeout(() => setSaveStatus("idle"), 2000);
		} catch (error) {
			console.error("Error updating phone number:", error);
			setSaveStatus("error");
		}
	}

	return (
		<div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
			<div className="max-w-2xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-2xl font-bold text-cream">
						Phone Settings
					</h1>
					<p className="text-cream/60 mt-1">
						Update your phone number
					</p>
				</div>

				<div className="space-y-8 bg-surface p-6 rounded-lg">
					{/* Form Fields */}
					<div className="space-y-6">
						<Input
							label="Phone Number"
							id="phoneNumber"
							icon={<Phone />}
							type="tel"
							value={phoneNumber || ""}
							onChange={(e) => setPhoneNumber(e.target.value)}
							placeholder="Enter your phone number"
						/>
					</div>

					{/* Action Buttons */}
					<div className="space-y-4 pt-4">
						<Button
							variant="primary"
							fullWidth
							onClick={() =>
								updatePhoneNumber({ phone_number: phoneNumber })
							}
							disabled={loading || saveStatus === "saving"}
						>
							{saveStatus === "saving"
								? "Saving..."
								: saveStatus === "success"
									? "Saved!"
									: saveStatus === "error"
										? "Error Saving"
										: "Save Changes"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
