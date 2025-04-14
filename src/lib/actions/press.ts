import { press as motionPress } from 'motion';
import type { Action } from 'svelte/action';

type PressParams =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	Parameters<typeof motionPress> extends [infer _, ...infer Params] ? Params : never;

export type PressActionParams = PressParams | ((node: HTMLElement) => PressParams);

const createPress = (node: HTMLElement) => (params: PressActionParams) => {
	const [onPressStart, options] = typeof params === 'function' ? params(node) : params;
	return motionPress(node, onPressStart, options);
};

export const press: Action<HTMLElement, PressActionParams> = (node, params) => {
	const instancePress = createPress(node);
	let stop = instancePress(params);

	return {
		update(params) {
			stop();
			stop = instancePress(params);
		},
		destroy() {
			stop();
		}
	};
};
