// app/api/webhooks/[user_id]/notes/route.ts
import { adminSupabaseClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Updated type definition for route parameters
type RouteContext = {
	params: {
		user_id: string;
	};
};

export async function GET(
	request: NextRequest,
	context: RouteContext, // Updated parameter type
) {
	const { data, error } = await adminSupabaseClient
		.from("notes")
		.select("*")
		.eq("user_id", context.params.user_id)
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
	context: RouteContext, // Updated parameter type
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
				user_id: context.params.user_id,
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
