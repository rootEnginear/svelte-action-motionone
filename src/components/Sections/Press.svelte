<script lang="ts">
	import { press } from '$lib/index.js';
	import { animate, spring } from 'motion';
	import Code from '../Code/Code.svelte';
</script>

<section>
	<h2 class="mb-8"><code class="code">use:press</code></h2>

	<blockquote>
		<a href="https://motion.dev/docs/press" target="_blank" rel="nofollow noopener noreferrer"
			>https://motion.dev/docs/press</a
		>
	</blockquote>

	<div
		use:press={[
			(el) => {
				animate(el, { scale: 0.8 });
				return () => animate(el, { scale: 1 }, { type: spring, bounce: 0.6, duration: 0.5 });
			}
		]}
		style="background:#FFDC00;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold;user-select:none"
	>
		Press me!
	</div>

	<Code
		code={`<div
	use:press={[
		(el) => {
			animate(el, { scale: 0.8 });
			return () => animate(el, { scale: 1 }, { type: spring, bounce: 0.6, duration: 0.5 });
		}
	]}
	style="background:#FFDC00;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold;user-select:none"
>
	Press me!
</div>`}
	/>
</section>
