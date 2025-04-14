import bash from '@shikijs/langs-precompiled/bash';
import svelte from '@shikijs/langs-precompiled/svelte';
import typescript from '@shikijs/langs-precompiled/typescript';
import github_dark_default from '@shikijs/themes/github-dark-default';
import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRawEngine } from 'shiki/engine/javascript';

export const highlighter = createHighlighterCoreSync({
	themes: [github_dark_default],
	langs: [svelte, typescript, bash],
	engine: createJavaScriptRawEngine()
});

export const highlightCode = (code: string, lang = 'svelte') =>
	highlighter.codeToHtml(code, { lang, theme: 'github-dark-default' });
