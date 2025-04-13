<script lang="ts">
	import 'shiki-magic-move/dist/style.css';
	import { highlighter } from '../Code/instance.js';
	import ShikiMagicMove from './ShikiMagicMove.svelte';

	const EXAMPLES = [
		{
			lang: 'ts',
			code: `inView(elementOrSelector, onStart, options)
press(elementOrSelector, onPressStart, options)
hover(elementOrSelector, onHoverStart, options)
scroll(onScroll, options)`
		},
		{
			lang: 'svelte',
			code: `<div use:inView={[onStart, options]} />
<div use:press={[onPressStart, options]} />
<div use:hover={[onHoverStart, options]} />
<div use:scroll={[onScroll, options]} />`
		},
		{
			lang: 'svelte',
			code: `<div use:inView={(node) => [onStart, options]} />
<div use:press={(node) => [onPressStart, options]} />
<div use:hover={(node) => [onHoverStart, options]} />
<div use:scroll={(node) => [onScroll, options]} />`
		}
	];

	let index = 0;
</script>

{#await highlighter then highlighter}
	<div style="display:flex;gap:8px">
		<button
			type="button"
			style="flex:1 1 0%;min-width:0"
			on:click={() => {
				index = 0;
			}}>Motion's API</button
		>
		<button
			type="button"
			style="flex:1 1 0%;min-width:0"
			on:click={() => {
				index = 1;
			}}>Motion as Action</button
		>
		<button
			type="button"
			style="flex:1 1 0%;min-width:0"
			on:click={() => {
				index = 2;
			}}>Get Action's Node</button
		>
	</div>
	<ShikiMagicMove
		theme="github-dark-default"
		{highlighter}
		{...EXAMPLES[index]}
		options={{ duration: 500 }}
	/>
{/await}
