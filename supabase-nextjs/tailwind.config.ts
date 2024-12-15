import type { Config } from "tailwindcss";

const forest = {
	background: "#0A0F0D",
	surface: "#0F1A13",
	primary: {
		light: "#3D7A37",
		DEFAULT: "#2D5A27",
		dark: "#1D3A17",
	},
	secondary: {
		light: "#9CC379",
		DEFAULT: "#8CB369",
		dark: "#7CA359",
	},
	cream: {
		DEFAULT: "#F2E9E4",
		dark: "#E2D9D4",
	},
};

const emerald = {
	background: "#0C1618",
	surface: "#111B1D",
	primary: {
		light: "#105B59",
		DEFAULT: "#004B49",
		dark: "#003B39",
	},
	secondary: {
		light: "#10958D",
		DEFAULT: "#00857D",
		dark: "#00756D",
	},
	cream: {
		DEFAULT: "#F0F7F4",
		dark: "#E0E7E4",
	},
};

const sage = {
	background: "#0D1211",
	surface: "#131917",
	primary: {
		light: "#2B5342",
		DEFAULT: "#1B4332",
		dark: "#0B3322",
	},
	secondary: {
		light: "#62897F",
		DEFAULT: "#52796F",
		dark: "#42695F",
	},
	cream: {
		DEFAULT: "#F8F9FA",
		dark: "#E8E9EA",
	},
};

const mint = {
	background: "#0B0F0E",
	surface: "#101615",
	primary: {
		light: "#1D604C",
		DEFAULT: "#0D503C",
		dark: "#0D402C",
	},
	secondary: {
		light: "#4C9C8C",
		DEFAULT: "#3C8C7C",
		dark: "#2C7C6C",
	},
	cream: {
		DEFAULT: "#EFF6F3",
		dark: "#DFE6E3",
	},
};

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: mint,
		},
	},
	plugins: [],
} satisfies Config;
