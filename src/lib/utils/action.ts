export const EMPTY_FUNCTION = () => {};

export interface ActionOptions {
	enabled?: boolean;
	onMount?: (node: Element) => void;
}

/**
 * Easily make action ✨
 * @example
 * const fullInView = createAction(inView, { onStart: () => { ... }, options: { amount: 1 } })
 * ...
 * <div use:fullInView />
 */
export const createAction =
	<O, F>(f: (node: Element, options: O) => F, options: NoInfer<O>) =>
	(node: Element): F =>
		f(node, options);
