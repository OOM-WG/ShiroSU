import { defineConfig } from 'vite-plus'

export default defineConfig({
	staged: { '*': 'vp check --fix' },
	fmt: {
		arrowParens: 'avoid',
		bracketSameLine: true,
		jsxSingleQuote: true,
		semi: false,
		sortImports: true,
		sortTailwindcss: true,
		trailingComma: 'none',
		ignorePatterns: ['*-lock.*', '*.lock']
	}
})