import type { ElementOrSelector } from 'motion';

const parseStringSelector = (selector: string): { isSelf: boolean; selector: string } => {
	if (selector.trim() === '&') return { isSelf: true, selector: '' };
	if (/^\s*&\s*>/.test(selector))
		return { isSelf: true, selector: selector.replace(/^\s*&\s*>/, '').trim() };
	return { isSelf: false, selector: selector.trim() };
};

export const getNodeElements = (
	node: HTMLElement,
	elements: ElementOrSelector
): ElementOrSelector => {
	if (typeof elements !== 'string') return elements;

	const { isSelf, selector: query } = parseStringSelector(elements);
	if (isSelf && query === '') return node;
	if (isSelf) return node.querySelectorAll(query);
	return query;
};

export const getNodeElement = (
	node: HTMLElement,
	elements?: string | Element
): Element | undefined => {
	if (typeof elements !== 'string') return elements;

	const { isSelf, selector: query } = parseStringSelector(elements);
	if (isSelf && query === '') return node;
	if (isSelf) return node.querySelector(query) || undefined;
	return document.querySelector(query) || undefined;
};
