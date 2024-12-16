// app/api/webhooks/[user_id]/notes/route.ts
import { adminSupabaseClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { user_id: string } },
) {
	const { data, error } = await adminSupabaseClient
		.from("notes")
		.select("*")
		.eq("user_id", params.user_id)
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
	{ params }: { params: { user_id: string } },
) {
	try {
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
				user_id: params.user_id,
				title,
				content: message,
			})
			.select()
			.single();

		if (error) {
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
