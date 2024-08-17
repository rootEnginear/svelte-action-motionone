# svelte-action-motion-one

> @rootenginear/svelte-action-motion-one

Unofficial [Svelte Action](https://svelte.dev/docs/svelte-action) for [Motion One](https://motion.dev/) animation library

## Documentation

Basically it's quite the same for Motion One, just passing params as object

**Examples:**

// TODO

> [!NOTE]
> Something doesn't work? Read [Gotchas](#gotchas)!

## Design Principle

1. Replicate Motion's API as close as possible
2. Extend the selector capability with `&` and `&>` for self referencing[^1]
3. API that is not the part of Motion must not be mixed with Motion's option. Eg: the `enabled` keyword

[^1]: You might want to do a [staggered animation](https://motion.dev/docs/stagger) on the children which normally is trivial to attach the base animation to the parent. In this case, you can reference the children elements by using `&>li` (or others) selector.

## Gotchas

### `scroll`/`scrollAnimation` use window scroll

**Fix:** use `selfScroll`/`selfScrollAnimation`

Unlike `inView` which watch the current element intersection, `scroll` will use window scroll instead of the element itself by default.

**Reasoning:** Aligning with Motion One behavior

## Best Practice

I highly recommended **reusing the action as much as possible** to avoid animation options plaguing in the template. You can do it by abstracting into a file somewhat in your utils or a `const` in script section, and then reusing them in the template.

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

---

## create-svelte

Everything you need to build a Svelte library, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

Read more about creating a library [in the docs](https://kit.svelte.dev/docs/packaging).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```
