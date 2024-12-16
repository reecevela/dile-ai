// app/settings/page.tsx
import { createClient } from "@/utils/supabase/server";
import SettingsForm from "./settings-form";

export default async function Settings() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return <SettingsForm user={user} />;
}
