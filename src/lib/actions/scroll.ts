import type {
	AnimationOptions,
	ElementOrSelector,
	MotionKeyframesDefinition,
	OnScroll,
	ScrollOptions
} from 'motion';
import { animate as motionAnimate, scroll as motionScroll } from 'motion';
import type { Action } from 'svelte/action';
import { EMPTY_FUNCTION, type ActionOptions } from '../utils/action.js';
import {
	getMultipleElementsFromSelector,
	getSingleElementFromSelector,
	type MultipleFunctionSelector,
	type SingleFunctionSelector
} from '../utils/selector.js';

/**
 * Extend `options.container` and `options.target` to support string selector and selector function
 */
export type ExtendedScrollOptions = {
	options?: Omit<ScrollOptions, 'container' | 'target'> & {
		container?: ScrollOptions['container'] | string | SingleFunctionSelector;
		target?: ScrollOptions['target'] | string | SingleFunctionSelector;
	};
};

export type ScrollActionOptions = ActionOptions &
	ExtendedScrollOptions & {
		onScroll: OnScroll;
	};

const createScroll =
	(node: Element) =>
	({ onScroll, options, enabled = true }: ScrollActionOptions) =>
		enabled
			? motionScroll(onScroll, {
					...options,
					container: getSingleElementFromSelector(node, options?.container),
					target: getSingleElementFromSelector(node, options?.target)
				})
			: EMPTY_FUNCTION;

/**
 * `use:scroll`
 *
 * **Gotcha!** `scroll` use **window scroll**.
 *
 * @see https://motion.dev/docs/scroll
 * @example
 * ```svelte
 * <script lang="ts">
 *   import type { ScrollActionOptions } from '@rootenginear/svelte-action-motionone';
 *   import { scroll } from '@rootenginear/svelte-action-motionone';
 *
 *   let scrollPercent = 0;
 *
 *   const scrollProgress = {
 *     onScroll: (info) => {
 *       scrollPercent = Math.round(info.y.progress * 100);
 *     }
 *   } satisfies ScrollActionOptions;
 * </script>
 *
 * <div use:scroll={scrollProgress}>You've scroll for {scrollPercent}%</div>
 * ```
 */
export const scroll: Action<Element, ScrollActionOptions> = (
	node,
	options: ScrollActionOptions
) => {
	options.onMount?.(node);

	const nodeScroll = createScroll(node);
	let destroy = nodeScroll(options);

	return {
		update(newOptions: ScrollActionOptions) {
			destroy();
			destroy = nodeScroll(newOptions);
		},
		destroy
	};
};

export type ScrollAnimationActionOptions = ActionOptions &
	ExtendedScrollOptions & {
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
	};

const createScrollAnimation =
	(node: Element) =>
	({
		options,
		animate: { elements = '&', keyframes, options: animationOptions },
		enabled = true
	}: ScrollAnimationActionOptions) =>
		enabled
			? motionScroll(
					motionAnimate(
						getMultipleElementsFromSelector(node, elements),
						keyframes,
						animationOptions
					),
					{
						...options,
						container: getSingleElementFromSelector(node, options?.container),
						target: getSingleElementFromSelector(node, options?.target)
					}
				)
			: EMPTY_FUNCTION;

/**
 * `use:scrollAnimation`
 *
 * **Gotcha!** `scrollAnimation` use **window scroll**.
 *
 * @example
 * ```svelte
 * <script lang="ts">
 *   import { scrollAnimation } from '@rootenginear/svelte-action-motionone';
 *
 *   const scrollProgressBar = {
 *     animate: {
 *       keyframes: {
 *         width: ['0%', '100%']
 *       }
 *     }
 *   };
 * </script>
 *
 * <div class="fixed h-4 bg-blue-500 top-0 left-0 z-50" use:scrollAnimation={scrollProgressBar}></div>
 * ```
 */
export const scrollAnimation: Action<Element, ScrollAnimationActionOptions> = (
	node,
	options: ScrollAnimationActionOptions
) => {
	options.onMount?.(node);

	const nodeScrollAnimation = createScrollAnimation(node);
	let destroy = nodeScrollAnimation(options);

	return {
		update(newOptions: ScrollAnimationActionOptions) {
			destroy();
			destroy = nodeScrollAnimation(newOptions);
		},
		destroy
	};
};
