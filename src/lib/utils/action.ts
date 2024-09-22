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
	<MotionAction, ActionOptions>(
		motionAction: (node: Element, options: ActionOptions) => MotionAction,
		options: NoInfer<ActionOptions>
	) =>
	(node: Element): MotionAction =>
		motionAction(node, options);
