<script lang="ts">
	import { inView } from '$lib/index.js';
	import { animate, spring } from 'motion';
	import Code from '../Code/Code.svelte';
</script>

<section>
	<h2 class="mb-8"><code class="code">use:inView</code></h2>

	<blockquote>
		<a href="https://motion.dev/docs/inview" target="_blank" rel="nofollow noopener noreferrer"
			>https://motion.dev/docs/inview</a
		>
	</blockquote>

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
		style="background:#FFDC00;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold"
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
	style="background:#FFDC00;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold"
>
	Hello!
</div>`}
	/>
</section>
