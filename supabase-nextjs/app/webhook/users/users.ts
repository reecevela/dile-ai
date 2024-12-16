import { type NextRequest, NextResponse } from "next/server";
import { authorize } from "@/utils/bland/authorize";

import adminSupabaseClient from "@/utils/supabase/service";

export async function GET(request: NextRequest) {
	const authorized = await authorize(request);
	if (authorized.status !== 200) {
		return authorized;
	}

	// get the 'phone_number' query parameter
	const { searchParams } = new URL(request.url);
	const phone_number = searchParams.get("phone_number");

	if (!phone_number) {
		return NextResponse.json(
			{ error: "phone_number is required" },
			{ status: 400 },
		);
	}

	const { data: users, error } = await adminSupabaseClient
		.from("users")
		.select("*")
		.eq("phone_number", phone_number);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json(users);
}
