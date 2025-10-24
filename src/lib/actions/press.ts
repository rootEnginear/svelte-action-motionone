import { press as motionPress } from 'motion';
import type { Action } from 'svelte/action';

type PressParams =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	Parameters<typeof motionPress> extends [infer _, ...infer Params] ? Params : never;

/**
 * Type for typing the parameters of the `press` action.
 *
 * [👍 Read Best Practices](https://rootenginear.github.io/svelte-action-motionone/#best-practices)
 * @example
 * const pressParams = [onPressStart, options] satisfies PressActionParams
 * // <div use:press={pressParams} />
 */
export type PressActionParams = PressParams | ((node: HTMLElement) => PressParams);

const createPress = (node: HTMLElement) => (params: PressActionParams) => {
	const [onPressStart, options] = typeof params === 'function' ? params(node) : params;
	return motionPress(node, onPressStart, options);
};

/**
 * Motion's `press(elementOrSelector, onPressStart, options)` equivalent.
 * - [📑 Read Documentation](https://rootenginear.github.io/svelte-action-motionone/#use-press)
 * - [👍 Read Best Practices](https://rootenginear.github.io/svelte-action-motionone/#best-practices)
 * @example
 * <div use:press={[onPressStart, options]} />
 * @example
 * <div use:press={(node) => [onPressStart, options]} />
 */
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
