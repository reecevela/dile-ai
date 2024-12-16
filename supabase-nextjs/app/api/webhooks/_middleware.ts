// app/api/webhooks/_middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const authHeader = request.headers.get("authorization");
	const expectedAuth = `Bearer ${process.env.BLAND_SECRET}`;

	if (!authHeader || authHeader !== expectedAuth) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	// Important: Return NextResponse.next() to allow the request to continue
	return NextResponse.next();
}

// Update the matcher to be more specific about HTTP methods
export const config = {
	matcher: [
		{
			source: "/api/webhooks/:path*",
			methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		},
	],
};
