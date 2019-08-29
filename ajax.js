function ajaxFunc(method, url, data, callback, flag) {
	var xhr = null;
	//生成ajax对象
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHttp")
	}
	method = method.toUpperCase();

	//判断请求方式
	if (method == 'GET') {
		xhr.open(method, url + "?" + data, flag);
		xhr.send();
	} else if (method == "POST") {
		xhr.open(method, url, flag);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
		xhr.send(data);
	}
	//监听状态码
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				callback(xhr.responseText);
			}
		}
	}
}