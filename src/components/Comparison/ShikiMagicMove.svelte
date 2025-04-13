<script lang="ts">
	import { codeToKeyedTokens, createMagicMoveMachine } from 'shiki-magic-move/core';
	import type { MagicMoveDifferOptions, MagicMoveRenderOptions } from 'shiki-magic-move/types';
	import type { HighlighterCore } from 'shiki/core';
	import ShikiMagicMoveRenderer from './ShikiMagicMoveRenderer.svelte';

	export let highlighter: HighlighterCore;
	export let lang: string;
	export let theme: string;
	export let code: string;
	export let options: (MagicMoveRenderOptions & MagicMoveDifferOptions) | undefined = undefined;
	export let onStart: (() => void) | undefined = undefined;
	export let onEnd: (() => void) | undefined = undefined;
	export let clazz: string = '';
	export let tabindex: number | undefined = undefined;

	const machine = createMagicMoveMachine(
		(code) => codeToKeyedTokens(highlighter, code, { lang, theme }, options?.lineNumbers),
		options
	);
	$: result = machine.commit(code);
</script>

<ShikiMagicMoveRenderer
	tokens={result.current}
	previous={result.previous}
	{options}
	{onStart}
	{onEnd}
	{clazz}
	{tabindex}
/>
