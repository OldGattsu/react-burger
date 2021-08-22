export const getAbsoluteHeight = (el) => {
	const styles = window.getComputedStyle(el);
	const margin = parseFloat(styles['marginTop']) +
		parseFloat(styles['marginBottom']);

	return Math.ceil(el.offsetHeight + margin);
}

export const getScrollBoxHeight = (container, scrollBoxClass) => {
	const containerHeight = container.offsetHeight
	let heightRemainingElements = 0

	container.childNodes.forEach(el => {
		if (el.className.indexOf(scrollBoxClass) === -1) {
			heightRemainingElements += getAbsoluteHeight(el)
		}
	});

	return (containerHeight - heightRemainingElements) + 'px'
}
