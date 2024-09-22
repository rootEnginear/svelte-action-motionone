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
					container: getSingleElementFromSelector(node as HTMLElement, options?.container),
					target: getSingleElementFromSelector(node, options?.target)
				})
			: EMPTY_FUNCTION;

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
						container: getSingleElementFromSelector(node as HTMLElement, options?.container),
						target: getSingleElementFromSelector(node, options?.target)
					}
				)
			: EMPTY_FUNCTION;

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
