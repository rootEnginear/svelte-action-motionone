export const EMPTY_FUNCTION = () => {};

export interface ActionOptions {
	enabled?: boolean;
}

/**
 * Easily make action ✨
 * @example
 * const fullInView = createAction(inView, { onStart: () => { ... }, options: { amount: 1 } })
 * ...
 * <div use:fullInView />
 */
export const createAction =
	<O, F>(f: (node: HTMLElement, options: O) => F, options: NoInfer<O>) =>
	(node: HTMLElement) =>
		f(node, options);