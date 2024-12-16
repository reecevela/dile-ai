// lib/auth.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function checkAuthorization() {
	const headersList = await headers();
	const authHeader = headersList.get("authorization");
	const expectedAuth = `Bearer ${process.env.BLAND_SECRET}`;

	if (!authHeader || authHeader !== expectedAuth) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	return null; // Auth successful
}
