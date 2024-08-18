import type { ElementOrSelector } from 'motion';

const parseStringSelector = (selector: string): { isSelf: boolean; selector: string } => {
	if (selector.trim() === '&') return { isSelf: true, selector: '' };
	if (/^\s*&\s*>/.test(selector))
		return { isSelf: true, selector: selector.replace(/^\s*&\s*>/, '').trim() };
	return { isSelf: false, selector: selector.trim() };
};

export const getNodeElements = (node: Element, elements: ElementOrSelector): ElementOrSelector => {
	if (typeof elements !== 'string') return elements;

	const { isSelf, selector: query } = parseStringSelector(elements);
	if (isSelf && query === '') return node;
	if (isSelf) return node.querySelectorAll(query);
	return query;
};

export const getNodeElement = <T extends Element>(node: T, element?: string | T): T | undefined => {
	if (typeof element !== 'string') return element;

	const { isSelf, selector: query } = parseStringSelector(element);
	if (isSelf && query === '') return node;
	if (isSelf) return node.querySelector<T>(query) || undefined;
	return document.querySelector<T>(query) || undefined;
};
