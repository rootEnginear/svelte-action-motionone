let uniqueId = Date.now();
export const getUniqueId = () => {
	const a = uniqueId;
	uniqueId += 1;
	return a;
};
