<script>
	import Code from '../Code/Code.svelte';
</script>

<header>
	<h1 style="display:flex;flex-direction:column;user-select:all">
		<span>@rootenginear/</span><span>svelte-action-motionone</span>
	</h1>

	<div style="display:flex;gap:8px">
		<a
			href="https://www.npmjs.com/package/@rootenginear/svelte-action-motionone"
			target="_blank"
			rel="nofollow noopener noreferrer"
		>
			<img
				src="https://img.shields.io/npm/v/%40rootenginear%2Fsvelte-action-motionone?logo=npm&logoColor=%23CB3837&color=%23CB3837"
				alt="npm"
			/>
		</a>
		<a
			href="https://jsr.io/@rootenginear/svelte-action-motionone"
			target="_blank"
			rel="nofollow noopener noreferrer"
		>
			<img
				src="https://img.shields.io/jsr/v/%40rootenginear%2Fsvelte-action-motionone?logo=jsr&color=%23F7DF1E"
				alt="jsr"
			/>
		</a>
	</div>

	<p>
		Unofficial <a
			href="https://svelte.dev/docs/svelte-action"
			target="_blank"
			rel="nofollow noopener noreferrer">Svelte Action</a
		>
		for
		<a href="https://motion.dev/" target="_blank" rel="nofollow noopener noreferrer">Motion One</a> animation
		library
	</p>

	<Code lang="bash" code="npm install @rootenginear/svelte-action-motionone" />
	<Code lang="bash" code="deno add jsr:@rootenginear/svelte-action-motionone" />
</header>
