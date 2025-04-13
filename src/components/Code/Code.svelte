<script lang="ts">
	import { highlighter } from './instance.js';

	export let code: string;
	export let lang = 'svelte';

	$: highlightedCode = highlighter.codeToHtml(code, {
		lang,
		theme: 'github-dark-default'
	});
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html highlightedCode}
