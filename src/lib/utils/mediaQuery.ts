// import type { Action } from 'svelte/action';

// type MediaQueryActionOption = [
// 	mediaQueryString: string,
// 	onMatch: (node: HTMLElement) => ReturnType<Action>
// ];

/**
 * TODO: I'm reconsidering this...
 *
 * I thought it would be cool if we can do something like
 *
 * ```
 * <div use:mediaQueryAction={[
 * 	'(max-width: 768px)', (node) => inView(node, () => { ... }),
 * ]}
 * ```
 *
 * But things that kinda hold me back are:
 * - This is not the part of Motion One
 * - You gotta read the doc to understand the execution hierachy
 * - You cannot bring your own library to use with. eg one of my project
 *   has a media query svelte component and can be cooperate with `enabled`
 * - I probable have to write a helper function like
 *   `mediaQuery({ screen: ..., disabledOnReduceMotion: true })`
 *
 * So, for now, let's using `enabled` until I figure out the proper solution
 */
// export const mediaQueryAction: Action<HTMLElement, MediaQueryActionOption[]> = (node, options) => {
// 	let matchFn: ReturnType<Action> | undefined = undefined;

// 	let timeout: ReturnType<typeof setTimeout> | undefined;
// 	const updateMediaQuery = () => {
// 		clearTimeout(timeout);
// 		timeout = setTimeout(() => {
// 			for (const [mediaQueryString, onMatch] of options) {
// 				if (window.matchMedia(mediaQueryString).matches) {
// 					matchFn = onMatch(node);
// 					break;
// 				}
// 			}
// 		}, 100);
// 	};

// 	window.addEventListener('resize', updateMediaQuery, {
// 		passive: true
// 	});
// 	window.addEventListener('orientationchange', updateMediaQuery, {
// 		passive: true
// 	});

// 	return {
// 		destroy() {
// 			window.removeEventListener('resize', updateMediaQuery);
// 			window.removeEventListener('orientationchange', updateMediaQuery);
// 			matchFn?.destroy?.();
// 		}
// 	};
// };
