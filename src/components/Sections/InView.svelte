<script lang="ts">
	import { inView } from '$lib/index.js';
	import { animate, spring } from 'motion';
	import Code from '../Code/Code.svelte';
</script>

<section>
	<h2><code>use:inView</code></h2>

	<blockquote>
		<a href="https://motion.dev/docs/inview" target="_blank" rel="nofollow noopener noreferrer"
			>https://motion.dev/docs/inview</a
		>
	</blockquote>

	<Code
		code={`<div use:inView={[() => console.log('InView!')]}>InView Basic</div>
<div use:inView={(node) => [() => console.log(node)]}>InView Node</div>
<div
	use:inView={[
		(el) => {
			animate(el, { opacity: [0, 1] });
		}
	]}
>
	InView Animation
</div>`}
	/>

	<h3>Example</h3>

	<div
		use:inView={[
			(el) => {
				animate(
					el,
					{ scale: [0, 1], opacity: [0, 1] },
					{
						type: spring,
						bounce: 0.3,
						duration: 1
					}
				);
			},
			{ amount: 1 }
		]}
		style="background:#FFDC00;color:#85144b;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold"
	>
		Hello!
	</div>

	<Code
		code={`<div
	use:inView={[
		(el) => {
			animate(
				el,
				{ scale: [0, 1], opacity: [0, 1] },
				{
					type: spring,
					bounce: 0.3,
					duration: 1
				}
			);
		},
		{ amount: 1 }
	]}
	style="background:#FFDC00;color:#85144b;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold"
>
	Hello!
</div>`}
	/>
</section>
