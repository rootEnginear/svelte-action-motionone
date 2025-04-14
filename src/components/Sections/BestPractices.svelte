<script lang="ts">
	import Code from '../Code/Code.svelte';
</script>

<section id="best-practices">
	<h2>Best Practices</h2>

	<p>
		To improve code readability, you can extract animation options into a file somewhere in your
		utils or as a const in the script section, then reusing them in the template. This will help you
		to avoid animation options plaguing in the template.
	</p>

	<p style="margin-top:-4px">
		If you are using TypeScript, you can import <code class="code">InViewActionParams</code>,
		<code class="code">ScrollActionParams</code>, <code class="code">HoverActionParams</code> and
		<code class="code">PressActionParams</code> to type your option object.
	</p>

	<Code
		code={`<\script lang="ts">
	import { inView, type InViewActionParams } from '@rootenginear/svelte-action-motionone';
	import { animate } from 'motion';

	const fadeInView = [
		(el) => {
			animate(el, { opacity: [0, 1] });
		},
		{ amount: 1 }
	] satisfies InViewActionParams;
</script>

<div
	use:inView={fadeInView}
	style="background:#FFDC00;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold"
>
	Hello!
</div>`}
	/>

	<p class="mt-8">
		<strong>Gotcha:</strong> If your animation option is reactive, meaning that you will
		enable/disable it or switch to other animation, it should be in a
		<a
			href="https://svelte.dev/docs/svelte/legacy-reactive-assignments"
			target="_blank"
			rel="nofollow noopener noreferrer">reactive statement</a
		>
		(or Svelte 5
		<a
			href="https://svelte.dev/docs/svelte/$derived"
			target="_blank"
			rel="nofollow noopener noreferrer"><code class="code">$derived</code></a
		>).
	</p>

	<Code
		code={`<\script lang="ts">
	import { inView, type InViewActionParams } from '@rootenginear/svelte-action-motionone';
	import { animate } from 'motion';
	import { onMount } from 'svelte';

	let isUserPreferringReducedMotion = true;

	onMount(() => {
		window.matchMedia('(prefers-reduced-motion)').addEventListener('change', (e) => {
			isUserPreferringReducedMotion = e.matches;
		});
	});

	$: fadeInView = (
		isUserPreferringReducedMotion
			? [() => {}]
			: [
					(el) => {
						animate(el, { opacity: [0, 1] });
					},
					{ amount: 1 }
				]
	) satisfies InViewActionParams;
</script>

<div
	use:inView={fadeInView}
	style="background:#FFDC00;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold"
>
	Hello!
</div>
`}
	/>
</section>
