import { scroll as motionScroll } from 'motion';
import type { Action } from 'svelte/action';

type ScrollParams = Parameters<typeof motionScroll>;

/**
 * Type for typing the parameters of the `scroll` action.
 *
 * [👍 Read Best Practices](https://rootenginear.github.io/svelte-action-motionone/#best-practices)
 * @example
 * const scrollParams = [onScroll, options] satisfies ScrollActionParams
 * // <div use:scroll={scrollParams} />
 */
export type ScrollActionParams = ScrollParams | ((node: HTMLElement) => ScrollParams);

const createScroll = (node: HTMLElement) => (params: ScrollActionParams) => {
	const [onScroll, options] = typeof params === 'function' ? params(node) : params;
	return motionScroll(onScroll, options);
};

/**
 * Motion's `scroll(onScroll, options)` equivalent.
 * - [📑 Read Documentation](https://rootenginear.github.io/svelte-action-motionone/#use-scroll)
 * - [👍 Read Best Practices](https://rootenginear.github.io/svelte-action-motionone/#best-practices)
 * @example
 * <div use:scroll={[onScroll, options]} />
 * @example
 * <div use:scroll={(node) => [onScroll, options]} />
 */
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

/**
 * Watch the scroll of that element. It's a shortcut for:
 * ```svelte
 * <div use:scroll={(node) => [..., { container: node }]} />
 * ```
 * - [📑 Read Documentation](https://rootenginear.github.io/svelte-action-motionone/#use-container-scroll)
 * - [👍 Read Best Practices](https://rootenginear.github.io/svelte-action-motionone/#best-practices)
 * @example
 * <div use:containerScroll={[onScroll, options]} />
 * @example
 * <div use:containerScroll={(node) => [onScroll, options]} />
 */
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

/**
 * Watch the progress of that element in viewport. It's a shortcut for:
 * ```svelte
 * <div use:scroll={(node) => [..., { target: node }]} />
 * ```
 * - [📑 Read Documentation](https://rootenginear.github.io/svelte-action-motionone/#use-scroll-in-view)
 * - [👍 Read Best Practices](https://rootenginear.github.io/svelte-action-motionone/#best-practices)
 * @example
 * <div use:scrollInView={[onScroll, options]} />
 * @example
 * <div use:scrollInView={(node) => [onScroll, options]} />
 */
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
