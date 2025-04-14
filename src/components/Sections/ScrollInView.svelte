<script lang="ts">
	import { scrollInView } from '$lib/index.js';
	import { animate } from 'motion';
	import Code from '../Code/Code.svelte';
</script>

<section id="use-scroll-in-view">
	<h2 class="mb-8"><code class="code">use:scrollInView</code></h2>

	<p>
		Watch the progress of that element in viewport. <code class="code">use:scrollInView</code> is a shortcut
		for:
	</p>

	<Code code={`<div use:scroll={(node) => [/* ... */, { target: node }]} />`}></Code>

	<h3 class="mt-8">Example</h3>

	<div
		use:scrollInView={(node) => [
			animate(node, { scale: [0, 1, 0] }),
			{
				offset: ['0 1', '1 0']
			}
		]}
		style="background:#FFDC00;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold"
	>
		Ooh!
	</div>

	<Code
		code={`<div
	use:scrollInView={(node) => [
		animate(node, { scale: [0, 1, 0] }),
		{
			offset: ['0 1', '1 0']
		}
	]}
	style="background:#FFDC00;padding:16px;border-radius:16px;text-align:center;font-size:32px;font-weight:bold"
>
	Ooh!
</div>`}
	/>
</section>
