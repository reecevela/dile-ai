// app/reminders/page.tsx
import RemindersForm from "./reminders-form";
import { createClient } from "@/utils/supabase/server";

export default async function Reminders() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return <RemindersForm user={user} />;
}
