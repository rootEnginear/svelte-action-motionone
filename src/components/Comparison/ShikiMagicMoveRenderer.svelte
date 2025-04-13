<script lang="ts">
	import { MagicMoveRenderer } from 'shiki-magic-move/renderer';
	import type { KeyedTokensInfo, MagicMoveRenderOptions } from 'shiki-magic-move/types';

	export let clazz: string = '';
	export let animate: boolean = true;
	export let tokens: KeyedTokensInfo;
	export let previous: KeyedTokensInfo | undefined = undefined;
	export let options: MagicMoveRenderOptions | undefined = undefined;
	export let onStart: (() => void) | undefined = undefined;
	export let onEnd: (() => void) | undefined = undefined;

	let container: HTMLPreElement;
	let renderer: MagicMoveRenderer;
	let isMounted = false;

	$: if (container) {
		container.innerHTML = '';
		isMounted = true;
		renderer = new MagicMoveRenderer(container);
	}

	$: {
		async function render() {
			if (!renderer) return;
			Object.assign(renderer.options, options);
			if (animate) {
				if (previous) renderer.replace(previous);
				onStart?.();
				await renderer.render(tokens);
				onEnd?.();
			} else {
				renderer.replace(tokens);
			}
		}
		render();
	}
</script>

<pre bind:this={container} class="shiki-magic-move-container {clazz}" {...$$restProps}>
  <!-- render initial tokens for SSR -->
  {#if !isMounted}
		{#each tokens.tokens as token (token.key)}
			{#if token.content === '\n'}
				<br />
			{/if}
      <span
				class="shiki-magic-move-item"
				style:color={token.color}
				style={Object.entries(token.htmlStyle ?? {})
					.map(([k, v]) => `${k}:${v}`)
					.join(';')}>
        {token.content}
      </span>
		{/each}
	{/if}
</pre>
