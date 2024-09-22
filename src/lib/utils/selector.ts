import type { ElementOrSelector } from 'motion';
import { getUniqueId } from './id.js';

const isDocument = (node: Element | Document): node is Document => node.nodeName === '#document';

export type MultipleFunctionSelector = (node: Element) => ElementOrSelector;
export type SingleFunctionSelector = <T extends Element | Document>(node: T) => T | undefined;

function getElementsUsingNodeParent(
	node: Element | Document,
	restSelector: string
): NodeListOf<Element>;
function getElementsUsingNodeParent<T extends Element | Document>(
	node: T,
	restSelector: string,
	single: true
): T | null;
function getElementsUsingNodeParent(
	node: Element | Document,
	restSelector: string,
	single = false
) {
	if (isDocument(node)) {
		const selector = `html${restSelector}`;
		return single ? document.querySelector(selector) : document.querySelectorAll(selector);
	}
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

export const getSingleElementFromSelector = <T extends Element | Document>(
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
			return node.querySelector<Exclude<T, Document>>(trimmedSelector.slice(2)) ?? undefined;
		case '&>':
		case '&+':
		case '&~':
			return getElementsUsingNodeParent(node, trimmedSelector.slice(1), true) ?? undefined;
		default:
			return document.querySelector<Exclude<T, Document>>(trimmedSelector) ?? undefined;
	}
};
