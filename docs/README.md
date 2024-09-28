# @rootenginear/svelte-action-motionone

[![npm](https://img.shields.io/npm/v/%40rootenginear%2Fsvelte-action-motionone?logo=npm&logoColor=%23CB3837&color=%23CB3837)](https://www.npmjs.com/package/@rootenginear/svelte-action-motionone) [![jsr](https://img.shields.io/jsr/v/%40rootenginear/svelte-action-motionone?logo=jsr&color=%23F7DF1E)](https://jsr.io/@rootenginear/svelte-action-motionone)

Unofficial [Svelte Action](https://svelte.dev/docs/svelte-action) for [Motion One](https://motion.dev/) animation library

```bash
npm install @rootenginear/svelte-action-motionone
```

```bash
deno add jsr:@rootenginear/svelte-action-motionone
```

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Documentation](#documentation)
	- [`use:inView`](#useinview)
	- [`use:inViewAnimation`](#useinviewanimation)
		- [`repeat`](#repeat)
	- [`use:scroll`](#usescroll)
	- [`use:scrollAnimation`](#usescrollanimation)
	- [Custom Options](#custom-options)
		- [`enabled`](#enabled)
		- [`onMount`](#onmount)
- [Best Practice](#best-practice)
	- [Way 1: Extract the options](#way-1-extract-the-options)
	- [Way 2: Extract the whole action with `createAction`](#way-2-extract-the-whole-action-with-createaction)
- [Gotchas](#gotchas)
	- [`scroll`/`scrollAnimation` use window scroll](#scrollscrollanimation-use-window-scroll)
	- [Options must be reactive when `enabled` option can change](#options-must-be-reactive-when-enabled-option-can-change)
- [More Examples](#more-examples)
	- [Staggered Animation](#staggered-animation)
	- [Parallax Image](#parallax-image)
- [Design Principles](#design-principles)

## Documentation

Basically it's quite the same for Motion One, just passing params as object.

### `use:inView`

> https://motion.dev/docs/inview

```svelte
<script lang="ts">
	import { inView } from '@rootenginear/svelte-action-motionone';

	let isInScreen = false;

	const headerInView = {
		onStart: () => {
			isInScreen = true;

			return () => {
				isInScreen = false;
			};
		},
		options: {
			amount: 1
		}
	};
</script>

<p use:inView={headerInView}>
	{#if isInScreen}
		<span>Now you see me</span>
	{:else}
		<span>Now you don't</span>
	{/if}
</p>
```

### `use:inViewAnimation`

```svelte
<script lang="ts">
	import type { InViewAnimationActionOptions } from '@rootenginear/svelte-action-motionone';
	import { inViewAnimation } from '@rootenginear/svelte-action-motionone';

	const viewBlurFade = {
		animate: {
			keyframes: {
				opacity: [0, 1],
				transform: ['translateY(10px)', 'translateY(0px)'],
				filter: ['blur(20px)', 'blur(0px)']
			},
			options: {
				duration: 0.5
			}
		},
		options: {
			amount: 1
		}
	} satisfies InViewAnimationActionOptions;
</script>

<h1 class="opacity-0" use:inViewAnimation={viewBlurFade}>Hello World!</h1>
```

#### `repeat`

> `repeat?: boolean = undefined`

Normally when the element is in the viewport and the animation is done, it's done. You can specify it to replay when it's in the viewport again using `repeat` option

```svelte
<script lang="ts">
	import { inViewAnimation } from '@rootenginear/svelte-action-motionone';

	const slideUp = {
		animate: {
			keyframes: {
				opacity: [0, 1],
				transform: ['translateY(10px)', 'translateY(0px)']
			},
			options: {
				duration: 0.5
			}
		},
		options: {
			amount: 1
		},
		repeat: true
	};
</script>

<h1 class="opacity-0" use:inViewAnimation={slideUp}>Hello World!</h1>
```

### `use:scroll`

> https://motion.dev/docs/scroll

> Gotcha! `scroll` use **window scroll**. Read [Gotchas](#gotchas)

```svelte
<script lang="ts">
	import type { ScrollActionOptions } from '@rootenginear/svelte-action-motionone';
	import { scroll } from '@rootenginear/svelte-action-motionone';

	let scrollPercent = 0;

	const scrollProgress = {
		onScroll: (info) => {
			scrollPercent = Math.round(info.y.progress * 100);
		}
	} satisfies ScrollActionOptions;
</script>

<div use:scroll={scrollProgress}>You've scroll for {scrollPercent}%</div>
```

### `use:scrollAnimation`

> Gotcha! `scrollAnimation` use **window scroll**. Read [Gotchas](#gotchas)

```svelte
<script lang="ts">
	import { scrollAnimation } from '@rootenginear/svelte-action-motionone';

	const scrollProgressBar = {
		animate: {
			keyframes: {
				width: ['0%', '100%']
			}
		}
	};
</script>

<div class="fixed h-4 bg-blue-500 top-0 left-0 z-50" use:scrollAnimation={scrollProgressBar}></div>
```

### Custom Options

To further customize the behavior of the action, I have added some useful options to them. These options lies outside of the Motion-related options, so you can be sure to not mix them together (Read [Design Principles](#design-principles)).

#### `enabled`

> `enabled?: boolean = true`

You can enable or disable the animation using `enabled` option. For example, you might want to disable the animation if the user prefers reduced motion.

> Gotcha! The **option must be reactive** so it can update properly!

```svelte
<script lang="ts">
	import type { ScrollAnimationActionOptions } from '@rootenginear/svelte-action-motionone';
	import { scrollAnimation } from '@rootenginear/svelte-action-motionone';
	import { onMount } from 'svelte';

	let reducedMotion = true;

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
</script>

<img
	src="https://picsum.photos/300/200"
	alt=""
	width="300"
	height="200"
	loading="eager"
	decoding="async"
	use:scrollAnimation={parallaxOptions}
/>
```

#### `onMount`

> `onMount?: (node: Element) => void`

When doing a fade `inViewAnimation`, you might want to add opacity style so the element won't flash when the animation start. You can do this "pre-animation setup" with `onMount` option.

```svelte
<script lang="ts">
	import { inViewAnimation } from '@rootenginear/svelte-action-motionone';

	const fadeAnimationOptions = {
		animate: {
			keyframes: {
				opacity: [0, 1]
			},
			options: {
				duration: 0.5
			}
		},
		options: {
			amount: 1
		},
		onMount: (node: HTMLElement) => {
			node.style.opacity = '0';
		}
	};
</script>

<p use:inViewAnimation={fadeAnimationOptions}>This is lit</p>
```

## Best Practice

Even though the API itself allows this:

```svelte
<script lang="ts">
	import { inViewAnimation } from '@rootenginear/svelte-action-motionone';
</script>

<h1
	class="opacity-0"
	use:inViewAnimation={{
		animate: {
			keyframes: {
				opacity: [0, 1],
				transform: ['translateY(10px)', 'translateY(0px)'],
				filter: ['blur(20px)', 'blur(0px)']
			},
			options: {
				duration: 0.5
			}
		},
		options: {
			amount: 1
		}
	}}
>
	Hello World!
</h1>
```

The amount of your code smell will be skyrocketed if you keep doing this. Instead, I highly recommended **reusing the action as much as possible** to avoid animation options plaguing in the template. You can do it by abstracting the option or the whole action itself into a file somewhat in your utils or a `const` in script section, and then reusing them in the template.

### Way 1: Extract the options

```svelte
<script lang="ts">
	import type { InViewAnimationActionOptions } from '@rootenginear/svelte-action-motionone';
	import { inViewAnimation } from '@rootenginear/svelte-action-motionone';

	const viewBlurFade = {
		animate: {
			keyframes: {
				opacity: [0, 1],
				transform: ['translateY(10px)', 'translateY(0px)'],
				filter: ['blur(20px)', 'blur(0px)']
			},
			options: {
				duration: 0.5
			}
		},
		options: {
			amount: 1
		}
	} satisfies InViewAnimationActionOptions;
</script>

<h1 class="opacity-0" use:inViewAnimation={viewBlurFade}>Hello World!</h1>
```

### Way 2: Extract the whole action with `createAction`

```svelte
<script lang="ts">
	import { createAction, inViewAnimation } from '@rootenginear/svelte-action-motionone';

	const viewBlurFade = createAction(inViewAnimation, {
		animate: {
			keyframes: {
				opacity: [0, 1],
				transform: ['translateY(10px)', 'translateY(0px)'],
				filter: ['blur(20px)', 'blur(0px)']
			},
			options: {
				duration: 0.5
			}
		},
		options: {
			amount: 1
		}
	});
</script>

<h1 class="opacity-0" use:viewBlurFade>Hello World!</h1>
```

## Gotchas

### `scroll`/`scrollAnimation` use window scroll

**Fix:**

- Watch the scroll of the element: set `options.container` to `'&'`
- Animate the element relative to viewport: set `options.target` to `'&'`

Unlike `inView` which watch the current element intersection, `scroll` will use window scroll instead of the element itself by default.

**Reasoning:** Aligning with Motion One behavior — [Read the documentation of `scroll`](https://motion.dev/docs/scroll)

> This used to be an action in `v0.1.0` but I was wrong about Motion's `scroll` behavior and the name could be confusing. Still, there might be actions for this in the future.

### Options must be reactive when `enabled` option can change

**Fix:** Use `$: yourOptions = {...}`

You might be copy-pasting those code above. Then add the `enabled` option with something that is reactive (like, your custom JS media query thingy) and it's not working. It's because the option might be a `const` or `let` which is not reactive to it's dependencies.

So just make it reactive — [Read about Svelte Reactive Statement](https://svelte.dev/docs/svelte-components#script-3-$-marks-a-statement-as-reactive)

## More Examples

### Staggered Animation

```svelte
<script lang="ts">
	import { inViewAnimation } from '@rootenginear/svelte-action-motionone';
	import { stagger } from 'motion';

	const listFadeOptions = {
		animate: {
			elements: '&>li',
			keyframes: {
				opacity: [0, 1]
			},
			options: {
				duration: 1,
				delay: stagger(0.1)
			}
		},
		options: {
			amount: 0.5
		}
	};
</script>

<ul use:inViewAnimation={listFadeOptions}>
	<li class="opacity-0">001</li>
	<li class="opacity-0">002</li>
	<li class="opacity-0">003</li>
</ul>
```

> Read about [Stagger](https://motion.dev/docs/stagger)

### Parallax Image

Parallax image are basically shift-on-scroll image

```svelte
<script lang="ts">
	import { scrollAnimation } from '@rootenginear/svelte-action-motionone';

	const parallaxOptions = {
		animate: {
			keyframes: {
				transform: ['translateY(10%)', 'translateY(-10%)']
			}
		},
		options: {
			target: '&',
			offset: ['0 1', '1 0']
		}
	};
</script>

<img
	src="https://picsum.photos/300/200"
	alt=""
	width="300"
	height="200"
	loading="eager"
	decoding="async"
	use:scrollAnimation={parallaxOptions}
/>
```

## Design Principles

1. Replicate Motion's API as close as possible
2. Extend the selector capability with `&` and `&>` for self referencing[^1]
3. API that is not the part of Motion must not be mixed with Motion's option. Eg: the `enabled` keyword
4. Animate the current element that `use:___Animation` is attached to by default[^2]

---

[^1]: You might want to do a [staggered animation](https://motion.dev/docs/stagger) on the children which normally is trivial to attach the base animation to the parent. In this case, you can reference the children elements by using `&>li` (or others) selector.

[^2]: This could be my oversight. My reasoning is that, since Svelte action is designed to be used at a particular element. It's quite trivial (at least for me) to animate that element anyway. Still, you can use it somewhere else and point to the animating element via `bind:this` reference or by using the selector.
