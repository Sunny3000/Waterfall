//防抖
function Debounce(fn, delay) {
	var timer = null;
	return function () {
		var self = this,
			args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(self, args);
		}, delay);
	}
}