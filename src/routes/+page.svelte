<script lang="ts">
	import type { ScrollAnimationActionOptions } from '$lib/index.js';
	import { createAction, inView, inViewAnimation, scroll, scrollAnimation } from '$lib/index.js';
	import { stagger } from 'motion';
	import { onMount } from 'svelte';

	let isInScreen = false;
	let scrollPercentage = 0;
	let reducedMotion = true;

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
		repeat: true,
		onMount: (node) => {
			node.classList.add('opacity-0');
		}
	});

	$: parallaxOptions = {
		animate: {
			keyframes: {
				transform: ['translateY(10%)', 'translateY(-10%)']
			}
		},
		options: {
			target: '&',
			offset: ['0 1', '1 0']
		},
		enabled: !reducedMotion
	} satisfies ScrollAnimationActionOptions;

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion)').matches;
	});

	let elParent: HTMLElement;
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
<div bind:this={elParent}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		width="120"
		height="120"
		use:scrollAnimation={{
			animate: {
				keyframes: {
					transform: ['rotate(0deg)', 'rotate(180deg)']
				},
				options: {
					easing: 'linear'
				}
			},
			options: {
				target: elParent,
				offset: ['start end', 'end start']
			}
		}}
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
		/>
	</svg>
</div>
<p
	use:scroll={{
		onScroll: (info) => {
			scrollPercentage = Math.round(info.y.progress * 100);
		}
	}}
>
	Your scroll position is: {scrollPercentage}%
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
			target: '&',
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
<img
	src="https://picsum.photos/300/200"
	alt=""
	width="300"
	height="200"
	loading="eager"
	decoding="async"
	use:scrollAnimation={parallaxOptions}
/>
<div style="height:100svh">Scroll down!</div>
