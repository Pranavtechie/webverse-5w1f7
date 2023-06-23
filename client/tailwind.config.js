/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	daisyui: {
		themes: [
		  {
			mytheme: {
			
   "primary": "#2dd4bf",
			
   "secondary": "#6dc643",
			
   "accent": "#c084fc",
			
   "neutral": "#a78bfa",
			
   "base-100": "#1D232A",
			
   "info": "#6097d2",
			
   "success": "#179281",
			
   "warning": "#e89230",
			
   "error": "#f55659",
			},
		  },
		],
	  },
	  
  
  
	plugins: [require("daisyui")],
};
