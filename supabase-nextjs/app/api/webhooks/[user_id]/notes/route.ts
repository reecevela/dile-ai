import { adminSupabaseClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { checkAuthorization } from "@/lib/auth";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ user_id: string }> },
) {
	const authResponse = await checkAuthorization();
	if (authResponse) return authResponse;
	const { user_id } = await params;
	const { data, error } = await adminSupabaseClient
		.from("notes")
		.select("*")
		.eq("user_id", user_id)
		.order("created_at", { ascending: false });

	if (error) {
		return NextResponse.json(
			{ error: "Failed to fetch notes" },
			{ status: 500 },
		);
	}

	return NextResponse.json({ notes: data });
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ user_id: string }> },
) {
	try {
		const authResponse = await checkAuthorization();
		if (authResponse) return authResponse;
		const { user_id } = await params;
		const { title, message } = await request.json();
		if (!title || !message) {
			return NextResponse.json(
				{ error: "Title and message are required" },
				{ status: 400 },
			);
		}

		const { data, error } = await adminSupabaseClient
			.from("notes")
			.insert({
				user_id: user_id,
				title,
				content: message,
			})
			.select()
			.single();

		if (error) {
			console.error("Error creating note:", error);
			return NextResponse.json(
				{ error: "Failed to create note" },
				{ status: 500 },
			);
		}

		return NextResponse.json({ note: data });
	} catch (error) {
		console.error("Error creating note:", error);
		return NextResponse.json(
			{ error: "Invalid request body" },
			{ status: 400 },
		);
	}
}
