"use client";

import Button from "../ui/Button";

export const LoginButton = () => {
	return (
		<Button
			variant="secondary"
			onClick={() => {
				window.location.href = "/login";
			}}
		>
			Log In
		</Button>
	);
};
