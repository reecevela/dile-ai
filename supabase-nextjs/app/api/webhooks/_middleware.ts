// app/api/webhooks/_middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const authHeader = request.headers.get("authorization");
	const expectedAuth = `Bearer ${process.env.BLAND_SECRET}`;

	if (!authHeader || authHeader !== expectedAuth) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
}

export const config = {
	matcher: "/api/webhooks/:path*",
};
