import { inView as motionInView } from 'motion';
import type { Action } from 'svelte/action';

type InViewParams =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	Parameters<typeof motionInView> extends [infer _, ...infer Params] ? Params : never;

export type InViewActionParams = InViewParams | ((node: HTMLElement) => InViewParams);

const createInView = (node: HTMLElement) => (params: InViewActionParams) => {
	const [onStart, options] = typeof params === 'function' ? params(node) : params;
	return motionInView(node, onStart, options);
};

export const inView: Action<HTMLElement, InViewActionParams> = (node, params) => {
	const instanceInView = createInView(node);
	let stop = instanceInView(params);

	return {
		update(params) {
			stop();
			stop = instanceInView(params);
		},
		destroy() {
			stop();
		}
	};
};
