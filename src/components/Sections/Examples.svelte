<script lang="ts">
	import { inView } from '$lib/index.js';
	import { animate, spring, stagger } from 'motion';
	import Code from '../Code/Code.svelte';
</script>

<section>
	<h2>More Examples</h2>

	<h3>Staggered Animation</h3>

	<blockquote>
		<a href="https://motion.dev/docs/stagger" target="_blank" rel="nofollow noopener noreferrer"
			>https://motion.dev/docs/stagger</a
		>
	</blockquote>

	<div
		style="display:flex;gap:8px"
		use:inView={[
			(el) => {
				animate(
					[...el.children],
					{ scale: [0, 1] },
					{ duration: 0.5, delay: stagger(0.2), type: spring, bounce: 0.3 }
				);
			}
		]}
	>
		<div style="height:64px;flex:1 1 0%;min-width:0;background:#FF4136"></div>
		<div style="height:64px;flex:1 1 0%;min-width:0;background:#FF851B"></div>
		<div style="height:64px;flex:1 1 0%;min-width:0;background:#FFDC00"></div>
		<div style="height:64px;flex:1 1 0%;min-width:0;background:#2ECC40"></div>
	</div>

	<Code
		code={`<div
	style="display:flex;gap:8px"
	use:inView={[
		(el) => {
			animate(
				[...el.children],
				{ scale: [0, 1] },
				{ duration: 0.5, delay: stagger(0.2), type: spring, bounce: 0.3 }
			);
		}
	]}
>
	<div style="height:64px;flex:1 1 0%;min-width:0;background:#FF4136"></div>
	<div style="height:64px;flex:1 1 0%;min-width:0;background:#FF851B"></div>
	<div style="height:64px;flex:1 1 0%;min-width:0;background:#FFDC00"></div>
	<div style="height:64px;flex:1 1 0%;min-width:0;background:#2ECC40"></div>
</div>`}
	/>
</section>
