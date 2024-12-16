// app/profiles/page.tsx
import { createClient } from "@/utils/supabase/server";
import ProfileList from "./ProfileList";

export default async function Profiles() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return null;
	}

	return <ProfileList />;
}
