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

export type ExtendedInViewOptions = {
	options?: Omit<InViewOptions, 'root'> & {
		root?: InViewOptions['root'] | string | SingleFunctionSelector;
	};
};

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
					root: getSingleElementFromSelector(node, options?.root)
				})
			: EMPTY_FUNCTION;

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

export type InViewAnimationActionOptions = ActionOptions & {
	animate: {
		elements?: ElementOrSelector | MultipleFunctionSelector;
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
						motionAnimate(
							getMultipleElementsFromSelector(node, elements),
							keyframes,
							animationOptions
						);
						if (repeat) return () => {};
					},
					options
				)
			: EMPTY_FUNCTION;

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
