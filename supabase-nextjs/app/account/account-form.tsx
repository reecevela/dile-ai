"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { User as UserIcon, Globe, AtSign, Mail } from "lucide-react";
import Avatar from "./avatar";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AccountForm({ user }: { user: User | null }) {
	const supabase = createClient();
	const [loading, setLoading] = useState(true);
	const [fullname, setFullname] = useState<string | null>(null);
	const [username, setUsername] = useState<string | null>(null);
	const [bio, setBio] = useState<string | null>(null);
	const [website, setWebsite] = useState<string | null>(null);
	const [avatar_url, setAvatarUrl] = useState<string | null>(null);
	const [saveStatus, setSaveStatus] = useState<
		"idle" | "saving" | "success" | "error"
	>("idle");

	const getProfile = useCallback(async () => {
		try {
			setLoading(true);
			const { data, error, status } = await supabase
				.from("profiles")
				.select(`full_name, username, bio, website, avatar_url`)
				.eq("id", user?.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setFullname(data.full_name);
				setUsername(data.username);
				setBio(data.bio);
				setWebsite(data.website);
				setAvatarUrl(data.avatar_url);
			}
		} catch (error) {
			console.error("Error loading user data:", error);
		} finally {
			setLoading(false);
		}
	}, [user, supabase]);

	useEffect(() => {
		getProfile();
	}, [user, getProfile]);

	async function updateProfile({
		username,
		website,
		bio,
		avatar_url,
	}: {
		username: string | null;
		fullname: string | null;
		bio: string | null;
		website: string | null;
		avatar_url: string | null;
	}) {
		try {
			setSaveStatus("saving");
			const { error } = await supabase.from("profiles").upsert({
				id: user?.id as string,
				full_name: fullname,
				username,
				bio,
				website,
				avatar_url,
				updated_at: new Date().toISOString(),
			});
			if (error) throw error;
			setSaveStatus("success");
			setTimeout(() => setSaveStatus("idle"), 2000);
		} catch (error) {
			console.error("Error updating profile:", error);
			setSaveStatus("error");
		}
	}

	return (
		<div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
			<div className="max-w-2xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-2xl font-bold text-cream">
						Account Settings
					</h1>
					<p className="text-cream/60 mt-1">
						Manage your account information and preferences
					</p>
				</div>

				<div className="space-y-8 bg-surface p-6 rounded-lg">
					{/* Avatar Section */}
					<div className="flex flex-col items-center space-y-4">
						<Avatar
							uid={user?.id ?? null}
							url={avatar_url}
							size={150}
							onUpload={(url) => {
								setAvatarUrl(url);
								updateProfile({
									fullname,
									username,
									bio,
									website,
									avatar_url: url,
								});
							}}
						/>
						<p className="text-sm text-cream/60">
							Click to upload a new avatar
						</p>
					</div>

					{/* Form Fields */}
					<div className="space-y-6">
						<Input
							label="Email"
							id="email"
							icon={<Mail />}
							value={user?.email ?? ""}
							disabled
						/>

						<Input
							label="Full Name"
							id="fullName"
							icon={<UserIcon />}
							value={fullname || ""}
							onChange={(e) => setFullname(e.target.value)}
							placeholder="Enter your full name"
						/>

						<Input
							label="Username"
							id="username"
							icon={<AtSign />}
							value={username || ""}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Choose a username"
						/>

						<Input
							label="Bio"
							id="bio"
							icon={<UserIcon />}
							value={bio || ""}
							onChange={(e) => setBio(e.target.value)}
							placeholder="How do you Dile?"
						/>

						<Input
							label="Website"
							id="website"
							icon={<Globe />}
							type="url"
							value={website || ""}
							onChange={(e) => setWebsite(e.target.value)}
							placeholder="https://example.com"
						/>
					</div>

					{/* Action Buttons */}
					<div className="space-y-4 pt-4">
						<Button
							variant="primary"
							fullWidth
							onClick={() =>
								updateProfile({
									fullname,
									username,
									bio,
									website,
									avatar_url,
								})
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

						<form action="/auth/signout" method="post">
							<Button variant="outline" fullWidth type="submit">
								Sign out
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
