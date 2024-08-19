import { EMPTY_FUNCTION, type ActionOptions } from '$lib/utils/action.js';
import { getNodeElements } from '$lib/utils/selector.js';
import type {
	AnimationOptions,
	ElementOrSelector,
	InViewOptions,
	MotionKeyframesDefinition,
	ViewChangeHandler
} from 'motion';
import { animate as motionAnimate, inView as motionInView } from 'motion';
import type { Action } from 'svelte/action';

export type InViewActionOptions = ActionOptions & {
	onStart: (entry: IntersectionObserverEntry) => void | ViewChangeHandler;
	options?: InViewOptions;
};

const createInView =
	(node: Element) =>
	({ onStart, options, enabled = true }: InViewActionOptions) =>
		enabled ? motionInView(node, onStart, options) : EMPTY_FUNCTION;

export const inView: Action<Element, InViewActionOptions> = (node, options) => {
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

export type InViewAnimationActionOptions = ActionOptions & {
	animate: {
		elements?: ElementOrSelector;
		keyframes: MotionKeyframesDefinition;
		options?: AnimationOptions;
	};
	options?: InViewOptions;
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
						motionAnimate(getNodeElements(node, elements), keyframes, animationOptions);
						if (repeat) return () => {};
					},
					options
				)
			: EMPTY_FUNCTION;

export const inViewAnimation: Action<Element, InViewAnimationActionOptions> = (node, options) => {
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
