// app/notes/notes-manager.tsx
"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { Edit, Trash } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface Note {
	id: string;
	title: string;
	content: string;
	created_at: string;
	updated_at: string;
}

export default function NotesManager({ user }: { user: User | null }) {
	const supabase = createClient();
	const [notes, setNotes] = useState<Note[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeNote, setActiveNote] = useState<Note | null>(null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [saveStatus, setSaveStatus] = useState<
		"idle" | "saving" | "success" | "error"
	>("idle");

	const getNotes = useCallback(async () => {
		try {
			setLoading(true);
			const { data, error } = await supabase
				.from("notes")
				.select("*")
				.eq("user_id", user?.id)
				.order("updated_at", { ascending: false });

			if (error) throw error;
			if (data) setNotes(data);
		} catch (error) {
			console.error("Error loading notes:", error);
		} finally {
			setLoading(false);
		}
	}, [user, supabase]);

	useEffect(() => {
		getNotes();
	}, [getNotes]);

	async function saveNote() {
		try {
			setSaveStatus("saving");
			const noteData = {
				user_id: user?.id,
				title,
				content,
				updated_at: new Date().toISOString(),
			};

			const { error } = await supabase.from("notes").upsert(noteData);

			if (error) throw error;

			setSaveStatus("success");
			setTimeout(() => setSaveStatus("idle"), 2000);
			clearForm();
			getNotes();
		} catch (error) {
			console.error("Error saving note:", error);
			setSaveStatus("error");
		}
	}

	async function deleteNote(id: string) {
		try {
			const { error } = await supabase
				.from("notes")
				.delete()
				.eq("id", id);

			if (error) throw error;
			getNotes();
		} catch (error) {
			console.error("Error deleting note:", error);
		}
	}

	function clearForm() {
		setActiveNote(null);
		setTitle("");
		setContent("");
	}

	function editNote(note: Note) {
		setActiveNote(note);
		setTitle(note.title);
		setContent(note.content);
	}

	return (
		<div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-2xl font-bold text-cream">Notes</h1>
					<p className="text-cream/60 mt-1">
						Create and manage your notes
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Note Editor */}
					<div className="space-y-8 bg-surface p-6 rounded-lg">
						<div className="space-y-6">
							<Input
								label="Title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Note title"
							/>

							<div className="space-y-2">
								<label className="block text-sm font-medium text-cream/80">
									Content
								</label>
								<textarea
									value={content}
									onChange={(e) => setContent(e.target.value)}
									className="w-full h-48 px-3 py-2 bg-background text-cream placeholder:text-cream/30 
                                             border border-cream/20 rounded-md focus:border-primary hover:border-cream/30
                                             focus:outline-none focus:ring-0"
									placeholder="Write your note here..."
								/>
							</div>

							<div className="flex space-x-4">
								<Button
									variant="primary"
									onClick={saveNote}
									disabled={
										!title ||
										!content ||
										saveStatus === "saving"
									}
								>
									{saveStatus === "saving"
										? "Saving..."
										: saveStatus === "success"
											? "Saved!"
											: activeNote
												? "Update Note"
												: "Create Note"}
								</Button>
								{activeNote && (
									<Button
										variant="outline"
										onClick={clearForm}
									>
										Cancel
									</Button>
								)}
							</div>
						</div>
					</div>

					{/* Notes List */}
					<div className="space-y-4">
						{loading ? (
							<div className="text-cream/60">
								Loading notes...
							</div>
						) : notes.length === 0 ? (
							<div className="text-cream/60">
								No notes yet. Create your first one!
							</div>
						) : (
							notes.map((note) => (
								<div
									key={note.id}
									className="bg-surface p-4 rounded-lg space-y-2 hover:bg-surface/80 transition-colors"
								>
									<div className="flex justify-between items-start">
										<h3 className="text-lg font-medium text-cream">
											{note.title}
										</h3>
										<div className="flex space-x-2">
											<button
												onClick={() => editNote(note)}
												className="text-cream/60 hover:text-primary"
											>
												<Edit size={16} />
											</button>
											<button
												onClick={() =>
													deleteNote(note.id)
												}
												className="text-cream/60 hover:text-red-500"
											>
												<Trash size={16} />
											</button>
										</div>
									</div>
									<p className="text-cream/60 line-clamp-2">
										{note.content}
									</p>
									<p className="text-xs text-cream/40">
										Last updated:{" "}
										{new Date(
											note.updated_at,
										).toLocaleDateString()}
									</p>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
