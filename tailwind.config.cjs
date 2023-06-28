const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#d1c1d7',
					secondary: '#f6cbd1',
					accent: '#b4e9d6',
					neutral: '#70acc7',
					'base-100': '#ffffff',
					info: '#3abff8',
					success: '#36d399',
					warning: '#fbbd23',
					error: '#f87272'
				}
			}
		]
	},

	plugins: [require('daisyui'), require('flowbite/plugin')],
	daisyui: {
		themes: ['pastel']
	}
};

module.exports = config;
