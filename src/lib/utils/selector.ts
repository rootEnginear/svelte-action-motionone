import type { ElementOrSelector } from 'motion';
import { getUniqueId } from './id.js';

export type MultipleFunctionSelector = (node: Element) => ElementOrSelector;
export type SingleFunctionSelector = <T extends Element>(node: T) => T | undefined;

function getElementsUsingNodeParent(node: Element, restSelector: string): NodeListOf<Element>;
function getElementsUsingNodeParent<T extends Element>(
	node: T,
	restSelector: string,
	single: true
): T | null;
function getElementsUsingNodeParent(node: Element, restSelector: string, single = false) {
	const id = getUniqueId();
	node.setAttribute('data-svelte-use-motionone-id', `${id}`);
	const element = node.parentElement ?? document;
	const selector = `[data-svelte-use-motionone-id="${id}"]${restSelector}`;
	const queryResult = single ? element.querySelector(selector) : element.querySelectorAll(selector);
	node.removeAttribute('data-svelte-use-motionone-id');
	return queryResult;
}

export const getMultipleElementsFromSelector = (
	node: Element,
	selector: ElementOrSelector | MultipleFunctionSelector
): ElementOrSelector => {
	if (typeof selector === 'function') return selector(node);
	if (typeof selector !== 'string') return selector;
	const trimmedSelector = selector.trim();
	if (trimmedSelector === '&') return node;
	switch (trimmedSelector.slice(0, 2)) {
		case '& ':
			return node.querySelectorAll(trimmedSelector.slice(2));
		case '&>':
		case '&+':
		case '&~':
			return getElementsUsingNodeParent(node, trimmedSelector.slice(1));
		default:
			return trimmedSelector;
	}
};

export const getSingleElementFromSelector = <T extends Element>(
	node: T,
	selector?: T | string | SingleFunctionSelector
): T | undefined => {
	if (selector === undefined) return undefined;
	if (typeof selector === 'function') return selector(node);
	if (typeof selector !== 'string') return selector;
	const trimmedSelector = selector.trim();
	if (trimmedSelector === '&') return node;
	switch (trimmedSelector.slice(0, 2)) {
		case '& ':
			return node.querySelector<T>(trimmedSelector.slice(2)) ?? undefined;
		case '&>':
		case '&+':
		case '&~':
			return getElementsUsingNodeParent(node, trimmedSelector.slice(1), true) ?? undefined;
		default:
			return document.querySelector<T>(trimmedSelector) ?? undefined;
	}
};
