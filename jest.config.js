module.exports = {
	preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
	moduleFileExtensions: [
		'js',
		'json',
		'vue',
		'ts',
		'd.ts', // important af
	],
	"transform": {
		'.*\\.js$':'babel-jest',
		".*\\.(vue)$": "vue-jest"
	},
	moduleNameMapper: {
		"@/(.*)": "<rootDir>/src/$1",
	},
	testEnvironment: 'jsdom'
};