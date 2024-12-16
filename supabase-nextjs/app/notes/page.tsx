// app/notes/page.tsx
import NotesManager from "./notes-manager";
import { createClient } from "@/utils/supabase/server";

export default async function Notes() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return <NotesManager user={user} />;
}
