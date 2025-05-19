import bash from '@shikijs/langs/bash';
import svelte from '@shikijs/langs/svelte';
import typescript from '@shikijs/langs/typescript';
import github_dark_default from '@shikijs/themes/github-dark-default';
import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

export const highlighter = createHighlighterCoreSync({
	themes: [github_dark_default],
	langs: [svelte, typescript, bash],
	engine: createJavaScriptRegexEngine({
		target: 'ES2018'
	})
});

export const highlightCode = (code: string, lang = 'svelte') =>
	highlighter.codeToHtml(code, { lang, theme: 'github-dark-default' });
