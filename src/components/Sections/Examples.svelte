<script lang="ts">
	import { containerScroll, inView } from '$lib/index.js';
	import { dragscroll } from '@svelte-put/dragscroll';
	import { animate, spring, stagger } from 'motion';
	import Code from '../Code/Code.svelte';

	let enabled = true;
</script>

<section id="more-examples">
	<h2>More Examples</h2>

	<h3 id="staggered-animation">Staggered Animation</h3>

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

	<h3 id="timeline-sequences" class="mt-8">Timeline Sequences</h3>

	<blockquote>
		<a
			href="https://motion.dev/docs/animate#timeline-sequences"
			target="_blank"
			rel="nofollow noopener noreferrer">https://motion.dev/docs/animate#timeline-sequences</a
		>
	</blockquote>

	<div
		style="display:flex;gap:8px"
		use:inView={[
			(el) => {
				const children = [...el.children];

				animate([
					[children[0], { y: [100, 0], opacity: [0, 100] }, { duration: 0.5, at: '-0.3' }],
					[children[1], { rotate: [90, 0], opacity: [0, 100] }, { duration: 0.5, at: '-0.3' }],
					[children[2], { x: [-100, 0], opacity: [0, 100] }, { duration: 0.5, at: '-0.3' }],
					[children[3], { scale: [0, 1], opacity: [0, 100] }, { duration: 0.5, at: '-0.3' }]
				]);
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
			const children = [...el.children];

			animate([
				[children[0], { y: [100, 0], opacity: [0, 100] }, { duration: 0.5, at: '-0.3' }],
				[children[1], { rotate: [90, 0], opacity: [0, 100] }, { duration: 0.5, at: '-0.3' }],
				[children[2], { x: [-100, 0], opacity: [0, 100] }, { duration: 0.5, at: '-0.3' }],
				[children[3], { scale: [0, 1], opacity: [0, 100] }, { duration: 0.5, at: '-0.3' }]
			]);
		}
	]}
>
	<div style="height:64px;flex:1 1 0%;min-width:0;background:#FF4136"></div>
	<div style="height:64px;flex:1 1 0%;min-width:0;background:#FF851B"></div>
	<div style="height:64px;flex:1 1 0%;min-width:0;background:#FFDC00"></div>
	<div style="height:64px;flex:1 1 0%;min-width:0;background:#2ECC40"></div>
</div>`}
	/>

	<h3 id="enable-disable-animation" class="mt-8">Enable/Disable Animation</h3>

	<label><input type="checkbox" bind:checked={enabled} /> Enable Animation</label>

	<div
		use:containerScroll={enabled
			? (node) => [
					animate(node.children[1], {
						rotate: [0, 360],
						x: ['-50%', '-50%'],
						y: ['-50%', '-50%']
					}),
					{
						axis: 'x'
					}
				]
			: [() => {}]}
		style="overflow-x:auto;user-select:none;position:relative"
		use:dragscroll
	>
		<div style="width:200%;height:96px" />
		<div
			style="position:absolute;width:64px;height:64px;background:#FF4136;border-radius:16px;left:100%;top:50%"
		/>
	</div>

	<Code
		code={`<\script>
	let enabled = true;
</script>

<label><input type="checkbox" bind:checked={enabled} /> Enable Animation</label>

<div
	use:containerScroll={enabled
		? (node) => [
				animate(node.children[1], {
					rotate: [0, 360],
					x: ['-50%', '-50%'],
					y: ['-50%', '-50%']
				}),
				{
					axis: 'x'
				}
			]
		: [() => {}]}
	style="overflow-x:auto;user-select:none;position:relative"
>
	<div style="width:200%;height:96px" />
	<div
		style="position:absolute;width:64px;height:64px;background:#FF4136;border-radius:16px;left:100%;top:50%"
	/>
</div>`}
	/>

	<p class="mt-8">You can use this to change/disable the animation to user preference.</p>

	<Code
		code={`<\script lang="ts">
	import { onMount } from 'svelte';

	let isUserPreferringReducedMotion = true;

	onMount(() => {
		window.matchMedia('(prefers-reduced-motion)').addEventListener('change', (e) => {
			isUserPreferringReducedMotion = e.matches;
		});
	});
</script>

<!-- Use \`isUserPreferringReducedMotion\` to conditionally enable animation -->`}
	/>
</section>
