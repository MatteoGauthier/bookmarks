const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	mode: "jit",
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				satoshi: ["'Satoshi'", ...defaultTheme.fontFamily.sans],
			},
			fontSize: {
				52: "3.25rem",
			},
			letterSpacing: {
				1: "-0.01em",
			},
		},
	},
	variants: {
		extend: {
			ringOpacity: ["hover", "active"],
		},
	},
	plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
	presets: [require("tw-utils/font/inter")],
};
