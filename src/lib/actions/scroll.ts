import { scroll as motionScroll } from 'motion';
import type { Action } from 'svelte/action';

export type ScrollActionParams = Parameters<typeof motionScroll>;

const createScroll =
	(node: HTMLElement) =>
	(params: ScrollActionParams | ((node: HTMLElement) => ScrollActionParams)) => {
		const [onScroll, options] = typeof params === 'function' ? params(node) : params;
		return motionScroll(onScroll, options);
	};

const createScrollInView =
	(node: HTMLElement) =>
	(params: ScrollActionParams | ((node: HTMLElement) => ScrollActionParams)) => {
		const [onScroll, options] = typeof params === 'function' ? params(node) : params;
		return motionScroll(onScroll, {
			...options,
			target: options?.target ?? node
		});
	};

const createContainerScroll =
	(node: HTMLElement) =>
	(params: ScrollActionParams | ((node: HTMLElement) => ScrollActionParams)) => {
		const [onScroll, options] = typeof params === 'function' ? params(node) : params;
		return motionScroll(onScroll, {
			...options,
			container: options?.container ?? node
		});
	};

export const scroll: Action<
	HTMLElement,
	ScrollActionParams | ((node: HTMLElement) => ScrollActionParams)
> = (node, params) => {
	const instanceScroll = createScroll(node);
	let stop = instanceScroll(params);

	return {
		update(params) {
			stop();
			stop = instanceScroll(params);
		},
		destroy() {
			stop();
		}
	};
};

export const containerScroll: Action<
	HTMLElement,
	ScrollActionParams | ((node: HTMLElement) => ScrollActionParams)
> = (node, params) => {
	const instanceScroll = createContainerScroll(node);
	let stop = instanceScroll(params);

	return {
		update(params) {
			stop();
			stop = instanceScroll(params);
		},
		destroy() {
			stop();
		}
	};
};

export const scrollInView: Action<
	HTMLElement,
	ScrollActionParams | ((node: HTMLElement) => ScrollActionParams)
> = (node, params) => {
	const instanceScroll = createScrollInView(node);
	let stop = instanceScroll(params);

	return {
		update(params) {
			stop();
			stop = instanceScroll(params);
		},
		destroy() {
			stop();
		}
	};
};
