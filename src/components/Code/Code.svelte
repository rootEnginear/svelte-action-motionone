<script lang="ts">
	import { highlightCode } from './instance.js';

	export let code: string;
	export let lang = 'svelte';
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html highlightCode(code, lang)}
