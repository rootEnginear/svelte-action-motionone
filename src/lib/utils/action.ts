export const EMPTY_FUNCTION = () => {};

/**
 * **Custom Options**
 *
 * To further customize the behavior of the action, I have added some useful options to them. These options lies outside of the Motion-related options, so you can be sure to not mix them together.
 */
export interface ActionOptions {
	/**
	 * You can enable or disable the animation using `enabled` option. For example, you might want to disable the animation if the user prefers reduced motion.
	 *
	 * **Gotcha!** The **option must be reactive** so it can update properly!
	 *
	 * @default true
	 * @example
	 * ```svelte
	 * <script lang="ts">
	 *   import type { ScrollAnimationActionOptions } from '@rootenginear/svelte-action-motionone';
	 *   import { scrollAnimation } from '@rootenginear/svelte-action-motionone';
	 *   import { onMount } from 'svelte';
	 *
	 *   let reducedMotion = true;
	 *
	 *   $: parallaxOptions = {
	 *     animate: {
	 *       keyframes: {
	 *         transform: ['translateY(10%)', 'translateY(-10%)']
	 *       }
	 *     },
	 *     options: {
	 *       target: '&',
	 *       offset: ['0 1', '1 0']
	 *     },
	 *     enabled: !reducedMotion
	 *   } satisfies ScrollAnimationActionOptions;
	 *
	 *   onMount(() => {
	 *     reducedMotion = window.matchMedia('(prefers-reduced-motion)').matches;
	 *   });
	 * </script>
	 *
	 * <img
	 *   src="https://picsum.photos/300/200"
	 *   alt=""
	 *   width="300"
	 *   height="200"
	 *   loading="eager"
	 *   decoding="async"
	 *   use:scrollAnimation={parallaxOptions}
	 * />
	 * ```
	 */
	enabled?: boolean;
	/**
	 * When doing a fade `inViewAnimation`, you might want to add opacity style so the element won't flash when the animation start. You can do this "pre-animation setup" with `onMount` option.
	 * @example
	 * ```svelte
	 * <script lang="ts">
	 *   import { inViewAnimation } from '@rootenginear/svelte-action-motionone';
	 *
	 *   const fadeAnimationOptions = {
	 *     animate: {
	 *       keyframes: {
	 *         opacity: [0, 1]
	 *       },
	 *       options: {
	 *         duration: 0.5
	 *       }
	 *     },
	 *     options: {
	 *       amount: 1
	 *     },
	 *     onMount: (node: HTMLElement) => {
	 *       node.style.opacity = '0';
	 *     }
	 *   };
	 * </script>
	 *
	 * <p use:inViewAnimation={fadeAnimationOptions}>This is lit</p>
	 * ```
	 */
	onMount?: (node: Element) => void;
}

/**
 * Create Svelte action from Motion action with custom config. Useful for reusing the same config.
 * @example
 * ```svelte
 * <script>
 *   const fullInView = createAction(inView, {
 *     onStart: () => { ... },
 *     options: { amount: 1 }
 *   })
 * </script>
 *
 * <div use:fullInView />
 * ```
 */
export const createAction =
	<MotionAction, ActionOptions>(
		motionAction: (node: Element, options: ActionOptions) => MotionAction,
		options: NoInfer<ActionOptions>
	) =>
	(node: Element): MotionAction =>
		motionAction(node, options);
