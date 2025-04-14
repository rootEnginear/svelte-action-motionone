<script lang="ts">
	import Code from '../Code/Code.svelte';
</script>

<section id="the-idea">
	<h2>The Idea</h2>

	<p class="mb-8">
		Basically it's the same for Motion, just omit the node and passing other parameters as an array.
	</p>

	<h3>Motion's API:</h3>

	<Code
		lang="typescript"
		code={`inView(elementOrSelector, onStart, options)
press(elementOrSelector, onPressStart, options)
hover(elementOrSelector, onHoverStart, options)
scroll(onScroll, options)`}
	/>

	<h3 class="mt-8">svelte-action-motionone</h3>

	<Code
		code={`<div use:inView={[onStart, options]} />
<div use:press={[onPressStart, options]} />
<div use:hover={[onHoverStart, options]} />
<div use:scroll={[onScroll, options]} />`}
	/>

	<p class="mt-8 mb-8">
		You can also pass other parameters as a function that accepts <code class="code">node</code> as
		an argument. You can use <code class="code">node</code> to reference the action's DOM node.
	</p>

	<Code
		code={`<div use:inView={(node) => [onStart, options]} />
<div use:press={(node) => [onPressStart, options]} />
<div use:hover={(node) => [onHoverStart, options]} />
<div use:scroll={(node) => [onScroll, options]} />`}
	/>

	<p class="mt-8"><strong>Compatibility:</strong> Svelte 4, Motion 12</p>
</section>
