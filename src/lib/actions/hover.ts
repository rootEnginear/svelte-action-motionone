import { hover as motionHover } from 'motion';
import type { Action } from 'svelte/action';

type HoverActionParams =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	Parameters<typeof motionHover> extends [infer _, ...infer Params] ? Params : never;

const createHover =
	(node: HTMLElement) =>
	(params: HoverActionParams | ((node: HTMLElement) => HoverActionParams)) => {
		const [onHoverStart, options] = typeof params === 'function' ? params(node) : params;
		return motionHover(node, onHoverStart, options);
	};

export const hover: Action<
	HTMLElement,
	HoverActionParams | ((node: HTMLElement) => HoverActionParams)
> = (node, params) => {
	const instanceHover = createHover(node);
	let stop = instanceHover(params);

	return {
		update(params) {
			stop();
			stop = instanceHover(params);
		},
		destroy() {
			stop();
		}
	};
};
