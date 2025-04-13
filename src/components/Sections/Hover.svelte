<script lang="ts">
	import { hover } from '$lib/index.js';
	import { animate, spring } from 'motion';
	import Code from '../Code/Code.svelte';
</script>

<section>
	<h2 class="mb-8"><code class="code">use:hover</code></h2>

	<blockquote>
		<a href="https://motion.dev/docs/hover" target="_blank" rel="nofollow noopener noreferrer"
			>https://motion.dev/docs/hover</a
		>
	</blockquote>

	<div
		use:hover={[
			(el) => {
				animate(el, { scale: 0.8 }, { type: spring, bounce: 0.6, duration: 0.5 });
				return () => animate(el, { scale: 1 }, { type: spring, bounce: 0.6, duration: 0.5 });
			}
		]}
		style="background:#FF4136;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold;user-select:none"
	>
		Hover me!
	</div>

	<Code
		code={`<div
	use:hover={[
		(el) => {
			animate(el, { scale: 0.8 }, { type: spring, bounce: 0.6, duration: 0.5 });
			return () => animate(el, { scale: 1 }, { type: spring, bounce: 0.6, duration: 0.5 });
		}
	]}
	style="background:#FF4136;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold;user-select:none"
>
	Hover me!
</div>`}
	/>
</section>
