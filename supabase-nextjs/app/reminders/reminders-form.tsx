"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { Bell, Calendar, Clock, Check, X } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type Reminder = {
	id: string;
	message: string;
	status: "pending" | "completed" | "cancelled";
	remind_at: string;
};

export default function RemindersForm({ user }: { user: User | null }) {
	const supabase = createClient();
	const [loading, setLoading] = useState(true);
	const [reminders, setReminders] = useState<Reminder[]>([]);
	const [newReminder, setNewReminder] = useState({
		message: "",
		remind_at: "",
	});
	const [saveStatus, setSaveStatus] = useState<
		"idle" | "saving" | "success" | "error"
	>("idle");

	const getReminders = useCallback(async () => {
		try {
			setLoading(true);
			const { data, error } = await supabase
				.from("reminders")
				.select("*")
				.eq("user_id", user?.id)
				.order("remind_at", { ascending: true });

			if (error) throw error;
			if (data) setReminders(data as Reminder[]);
		} catch (error) {
			console.error("Error loading reminders:", error);
		} finally {
			setLoading(false);
		}
	}, [user, supabase]);

	useEffect(() => {
		getReminders();
	}, [user, getReminders]);

	async function createReminder(e: React.FormEvent) {
		e.preventDefault();
		if (!newReminder.message || !newReminder.remind_at) return;

		try {
			setSaveStatus("saving");
			const { error } = await supabase.from("reminders").insert({
				user_id: user?.id,
				message: newReminder.message,
				remind_at: newReminder.remind_at,
				status: "pending",
			});

			if (error) throw error;
			setSaveStatus("success");
			setNewReminder({ message: "", remind_at: "" });
			getReminders();
			setTimeout(() => setSaveStatus("idle"), 2000);
		} catch (error) {
			console.error("Error creating reminder:", error);
			setSaveStatus("error");
		}
	}

	async function updateReminderStatus(
		id: string,
		status: "completed" | "cancelled",
	) {
		try {
			const { error } = await supabase
				.from("reminders")
				.update({ status })
				.eq("id", id);

			if (error) throw error;
			getReminders();
		} catch (error) {
			console.error("Error updating reminder:", error);
		}
	}

	return (
		<div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
			<div className="max-w-2xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-2xl font-bold text-cream">Reminders</h1>
					<p className="text-cream/60 mt-1">
						Manage your reminders and notifications
					</p>
				</div>

				{/* Create New Reminder */}
				<div className="space-y-8 bg-surface p-6 rounded-lg mb-8">
					<form onSubmit={createReminder} className="space-y-6">
						<Input
							label="Reminder Message"
							icon={<Bell />}
							value={newReminder.message}
							onChange={(e) =>
								setNewReminder((prev) => ({
									...prev,
									message: e.target.value,
								}))
							}
							placeholder="Enter your reminder message"
						/>

						<Input
							label="Remind At"
							type="datetime-local"
							icon={<Calendar />}
							value={newReminder.remind_at}
							onChange={(e) =>
								setNewReminder((prev) => ({
									...prev,
									remind_at: e.target.value,
								}))
							}
						/>

						<Button
							variant="primary"
							fullWidth
							type="submit"
							disabled={saveStatus === "saving"}
						>
							{saveStatus === "saving" ? (
								"Creating..."
							) : (
								<>Add Reminder</>
							)}
						</Button>
					</form>
				</div>

				{/* Reminders List */}
				<div className="space-y-4">
					{loading ? (
						<div className="text-cream/60">
							Loading reminders...
						</div>
					) : reminders.length === 0 ? (
						<div className="text-cream/60">No reminders yet</div>
					) : (
						reminders.map((reminder) => (
							<div
								key={reminder.id}
								className={`bg-surface p-4 rounded-lg space-y-2 ${
									reminder.status !== "pending"
										? "opacity-60"
										: ""
								}`}
							>
								<div className="flex justify-between items-start">
									<div className="space-y-1">
										<p className="text-cream">
											{reminder.message}
										</p>
										<div className="flex items-center text-cream/60 text-sm">
											<Clock className="w-4 h-4 mr-1" />
											{new Date(
												reminder.remind_at,
											).toLocaleString()}
										</div>
									</div>

									{reminder.status === "pending" && (
										<div className="flex space-x-2">
											<Button
												variant="outline"
												size="small"
												onClick={() =>
													updateReminderStatus(
														reminder.id,
														"completed",
													)
												}
											>
												<Check className="w-4 h-4" />
											</Button>
											<Button
												variant="outline"
												size="small"
												onClick={() =>
													updateReminderStatus(
														reminder.id,
														"cancelled",
													)
												}
											>
												<X className="w-4 h-4" />
											</Button>
										</div>
									)}
								</div>
								<div className="text-xs text-cream/40">
									Status: {reminder.status}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
