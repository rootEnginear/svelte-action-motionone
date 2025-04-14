<script lang="ts">
	import { containerScroll } from '$lib/index.js';
	import { dragscroll } from '@svelte-put/dragscroll';
	import { animate } from 'motion';
	import Code from '../Code/Code.svelte';
</script>

<section id="use-container-scroll">
	<h2 class="mb-8"><code class="code">use:containerScroll</code></h2>

	<p>
		Watch the scroll of that element. <code class="code">use:containerScroll</code> is a shortcut for:
	</p>

	<Code code={`<div use:scroll={(node) => [/* ... */, { container: node }]} />`}></Code>

	<h3 class="mt-8">Example</h3>

	<div
		use:containerScroll={(node) => [
			animate(node.children[0], {
				backgroundColor: ['#FF4136', '#FFDC00']
			}),
			{
				axis: 'x'
			}
		]}
		style="overflow-x:auto;user-select:none"
		use:dragscroll
	>
		<div style="width:max-content;padding:16px">
			<span style="font-weight:bold">Scroll Me! →</span> Lorem ipsum dolor sit amet consectetur, adipisicing
			elit. Incidunt provident odit voluptatibus magni quae autem unde sed libero voluptatum, et quibusdam
			tempore voluptas harum natus cum mollitia soluta perferendis ut.
		</div>
	</div>

	<Code
		code={`<div
	use:containerScroll={(node) => [
		animate(node.children[0], {
			backgroundColor: ['#FF4136', '#FFDC00']
		}),
		{
			axis: 'x'
		}
	]}
	style="overflow-x:auto;user-select:none"
>
	<div style="width:max-content;padding:16px">
		<span style="font-weight:bold">Scroll Me! →</span> Lorem ipsum dolor sit amet consectetur, adipisicing
		elit. Incidunt provident odit voluptatibus magni quae autem unde sed libero voluptatum, et quibusdam
		tempore voluptas harum natus cum mollitia soluta perferendis ut.
	</div>
</div>`}
	/>
</section>
