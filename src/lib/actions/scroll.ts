import { EMPTY_FUNCTION, type ActionOptions } from '$lib/utils/action.js';
import { getNodeElement, getNodeElements } from '$lib/utils/selector.js';
import type {
	AnimationOptions,
	ElementOrSelector,
	MotionKeyframesDefinition,
	OnScroll,
	ScrollOptions
} from 'motion';
import { animate as motionAnimate, scroll as motionScroll } from 'motion';
import type { Action } from 'svelte/action';

export type ExtendedScrollOptions = {
	options?: ScrollOptions & {
		target?: string | ScrollOptions['target'];
	};
};

export type ScrollActionOptions = ActionOptions &
	ExtendedScrollOptions & {
		onScroll: OnScroll;
	};

const createScroll =
	(node: HTMLElement) =>
	({ onScroll, options, enabled = true }: ScrollActionOptions) =>
		enabled
			? motionScroll(onScroll, {
					...options,
					target: getNodeElement(node, options?.target)
				})
			: EMPTY_FUNCTION;

export const scroll: Action<HTMLElement, ScrollActionOptions> = (node, options) => {
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
	(node: HTMLElement) =>
	({
		options,
		animate: { elements = '&', keyframes, options: animationOptions },
		enabled = true
	}: ScrollAnimationActionOptions) =>
		enabled
			? motionScroll(motionAnimate(getNodeElements(node, elements), keyframes, animationOptions), {
					...options,
					target: getNodeElement(node, options?.target)
				})
			: EMPTY_FUNCTION;

export const scrollAnimation: Action<HTMLElement, ScrollAnimationActionOptions> = (
	node,
	options
) => {
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

export const selfScroll = (node: HTMLElement, options: ScrollActionOptions) =>
	scroll(node, {
		...options,
		options: {
			...options.options,
			target: node
		}
	});

export const selfScrollAnimation = (node: HTMLElement, options: ScrollAnimationActionOptions) =>
	scrollAnimation(node, {
		...options,
		options: {
			...options.options,
			target: node
		}
	});
