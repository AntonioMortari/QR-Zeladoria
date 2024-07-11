module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,html,png,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};