import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

export const highlighter = await createHighlighterCore({
	themes: [import('shiki/themes/github-dark-default.mjs')],
	langs: [
		import('shiki/langs/svelte.mjs'),
		import('shiki/langs/typescript.mjs'),
		import('shiki/langs/bash.mjs')
	],
	engine: createJavaScriptRegexEngine()
});
