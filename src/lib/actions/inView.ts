import type {
	AnimationOptions,
	ElementOrSelector,
	InViewOptions,
	MotionKeyframesDefinition,
	ViewChangeHandler
} from 'motion';
import { animate as motionAnimate, inView as motionInView } from 'motion';
import type { Action } from 'svelte/action';
import { EMPTY_FUNCTION, type ActionOptions } from '../utils/action.js';
import {
	getMultipleElementsFromSelector,
	getSingleElementFromSelector,
	type MultipleFunctionSelector,
	type SingleFunctionSelector
} from '../utils/selector.js';

const isDocument = (node: unknown): node is Document => node instanceof Document;

/**
 * Extend `options.root` to support string selector and selector function
 */
export type ExtendedInViewOptions = {
	options?: Omit<InViewOptions, 'root'> & {
		root?: InViewOptions['root'] | string | SingleFunctionSelector;
	};
};

/**
 * Type for `use:inView` options
 */
export type InViewActionOptions = ActionOptions &
	ExtendedInViewOptions & {
		onStart: (entry: IntersectionObserverEntry) => void | ViewChangeHandler;
	};

const createInView =
	(node: Element) =>
	({ onStart, options, enabled = true }: InViewActionOptions) =>
		enabled
			? motionInView(node, onStart, {
					...options,
					root: isDocument(options?.root)
						? options?.root
						: getSingleElementFromSelector(node, options?.root)
				})
			: EMPTY_FUNCTION;

/**
 * `use:inView`
 * @see https://motion.dev/docs/inview
 * @example
 * ```svelte
 * <script lang="ts">
 *   import { inView } from '@rootenginear/svelte-action-motionone';
 *
 *   let isInScreen = false;
 *
 *   const headerInView = {
 *     onStart: () => {
 *       isInScreen = true;
 *
 *       return () => {
 *         isInScreen = false;
 *       };
 *     },
 *     options: {
 *       amount: 1
 *     }
 *   };
 * </script>
 *
 * <p use:inView={headerInView}>
 *   {#if isInScreen}
 *     <span>Now you see me</span>
 *   {:else}
 *     <span>Now you don't</span>
 *   {/if}
 * </p>
 * ```
 */
export const inView: Action<Element, InViewActionOptions> = (
	node,
	options: InViewActionOptions
) => {
	options.onMount?.(node);

	const nodeInView = createInView(node);
	let destroy = nodeInView(options);

	return {
		update(newOptions) {
			destroy();
			destroy = nodeInView(newOptions);
		},
		destroy
	};
};

/**
 * Type for `use:inViewAnimation` options
 */
export type InViewAnimationActionOptions = ActionOptions &
	ExtendedInViewOptions & {
		animate: {
			/**
			 * Extend the support for self selector (`&`) and selector function
			 *
			 * The self selector must be in the following format: `&`, `&>{selector}`, `&+{selector}`, `&~{selector}`, `& {selector}`
			 *
			 * @default '&'
			 */
			elements?: ElementOrSelector | MultipleFunctionSelector;
			keyframes: MotionKeyframesDefinition;
			options?: AnimationOptions;
		};
		/**
		 * Normally when the element is in the viewport and the animation is done, it's done. You can specify it to replay when it's in the viewport again using `repeat` option
		 * @default undefined
		 * @example
		 * ```svelte
		 * <script lang="ts">
		 *   import { inViewAnimation } from '@rootenginear/svelte-action-motionone';
		 *
		 *   const slideUp = {
		 *     animate: {
		 *       keyframes: {
		 *         opacity: [0, 1],
		 *         transform: ['translateY(10px)', 'translateY(0px)']
		 *       },
		 *       options: {
		 *         duration: 0.5
		 *       }
		 *     },
		 *     options: {
		 *       amount: 1
		 *     },
		 *     repeat: true
		 *   };
		 * </script>
		 *
		 * <h1 class="opacity-0" use:inViewAnimation={slideUp}>Hello World!</h1>
		 * ```
		 */
		repeat?: boolean;
	};

const createInViewAnimation =
	(node: Element) =>
	({
		options,
		animate: { elements = '&', keyframes, options: animationOptions },
		repeat,
		enabled = true
	}: InViewAnimationActionOptions) =>
		enabled
			? motionInView(
					node,
					() => {
						motionAnimate(
							getMultipleElementsFromSelector(node, elements),
							keyframes,
							animationOptions
						);
						if (repeat) return () => {};
					},
					{
						...options,
						root: isDocument(options?.root)
							? options?.root
							: getSingleElementFromSelector(node, options?.root)
					}
				)
			: EMPTY_FUNCTION;

/**
 * `use:inViewAnimation`
 * @example
 * ```svelte
 * <script lang="ts">
 *   import type { InViewAnimationActionOptions } from '@rootenginear/svelte-action-motionone';
 *   import { inViewAnimation } from '@rootenginear/svelte-action-motionone';
 *
 *   const viewBlurFade = {
 *     animate: {
 *       keyframes: {
 *         opacity: [0, 1],
 *         transform: ['translateY(10px)', 'translateY(0px)'],
 *         filter: ['blur(20px)', 'blur(0px)']
 *       },
 *       options: {
 *         duration: 0.5
 *       }
 *     },
 *     options: {
 *       amount: 1
 *     }
 *   } satisfies InViewAnimationActionOptions;
 * </script>
 *
 * <h1 class="opacity-0" use:inViewAnimation={viewBlurFade}>Hello World!</h1>
 * ```
 */
export const inViewAnimation: Action<Element, InViewAnimationActionOptions> = (
	node,
	options: InViewAnimationActionOptions
) => {
	options.onMount?.(node);

	const nodeInViewAnimation = createInViewAnimation(node);
	let destroy = nodeInViewAnimation(options);

	return {
		update(newOptions) {
			destroy();
			destroy = nodeInViewAnimation(newOptions);
		},
		destroy
	};
};
