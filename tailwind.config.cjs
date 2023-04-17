/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				serif: ['Boska', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
			}
		}
	},
	plugins: []
}
