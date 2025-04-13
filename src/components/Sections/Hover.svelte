<script lang="ts">
	import { hover } from '$lib/index.js';
	import { animate, spring } from 'motion';
	import Code from '../Code/Code.svelte';
</script>

<section>
	<h2><code>use:hover</code></h2>

	<blockquote>
		<a href="https://motion.dev/docs/hover" target="_blank" rel="nofollow noopener noreferrer"
			>https://motion.dev/docs/hover</a
		>
	</blockquote>

	<Code
		code={`<div use:hover={[() => console.log('Hover!')]}>Hover Basic</div>
<div use:hover={(node) => [() => console.log(node)]}>Hover Node</div>
<div
	use:hover={[
		(el) => {
			animate(el, { scale: 0.9 });

			return () => animate(el, { scale: 1 });
		}
	]}
>
	Hover Animation
</div>`}
	/>

	<h3>Example</h3>

	<div
		use:hover={[
			(el) => {
				animate(el, { scale: 0.8 }, { type: spring, bounce: 0.6, duration: 0.5 });
				return () => animate(el, { scale: 1 }, { type: spring, bounce: 0.6, duration: 0.5 });
			}
		]}
		style="background:#01FF70;color:#001f3f;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold;user-select:none"
	>
		Hover me please!
	</div>

	<Code
		code={`<div
	use:hover={[
		(el) => {
			animate(el, { scale: 0.8 }, { type: spring, bounce: 0.6, duration: 0.5 });
			return () => animate(el, { scale: 1 }, { type: spring, bounce: 0.6, duration: 0.5 });
		}
	]}
	style="background:#01FF70;color:#001f3f;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold;user-select:none"
>
	Hover me please!
</div>`}
	/>
</section>
