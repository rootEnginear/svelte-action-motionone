<script lang="ts">
	import { createAction, inView, inViewAnimation, scroll, scrollAnimation } from '$lib/index.js';
	import { stagger } from 'motion';

	let isInScreen = false;
	let scrollY = 0;

	const viewBlurFade = createAction(inViewAnimation, {
		animate: {
			keyframes: {
				opacity: [0, 1],
				transform: ['translateY(10px)', 'translateY(0px)'],
				filter: ['blur(20px)', 'blur(0px)']
			},
			options: {
				duration: 0.5,
				easing: [0.22, 1, 0.36, 1]
			}
		},
		options: {
			amount: 1
		},
		repeat: true
	});
</script>

<div
	style="position:fixed;height:16px;background:blue;top:0;left:0;z-index:10"
	use:scrollAnimation={{
		animate: {
			keyframes: {
				width: ['0%', '100%']
			}
		}
	}}
></div>
<div style="height:100svh">Scroll down!</div>
<h1
	use:inView={{
		onStart: () => {
			isInScreen = true;

			return () => {
				isInScreen = false;
			};
		},
		options: {
			amount: 1
		}
	}}
>
	{#if isInScreen}
		<span>HELLO POGGERS!</span>
	{:else}
		<span>I'm out of your view</span>
	{/if}
</h1>
<p
	use:scroll={{
		onScroll: (info) => {
			scrollY = info.y.progress;
		}
	}}
>
	Your scroll position is: {scrollY}
</p>
<p
	style="background-color:red;height:100svh;"
	use:scrollAnimation={{
		animate: {
			keyframes: {
				opacity: [0, 1]
			}
		},
		options: {
			offset: ['0 1', '0 0']
		}
	}}
>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<h1
	use:inViewAnimation={{
		animate: {
			elements: '&>span',
			keyframes: {
				opacity: [0, 1]
			},
			options: {
				duration: 1,
				delay: stagger(0.1)
			}
		}
	}}
>
	Welcome to your library project<span>001</span><span>002</span><span>003</span><span>004</span
	><span>005</span><span>006</span><span>007</span><span>008</span><span>009</span>
</h1>
<h1 use:viewBlurFade>Hello Welcome</h1>
<h1 use:viewBlurFade>Hello Welcome</h1>
<div style="height:100svh">Scroll down!</div>
