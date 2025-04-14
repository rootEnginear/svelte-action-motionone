import { scroll as motionScroll } from 'motion';
import type { Action } from 'svelte/action';

export type ScrollParams = Parameters<typeof motionScroll>;

export type ScrollActionParams = ScrollParams | ((node: HTMLElement) => ScrollParams);

const createScroll = (node: HTMLElement) => (params: ScrollActionParams) => {
	const [onScroll, options] = typeof params === 'function' ? params(node) : params;
	return motionScroll(onScroll, options);
};

export const scroll: Action<HTMLElement, ScrollActionParams> = (node, params) => {
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

const createContainerScroll = (node: HTMLElement) => (params: ScrollActionParams) => {
	const [onScroll, options] = typeof params === 'function' ? params(node) : params;
	return motionScroll(onScroll, {
		...options,
		container: options?.container ?? node
	});
};

export const containerScroll: Action<HTMLElement, ScrollActionParams> = (node, params) => {
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

const createScrollInView = (node: HTMLElement) => (params: ScrollActionParams) => {
	const [onScroll, options] = typeof params === 'function' ? params(node) : params;
	return motionScroll(onScroll, {
		...options,
		target: options?.target ?? node
	});
};

export const scrollInView: Action<HTMLElement, ScrollActionParams> = (node, params) => {
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
