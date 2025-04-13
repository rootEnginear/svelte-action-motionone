<script lang="ts">
	import { press } from '$lib/index.js';
	import { animate, spring } from 'motion';
	import Code from '../Code/Code.svelte';
</script>

<section>
	<h2><code>use:press</code></h2>

	<blockquote>
		<a href="https://motion.dev/docs/press" target="_blank" rel="nofollow noopener noreferrer"
			>https://motion.dev/docs/press</a
		>
	</blockquote>

	<Code
		code={`<div use:press={[() => console.log('Press!')]}>Press Basic</div>
<div use:press={(node) => [() => console.log(node)]}>Press Node</div>
<div
	use:press={[
		(el) => {
			animate(el, { scale: 0.9 });

			return () => animate(el, { scale: 1 });
		}
	]}
>
	Press Animation
</div>`}
	/>

	<h3>Example</h3>

	<div
		use:press={[
			(el) => {
				animate(el, { scale: 0.8 });
				return () => animate(el, { scale: 1 }, { type: spring, bounce: 0.6, duration: 0.5 });
			}
		]}
		style="background:#7FDBFF;color:#001f3f;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold;user-select:none"
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
	style="background:#7FDBFF;color:#001f3f;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold;user-select:none"
>
	Press me!
</div>`}
	/>
</section>
