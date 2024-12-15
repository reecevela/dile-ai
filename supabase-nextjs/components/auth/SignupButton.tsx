"use client";

import Button from "../ui/Button";

export const SignupButton = () => {
	return (
		<Button
			variant="primary"
			onClick={() => {
				window.location.href = "/login";
			}}
		>
			Log In
		</Button>
	);
};
