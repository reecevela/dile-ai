import { NextResponse, type NextRequest } from "next/server";

export async function authorize(request: NextRequest) {
	// authorization totally fucked atm
	if (
		request.headers.get("authorization") &&
		request.headers.get("authorization") ===
			`Bearer ${process.env.BLAND_SECRET}`
	) {
		return NextResponse.json(
			{
				error: "Unauthorized",
			},
			{
				status: 401,
			},
		);
	}

	if (!request.headers.has("x-webhook-signature")) {
		return NextResponse.json(
			{
				error: "Unauthorized",
			},
			{
				status: 401,
			},
		);
	}

	return NextResponse.next({
		request,
	});
}
