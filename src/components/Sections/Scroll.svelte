<script lang="ts">
	import { scroll } from '$lib/index.js';
	import { animate } from 'motion';
	import Code from '../Code/Code.svelte';
</script>

<section>
	<h2><code>use:scroll</code></h2>

	<blockquote>
		<a href="https://motion.dev/docs/scroll" target="_blank" rel="nofollow noopener noreferrer"
			>https://motion.dev/docs/scroll</a
		>
	</blockquote>

	<Code
		code={`<div
	use:scroll={(node) => [
		animate(node, { transform: ['scaleX(0)', 'scaleX(1)'] }, { ease: 'linear' })
	]}
	style="position:fixed;top:0;left:0;width:100%;height:4px;z-index:50;background:#FF4136;transform-origin:left"
/>`}
	/>

	<div
		use:scroll={(node) => [
			animate(node, { transform: ['scaleX(0)', 'scaleX(1)'] }, { ease: 'linear' })
		]}
		style="position:fixed;top:0;left:0;width:100%;height:4px;z-index:50;background:#FF4136;transform-origin:left"
	/>

	<p>You can see the example at the top of the page (the progress bar!)</p>
</section>
