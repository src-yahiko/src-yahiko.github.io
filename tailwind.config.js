/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "rgb(40,40,40)",
				secondary: "rgb(235, 235, 235)",
			},
		},
	},
	plugins: [],
};
