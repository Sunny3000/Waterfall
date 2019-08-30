//dom -> 放图片的父级容器
//urls -> 图片的数据
//width -> 固定的宽度

function waterfall(dom, urls, width) {
	// console.log(imgs);

	var columns,
		space,
		gap;

	//创建图片
	function modifiedImg(urls) {
		// console.log(urls);
		urls.forEach(ele => {
			var oImg = new Image();
			oImg.src = ele;
			oImg.style.width = width + 'px';
			oImg.onload = function() {
				setImgPosition();
				// console.log(dom.clientHeight);
			}
			dom.appendChild(oImg);
		})

	}

	modifiedImg(urls);


	//计算列数，间隙大小
	function cal() {
		var domW = parseInt(dom.clientWidth);
		columns = parseInt(domW / width);
		space = Math.floor(domW - columns * width);
		gap = space / (columns + 1);
	}


	//设置图片的位置（先构造出一个列数大小的数组，开始时数组内每一项都是0，之后不断更新数组内每个数的值（每张图片的高），通过判断值最小值来插入图片）
	function setImgPosition() {
		//存放图片的纵轴坐标
		cal();
		var colY = new Array(columns);
		colY.fill(0);
		// console.log(colY);
		for (var i = 0; i < dom.children.length; i ++) {
			var img = dom.children[i];
			// console.log(img);
			var y = Math.min(...colY);
			//判断index在第几列
			var index = colY.indexOf(y);
			//知道第几列后，计算横坐标x的位置
			var x = (index + 1) * gap + index * width;
			img.style.left = x + 'px';
			img.style.top = y + 'px';

			//更新数组
			colY[index] += parseInt(img.height) + gap;

			var supHeight = Math.max(...colY);
			dom.style.height = supHeight + 'px';
		}
	}

	setImgPosition();


	//当窗口大小变化时，重新渲染
	window.onresize = Debounce(setImgPosition, 500);

	

























}