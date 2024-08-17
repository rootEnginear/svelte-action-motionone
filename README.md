# @rootenginear/svelte-action-motion-one

Unofficial [Svelte Action](https://svelte.dev/docs/svelte-action) for [Motion One](https://motion.dev/) animation library

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Documentation](#documentation)
  - [`inView`](#inview)
  - [`inViewAnimation`](#inviewanimation)
  - [`scroll`](#scroll)
  - [`scrollAnimation`](#scrollanimation)
- [Best Practice](#best-practice)
  - [Way 1: Extract the options](#way-1-extract-the-options)
  - [Way 2: Extract the whole action with `createAction`](#way-2-extract-the-whole-action-with-createaction)
- [Gotchas](#gotchas)
  - [`scroll`/`scrollAnimation` use window scroll](#scrollscrollanimation-use-window-scroll)
- [Design Principle](#design-principle)

## Documentation

Basically it's quite the same for Motion One, just passing params as object.

### `inView`

> https://motion.dev/docs/inview

```svelte
<script lang="ts">
	import { inView } from '@rootenginear/svelte-action-motion-one';

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

<h1 use:inView={headerInView}>
	{#if isInScreen}
		<span>Now you see me</span>
	{:else}
		<span>Now you don't</span>
	{/if}
</h1>
```

### `inViewAnimation`

```svelte
<script lang="ts">
	import { inViewAnimation } from '@rootenginear/svelte-action-motion-one';

	const viewBlurFade = {
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
		}
	};
</script>

<h1 class="opacity-0" use:inViewAnimation={viewBlurFade}>Hello Welcome</h1>
```

### `scroll`

> https://motion.dev/docs/scroll

> Gotcha! `scroll` use **window scroll**. Read [Gotchas](#gotchas)

```svelte
<script lang="ts">
	import { scroll } from '@rootenginear/svelte-action-motion-one';

	let scrollPercent = 0;

	const scrollProgress = {
		onScroll: (info) => {
			scrollPercent = Math.round(info.y.progress * 100);
		}
	};
</script>

<div use:scroll={scrollProgress}>You've scroll for {scrollPercent}%</div>
```

### `scrollAnimation`

> Gotcha! `scrollAnimation` use **window scroll**. Read [Gotchas](#gotchas)

```svelte
<script lang="ts">
	import { scrollAnimation } from '@rootenginear/svelte-action-motion-one';

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

## Best Practice

Even though the API itself allows this:

```svelte
<script lang="ts">
	import { inViewAnimation } from '@rootenginear/svelte-action-motion-one';
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
				duration: 0.5,
				easing: [0.22, 1, 0.36, 1]
			}
		},
		options: {
			amount: 1
		}
	}}
>
	Hello Welcome
</h1>
```

The amount of your code smell will be skyrocketed if you keep doing this. Instead, I highly recommended **reusing the action as much as possible** to avoid animation options plaguing in the template. You can do it by abstracting the option or the whole action itself into a file somewhat in your utils or a `const` in script section, and then reusing them in the template.

### Way 1: Extract the options

```svelte
<script lang="ts">
	import { inViewAnimation } from '@rootenginear/svelte-action-motion-one';

	const blurFadeOptions = {
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
		}
	};
</script>

<h1 class="opacity-0" use:inViewAnimation={blurFadeOptions}>Hello Welcome</h1>
```

### Way 2: Extract the whole action with `createAction`

```svelte
<script lang="ts">
	import { createAction, inViewAnimation } from '@rootenginear/svelte-action-motion-one';

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
		}
	});
</script>

<h1 class="opacity-0" use:viewBlurFade>Hello Welcome</h1>
```

## Gotchas

### `scroll`/`scrollAnimation` use window scroll

**Fix:**

- Watch the scroll of itself: set `options.container` to `'&'`
- Animate itself relative to viewport: set `options.target` to `'&'`

Unlike `inView` which watch the current element intersection, `scroll` will use window scroll instead of the element itself by default.

**Reasoning:** Aligning with Motion One behavior — [Read the documentation of `scroll`](https://motion.dev/docs/scroll)

> This used to be an action in `v0.1.0` but I was wrong about Motion's `scroll` behavior and the name could be confusing. Still, there might be actions for this in the future.

## Design Principle

1. Replicate Motion's API as close as possible
2. Extend the selector capability with `&` and `&>` for self referencing[^1]
3. API that is not the part of Motion must not be mixed with Motion's option. Eg: the `enabled` keyword
4. Animate the current element that `___Animation` action is attached to by default[^2]

[^1]: You might want to do a [staggered animation](https://motion.dev/docs/stagger) on the children which normally is trivial to attach the base animation to the parent. In this case, you can reference the children elements by using `&>li` (or others) selector.

[^2]: This could be my oversight. My reasoning is that, since Svelte action is designed to be used at a particular element. It's quite trivial (at least for me) to animate that element anyway. Still, you can use it somewhere else and point to the animating element via `bind:this` reference or by using the selector.
