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

export function getCookie(name) {
  const matches = document.cookie.match(
    // eslint-disable-next-line
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export function setCookie(name, value, props) {
  props = props || {}
  let exp = props.expires
  if (typeof exp == 'number' && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = props.expires = d
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString()
  }
  value = encodeURIComponent(value)
  let updatedCookie = name + '=' + value
  for (const propName in props) {
    updatedCookie += '; ' + propName
    const propValue = props[propName]
    if (propValue !== true) {
      updatedCookie += '=' + propValue
    }
  }
  document.cookie = updatedCookie
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 })
}

// function isValidDate(date) {
//   const dateWrapper = new Date(date);
//   return !isNaN(dateWrapper.getDate());
// }


// export function formatDate(date) {
//   if (!isValidDate(date)) return null;

//   const oldDate = DateTime.fromISO(date);
//   const timeZone = oldDate.offsetNameShort;
//   const time = oldDate.toLocaleString(DateTime.TIME_24_SIMPLE);
//   const day = oldDate.toRelativeCalendar();

//   const newDate = `${day}, ${time} ${timeZone}`;

//   return newDate;
// }