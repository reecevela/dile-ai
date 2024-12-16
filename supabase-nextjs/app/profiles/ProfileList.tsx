// app/profiles/ProfileList.tsx
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { UserIcon, Globe, AtSign } from "lucide-react";
import Image from "next/image";

interface Profile {
	id: string;
	username: string;
	full_name: string;
	bio: string | null;
	website: string;
	avatar_url: string;
}

export default function ProfileList() {
	const supabase = createClient();
	const [loading, setLoading] = useState(true);
	const [profiles, setProfiles] = useState<Profile[]>([]);

	useEffect(() => {
		async function fetchProfiles() {
			try {
				setLoading(true);
				const { data, error } = await supabase
					.from("profiles")
					.select("id, username, full_name, website, avatar_url, bio")
					.order("full_name");

				if (error) throw error;
				if (data) setProfiles(data);
			} catch (error) {
				console.error("Error loading profiles:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchProfiles();
	}, [supabase]);

	if (loading) {
		return (
			<div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
				<div className="max-w-4xl mx-auto">
					<div className="animate-pulse space-y-4">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="h-32 bg-surface rounded-lg"
							/>
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-2xl font-bold text-cream">Community</h1>
					<p className="text-cream/60 mt-1">
						Browse all members of Dile AI
					</p>
				</div>

				{/* Profile Grid */}
				<div className="grid gap-6 md:grid-cols-2">
					{profiles.map((profile) => (
						<div
							key={profile.id}
							className="bg-surface p-6 rounded-lg space-y-4 hover:ring-1 hover:ring-primary/50 transition-all"
						>
							<div className="flex items-center space-x-4">
								{/* Avatar */}
								<div className="relative w-16 h-16 rounded-full overflow-hidden bg-background">
									{profile.avatar_url ? (
										<Image
											src={profile.avatar_url}
											alt={profile.username || "Profile"}
											fill
											className="object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center">
											<UserIcon className="w-8 h-8 text-cream/20" />
										</div>
									)}
								</div>

								{/* Basic Info */}
								<div className="flex-1 min-w-0">
									<p className="text-cream font-medium truncate">
										{profile.full_name || "Anonymous"}
									</p>
									{profile.username && (
										<p className="text-cream/60 flex items-center gap-1 text-sm">
											<AtSign className="w-3 h-3" />
											{profile.username}
										</p>
									)}
									{profile.bio && (
										<p className="text-cream/60 truncate">
											{profile.bio}
										</p>
									)}
								</div>
							</div>

							{/* Website if available */}
							{profile.website && (
								<div className="flex items-center gap-2 text-cream/40 text-sm">
									<Globe className="w-4 h-4" />
									<a
										href={profile.website}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-primary truncate"
									>
										{profile.website.replace(
											/^https?:\/\//,
											"",
										)}
									</a>
								</div>
							)}
						</div>
					))}
				</div>

				{profiles.length === 0 && (
					<div className="text-center text-cream/40 py-12">
						No profiles found
					</div>
				)}
			</div>
		</div>
	);
}
