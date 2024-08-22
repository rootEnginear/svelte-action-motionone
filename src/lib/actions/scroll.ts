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
import { getNodeElement, getNodeElements } from '../utils/selector.js';

export type ExtendedScrollOptions = {
	options?: Omit<ScrollOptions, 'container' | 'target'> & {
		container?: string | ScrollOptions['container'];
		target?: string | ScrollOptions['target'];
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
					container: getNodeElement(node as HTMLElement, options?.container),
					target: getNodeElement(node, options?.target)
				})
			: EMPTY_FUNCTION;

export const scroll: Action<Element, ScrollActionOptions> = (node, options) => {
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
			elements?: ElementOrSelector;
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
			? motionScroll(motionAnimate(getNodeElements(node, elements), keyframes, animationOptions), {
					...options,
					container: getNodeElement(node as HTMLElement, options?.container),
					target: getNodeElement(node, options?.target)
				})
			: EMPTY_FUNCTION;

export const scrollAnimation: Action<Element, ScrollAnimationActionOptions> = (node, options) => {
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
