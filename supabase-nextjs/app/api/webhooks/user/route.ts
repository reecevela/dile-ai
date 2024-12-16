// app/api/webhooks/user/route.ts
import { checkAuthorization } from "@/lib/auth";
import { adminSupabaseClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const authResponse = await checkAuthorization();
	if (authResponse) return authResponse;
	const encodedPhone = request.nextUrl.searchParams.get("phone_number");
	if (!encodedPhone) {
		return NextResponse.json(
			{ error: "Phone number is required" },
			{ status: 400 },
		);
	}

	// Decode the phone number and handle both encoded and non-encoded cases
	const phone = decodeURIComponent(encodedPhone).replace(/ /g, "+");

	const { data, error } = await adminSupabaseClient
		.from("users")
		.select("id")
		.eq("phone_number", phone)
		.single();

	if (error) {
		return NextResponse.json({ error: "User not found" }, { status: 404 });
	}

	const profileData = await adminSupabaseClient
		.from("profiles")
		.select("full_name, bio")
		.eq("user_id", data.id)
		.single();

	return NextResponse.json({ id: data.id });
}
