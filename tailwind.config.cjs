const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [require('@tailwindcss/typography')],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans]
			},
			typography: ({ theme }) => ({
				neutral: {
					css: {
						'--tw-prose-body': theme('colors.neutral[800]'),
						'--tw-prose-headings': theme('colors.neutral[900]'),
						'--tw-prose-lead': theme('colors.neutral[700]'),
						'--tw-prose-links': theme('colors.emerald[600]'),
						'--tw-prose-bold': theme('colors.neutral[900]'),
						'--tw-prose-counters': theme('colors.neutral[600]'),
						'--tw-prose-bullets': theme('colors.neutral[400]'),
						'--tw-prose-hr': theme('colors.neutral[300]'),
						'--tw-prose-quotes': theme('colors.neutral[900]'),
						'--tw-prose-quote-borders': theme('colors.neutral[300]'),
						'--tw-prose-captions': theme('colors.neutral[700]'),
						'--tw-prose-code': theme('colors.neutral[900]'),
						'--tw-prose-pre-code': theme('colors.neutral[100]'),
						'--tw-prose-pre-bg': theme('colors.neutral[900]'),
						'--tw-prose-th-borders': theme('colors.neutral[300]'),
						'--tw-prose-td-borders': theme('colors.neutral[200]'),
						'--tw-prose-invert-body': theme('colors.neutral[200]'),
						'--tw-prose-invert-headings': theme('colors.white'),
						'--tw-prose-invert-lead': theme('colors.neutral[300]'),
						'--tw-prose-invert-links': theme('colors.emerald[400]'),
						'--tw-prose-invert-bold': theme('colors.white'),
						'--tw-prose-invert-counters': theme('colors.neutral[400]'),
						'--tw-prose-invert-bullets': theme('colors.neutral[600]'),
						'--tw-prose-invert-hr': theme('colors.neutral[700]'),
						'--tw-prose-invert-quotes': theme('colors.neutral[100]'),
						'--tw-prose-invert-quote-borders': theme('colors.neutral[700]'),
						'--tw-prose-invert-captions': theme('colors.neutral[400]'),
						'--tw-prose-invert-code': theme('colors.white'),
						'--tw-prose-invert-pre-code': theme('colors.neutral[300]'),
						'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
						'--tw-prose-invert-th-borders': theme('colors.neutral[600]'),
						'--tw-prose-invert-td-borders': theme('colors.neutral[700]')
					}
				}
			})
		}
	}
};
