//import yas.browser.js
//import yas.util.js

/**
 * @fileOverview yas DOM方法
 * @fileOverview http://www.w3school.com.cn/ajax/ajax_xmlhttprequest_create.asp
 * @fileOverview DOM操作详情参考 http://www.w3school.com.cn/xmldom/dom_htmlelement.asp 
 * http://www.w3school.com.cn/xmldom/dom_document.asp;http://www.w3school.com.cn/xmldom/dom_element.asp
 * http://www.w3school.com.cn/xmldom/dom_node.asp
 * @author wt
 * @version 1.0
 * @since 2013-3-11
 */
var yas = yas || {};

yas.dom = {
	/**
	 * 常用节点类型
	 * @type 
	 */
	NODE_TYPE : {
		/**
		 * 元素节点
		 * @type Number
		 */
		Element  : 1,
		/**
		 * 属性节点
		 * @type Number
		 */
		Attribute : 2,
		/**
		 * 文本节点
		 * @type Number
		 */
		Text : 3,
		/**
		 * CDATA节点
		 * @type Number
		 */
		CDATA : 4,
		/**
		 * 注释
		 * @type Number
		 */
		Comment : 8,
		/**
		 * document对象
		 * @type Number
		 */
		Document : 9
	},
	/**
	 * 将用户自定义的属性转化为标准属性
	 * @return {Ojbect} 标准属性集合
	 */
	_NAME_ATTR : (function() {
	    var result = {
	        'cellpadding': 'cellPadding',
	        'cellspacing': 'cellSpacing',
	        'colspan': 'colSpan',
	        'rowspan': 'rowSpan',
	        'valign': 'vAlign',
	        'usemap': 'useMap',
	        'frameborder': 'frameBorder'
	    };
	    
	    //需要引入yas.browser.js
	    if (yas.browser.browserType < 8) {
	        result['for'] = 'htmlFor';
	        result['class'] = 'className';
	    } else {
	        result['htmlFor'] = 'for';
	        result['className'] = 'class';
	    }
	    
	    return result;
	})(),
	/**
	 * 从目标元素开始搜索元素
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} direction 搜索方向,可选项(previousSibling,nextSibling)
	 * @param {String} start 开始搜索位置,可选项(firstChild,lastChild,previousSibling,nextSibling)
	 * @return {HTMLElement} 匹配元素，没有则返回null
	 */
	_matchNode : function(element, direction, start) {
		element = this.getElement(element);
		
		for(var node = element[start]; node; node = node[direction]) {
			if(node.nodeType == this.NODE_TYPE.Element) {
				return node;
			}
		}
		
		return null;
	},
	/**
	 * 从文档获取指定的DOM元素
	 * @param {String|HTMLElement} id 元素标识ID或者DOM元素
	 * @return {HTMLElement|null} 返回的DOM元素
	 */
	getElement : function(id) {
		//使用instanceof 方式判断  id = 'a', id instanceof String结果为false,使用new的方式可以返回true
		//推荐使用 id.constructor方式判断
		if(typeof id === 'string' || id.constructor === 'String' || id instanceof String) {
			return document.getElementById(id);
		} else {
			//nodeType= {元素element	 : 1, 属性attr ： 2, 文本text : 3, 注释comments : 8, 文档document : 9};
			if(id.nodeName && (id.nodeType == this.NODE_TYPE.Element || id.nodeType == this.NODE_TYPE.Document)) {
				return id;
			}
		}
		return null;
	},
	/**
	 * 创建新元素
	 * @param {String} 创建的元素标签
	 * @param {Object} 创建元素所附带的属性
	 * @return {HTMLElement} 创建的新元素
	 */
	createElement : function(tagName, opt_attributes) {
		var element = document.createElement(tagName),
			attributes = opt_attributes || {};
		return this.setAttrs(element, attributes);
	},
	/**
	 * 设置目标元素的属性
	 * @param {String|HTMLElement} element 目标元素
	 * @param {Object} attributes attributes 样式属性集合
	 * @return {HTMLElement} 目标元素
	 */
	setAttrs : function(element, attributes) {
		element = this.getElement(element);
		
		for(var key in attributes) {
			this.setAttr(element, key, attributes[key])
		}
		
		return element;
	},
	/**
	 * 设置目标元素的attribute
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} 属性名称 key
	 * @fileOverview 关于style.cssText，可参考http://www.css88.com/archives/1849
	 * @return {String} 属性值 val
	 * @return {HTMLElement} 目标元素 
	 */
	setAttr : function(element, key, val) {
		element = this.getElement(element);
		
		if(key === 'style') {
			element.style.cssText = val;
		} else {
			key = this._NAME_ATTR[key] || key;
			element.setAttribute(key, val);
		}
		
		return element;
	},
	/**
	 * 获取目标元素的属性值
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} key 需要获取值的属性名称
	 * @return {Ojbect} 返回对应属性的属性值
	 */
	getAttr : function(element, key) {
		element = this.getElement(element);
		
		if(key === 'style') {
			return element.style.cssText;
		} else {
			key = this._NAME_ATTR[key] || key;
			return element.getAttribute(key);
		}
	},
	/**
	 * 为目标元素添加class
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} className, 样式名称，允许添加多个，样式之间使用空格分离 
	 * @return {HTMLElement} 修改后的元素
	 */
	addClass : function(element, className) {
		element = this.getElement(element);
		
		//将空格使用正则的形式表示，不知道这有什么好处。。。
		var classArray = className.split(/^\s+/),
			result = element.className,
			classMatch  = ' ' + result + ' ',
			i = 0,
			l = classArray.length;
		
		for(; i < l; i++) {
			if(classMatch.indexOf(' ' + classArray[i] + ' ') < 0) {
				result = (result ? ' ' : '') + result;
			}
		}
		
		element.className = result;
		return element;
	},
	/**
	 * 获取目标元素的直接子元素列表
	 * @param {String|HTMLElement} 目标元素
	 * @return {Array} 目标元素的直接子元素列表
	 */
	getChildren : function(element) {
		element = this.getElement(element);
		
		//这里children是全局的，这是由于js中的作用域不是区块，是由function决定的
		for(var children = [], tmpEle = element.firstChild; tmpEle; tmpEle = tmpEle.nextSibling) {
			//只保存元素节点
			if(tmpEle.nodeType == 1) {
				children.push(tmpEle);
			} 
		}
		
		return children;
	},
	/**
	 * 判断一个元素是否包含另外一个元素
	 * @param {String|HTMLElement} container 包含的元素
	 * @param {String|HTMLElement} contained 被包含的元素
	 * @fileOverview 关于contains方法可参考 http://www.cnblogs.com/rubylouvre/archive/2011/05/30/1583523.html
	 * https://developer.mozilla.org/zh-CN/ 
	 * @return {Boolean} 是否包含
	 */
	contains : function(container, contained) {
		container = this.getElement(container);
		contained = this.getElement(contained);
		
		//PPK解决浏览器兼容问题，firefox 9+以上支持contains方法
		if(window.Node && Node.prototype && !Node.prototype.contains) {
			Node.prototype.contains = function(arg) {
				return !!(this.compareDocumentPosition(arg) & 16);
			};
		}
		
		return container.contains(contained);
	},
	/**
	 * 删除目标元素下面的所有子节点
	 * @param {String|HTMLElement} element 目标元素
	 * @return {HTMLElement} 目标元素
	 */
	deleteChildren : function(element) {
		element = this.getElement(element);
		
		while(element.firstChild) {
			element.removeChild(element.firstChild);
		}
		
		return element;
	},
	/**
	 * 返回元素的第一个子元素
	 * @param {String|HTMLElemnt} element 目标元素
	 * @return {HTMLElement} 匹配的结果元素，没有则返回null
	 */
	first : function(element) {
		return this._matchNode(element, 'nextSibling', 'firstChild');
	},
	/**
	 * 返回目标元素最近的符合条件的父元素
	 * @param {String|HTMLElement} element 目标元素
	 * @param {Function} method 过滤条件
 	 * @return {HTMLElement} 匹配元素，没有则返回null
	 */
	getAncestorBy : function(element, method) {
		element = this.getElement(element);
		
		//将多个条件放在while中可以减少不必要的循环
		while((element = element.parentNode) && element.nodeType == this.NODE_TYPE.Element) {
			if(method(element)) {
				return element;
			}
		}
		
		return null;
	},
	/**
	 * 返回目标元素指定className的父元素
	 * @description 常见字符表示，百度很喜欢用编码表示特殊字符
	 * 常见如下：\x24 = $,\xa0 = " ",\u3000 = "　",\t = "	"
	 * @param {String|HTMLString} element 目标元素
	 * @param {String} className 匹配的class属性
	 * @return {HTMLElement} 匹配元素，没有则返回null
	 */
	getAncestorByClass : function(element, className) {
		element = this.getElement(element);
		className = new RegExp('(^|\\s)' + yas.util.trim(className) + ('\\s|\x24'));
		
		element = this.getAncestorBy(element, function() {
			return className.test(element.className);
		});
		
		return element;
	},
	/**
	 * 返回目标元素指定tagName的父元素
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} tagName 匹配的tagName
	 * @return {HTMLElement} 匹配元素，没有则返回null
	 */
	getAncestorByTag : function(element, tagName) {
		element = this.getElement(element);
		tagName = new RegExp('(^|\\s)' + yas.util.trim(tagName) + ('\\s|\x24'));
		
		element = this.getAncestorBy(element, function() {
			return tagName.test(element.tagName);
		});
		
		return element;
	},
	/**
	 * 根据类名获取元素
	 * @param {String} className 类型，只支持单一class，如果为空，则返回空数组
	 * @param {String|HTMLElement} element 开始搜索的元素，不设置则默认使用document，找不到元素则返回空数组
	 * @param {String} tagName 标签名，可选项，不设置则在所有元素中遍历
	 * @return {Array} 元素集合 
	 */
	getElementByClassName : function(className, element, tagName) {
		var result = [], elements, len, node, trim = yas.util.trim, className = trim(className);
		
		//如果指定的类型为空或者为空字符串则直接返回空数组
		if(!className) {
			return result;
		}
		
		if(typeof element == 'undefined') {
			element = document;
		} else {
			element = this.getElement(element);
			if(!element) {
				return result;
			}
		}
		
		tagName && (tagName = trim(tagName).toUpperCase());
		
		//现代浏览器支持getElementByClasName
		if(element.getElementByClassName) {
			elements = element.getElementByClassName(className);
			len = elements.length;
			
			for(var i = 0; i < len; i++) {
				node = elements[i];
				if(tagName && node.tagName != tagName) {
					continue;
				}
				result[result.length] = node;
			}
		} else {
			className = new RegExp('(^|\x20)' + yas.util.escapeReg(className) + '(\x20|\x24)');
			elements = tagName ? element.getElementsByTagName(tagName) : (element.all || element.getElementsByTagName('*'));
			len = elements.length;
			
			for(var i = 0; i < len; i++) {
				node = elements[i];
				if(!className.test(node.className)) {
					continue;
				}
				result[result.length] = node;
				//OR
				//className.test(node.className) && (result[result.length] = node);
			}
		}
		
		return result;
	},
	/**
	 * 返回当前元素所在的文档节点
	 * @param {String|HTMLElement} element 当前元素
	 * @return {HTMLDocument} 返回文档节点,文档自身返回为null document.ownerDocument=null
	 */
	getDocument : function(element) {
	 	element = this.getElement(element);
	 	
	 	return element.nodeType == this.NODE_TYPE.Document ? element : element.ownerDocument;
	},
	/**
	 * 获取目标元素的目标属性计算css值
	 * @description getComputedStyle详见 http://blog.csdn.net/bill200711022/article/details/7744293
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} key 目标属性
	 * @return {String} 对应计算属性值, 没有返回null
	 */
	getComputedStyle : function(element, key) {
		element = this.getElement(element);
		
		var doc = this.getDocument(element), styles;
		//document.defaultView返回window
		if(doc.defaultView && doc.defaultView.getComputedStyle) {
			styles = doc.defaultView.getComputedStyle(element, null);
			return !!styles.length ? (style[key] || styles.getPropertyValue(key)) : null;
		}
	},
	/**
	 * 获取当前元素所属的window对象
	 * @param {String|HTMLElement} element 目标元素
	 * @return {window} window对象，没有则返回null
	 */
	getWindow : function(element) {
		var doc = this.getDocument(element);
		//docment.parentWindow目前只适合IE9-，对于其他的浏览器使用defaultView
		return doc.defaultView || doc.parentWindow || null;
	},
	/**
	 * 获取目标元素的当前样式
	 * @description style,currentStyle,computedStyle的区别,详见http://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/
	 * getPropertyValue不支持驼峰取值，style,currrentStyle需要使用驼峰形式，同时还有一些属性需要特殊处理，例如float，border等
	 * style取得是内嵌样式,取不到内联样式
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} key 目标属性
	 * @return {String} 对应的属性值，没有则返回null
	 */
	getCurrentStyle : function(element, key) {
		element = this.getElement(element);
		
		return element.currentSytle ? element.currrentStyle[key] : this.getComputedStyle(element, key) || element.style[key];
	},
	/**
	 * 获取目标元素的样式值,
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} key 目标属性
	 */
	getStyle : function(element, key) {
		//TODO:暂时么处理特殊的属性
		return this.getCurrentStyle(element, key) || (/**特殊的属性**/function() {
			
		})();
	},
	/**
	 * 返回目标元素的父节点
	 * Document > Node > Element
	 * @description 这个方法可以用getAncestorBy替代,暂时先保留
	 * @param {String|HTMLElement} element 目标元素
	 * @return {HTMLElement} 父节点，没有则返回null
	 */
	getParent : function(element) {
		element = this.getElement(element);
		
		//parentElement是IE专用
		return element.parentNode || element.parentElement || null;
	},
	/**
	 * 返回元素的节点内容
	 * @param {String|HTMLElement} element 目标元素
	 * @return {String} 文本内容
	 */
	getText : function(element) {
		element = this.getElement(element);
		
		var type = element.nodeType, i = 0, children, text = [];
		
		if(type == this.NODE_TYPE.CDATA || type == this.NODE_TYPE.Text) {
			text.push(element.nodeValue);
		} else {
			if(type != this.NODE_TYPE.Comment) {
				children = element.childNodes;
				//将子节点的文本都取出来
				for(var l = children.length; i < l; i++) {
					text.push(this.getText(children[i]));
				}
			}
		}
		
		return text.join('');
	},
	/**
	 * 检测目标元素是否包含指定的属性
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} attr 指定的属性
	 * @return {Boolean} 是否包含属性
	 */
	hasAttr : function(element, attr) {
		element = this.getElement(element);
		
		//getNamedItem返回指定的节点,attributes返回被选节点属性的NamedNodeMap，如果被选节点不是element，则返回null
		//NamedNodeMap表示一个无顺序的节点列表
		var node = element.attributes.getNamedItem(attr);
		//specified：如果在文档中设置了属性值，则直接返回true，如果是 DTD/Schema 中的默认值，则返回false
		return !!(node && node.specified);
	},
	/**
	 * 判断当前元素是否拥有指定属性
	 * @description 使用原生的方法hasAttribute进行判断
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} attr 指定的属性
	 * @return {Boolean} 是否包含属性
	 */
	hasAttribute : function(element, attr) {
		element = this.getElement(element);
		
		//该方法和hasAttr的区别是对于设置默认值的属性，返回true
		return element.hasAttribute(attr);
	},
	/**
	 * 判断元素是否拥有指定的className
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} className 类名，支持多个类名
	 * @return {Boolean} 是否存在
	 */
	hasClass : function(element, className) {
		element = this.getElement(element);

		if(!element || !element.className) return false;

		var classArray = yas.util.trim(className).split(/\s+/),
			len = classAray.length;
		className = element.className.split(/\s+/).join('\x20');
		
		while(len--) {
			if(new RegExp('(^|\x20)' + classArray[len] + '(\x24|\x20)').test(className)) {
				return true;				
			}
		}
		
		return false;
	},
	/**
	 * 隐藏元素
	 * @param {String|HTMLElement} element 目标元素
	 * @return {HTMLElement} 目标元素
	 */
	hide : function(element) {
		element = this.getElement(element);
		
		element.style.display = 'none';
		
		return element;
	},
	/**
	 * 根据已知节点和指定位置添加一个新节点
	 * @param {String|HTMLElement} newChild 新节点
	 * @param {String|HTMLElement} refChild 基准节点
	 * @param {String} 指定位置，可选择{before, after}，默认是before
	 * @return {String|HTMLElement} 新节点
	 */
	_insertNode : function(newChild, refChild, loc) {
		loc = loc || 'before';
		newChild = this.getElement(newChild);
		refChild = (loc ==='before' ? this.getElement(refChild) : 
					this.getElement(refChild).nextSibling);
		
		var refParent = refChild.parentNode;
		
		while(refParent) {
			refParent.insertBefore(newChild, refChild);
		}
		
		return this.getElement(refChild);
	},
	/**
	 * 在已知的节点之前添加一个节点
	 * @param {String|HTMLElement} newChild 新节点
	 * @param {String|HTMLElement} refChild 基准节点
	 * @return 新节点
	 */
	insertBefore : function(newChild, refChild) {
		return this._insertNode(newChild, refChild);
	},
	/**
	 * 在已知的节点之后添加一个节点
	 * @param {String|HTMLElement} newChild 新节点
	 * @param {String|HTMLElement} refChild 基准节点
	 * @return {String|HTMLElement} 新节点
	 */
	insertAfter : function(newChild, refChild) {
		return this._insertNode(newChild, refChild, 'after');
	},
	/**
	 * 添加HTMLE元素
	 */
	insertHTML : function() {
	
	},
	/**
	 * 返回元素最后一个子元素节点
	 * @param {String|HTMLElement} element 目标元素
	 * @return {HTMLElement} 子元素,没有则返回null
	 */
	last : function(element) {
		return this._matchNode(element, 'previousSibling', 'lastChild');
	},
	/**
	 * 返回元素紧跟的同级元素节点
	 * @param {String|HTMLElement} element 目标元素
	 * @return {HTMLElement} 紧跟元素,没有则返回null
	 */
	next : function(element) {
		return this._matchNode(element, 'nextSibling', 'nextSibling');
	},
	/**
	 * 判断浏览器是否支持opacity
	 * @param {String|HTMLElement} element 目标元素
	 * @return {Boolean} 是否支持opacity
	 */
	_isSupporOpacity : function(element) {
		element = this.getElement(element);
		return !!(element.style.opacity || (element.currentStyle && element.currentStyle.opacity) || '');
	},
	/**
	 * 设置目标元素的透明度，兼容主流浏览器
//	 * @description 这里主要参考jQuery写法，Tangram 1.x版本存在问题
	 * @param {String|HTMLElement} element
	 * @param {Number} opacity 透明度(0.0~1.0)
	 * @return {HTMLElement} 目标元素
	 */
	setOpacity : function(element, opacity) {
		element = this.getElement(element);
		
		var ralpha = /alpha\([^)]*\)/i,
			ropacity = /opacity=([^)]*)/;
		//IE9+以上支持opacity，不支持filter
		if(this._isSupporOpacity(element)) {
			element.style.opacity = opacity;
		} else {
			var style = element.style,
				currentStyle = element.currentStyle,
				opacity = yas.util.isNaN(opacity) ? '' : 'alpha(opacity=' + opacity * 100 + ')',
				filter = currentStyle && currentStyle.filter || style.filter || '';

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			//这里主要是处理IE的问题，使用opacity需要触发layout，这里使用zoom方式
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if (opacity >= 1 && yas.util.trim(filter.replace(ralpha, "")) === "") {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				//这里方式只适用IE，主要是移除之前的属性，方便后面添加，具体可参见http://help.dottoro.com/ljhutuuj.php
				style.removeAttribute("filter");

				//currentSytle 和 getComputedStyle 都是只读属性，修改需要借助element.style方式
				if (currentStyle && !currentStyle.filter) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test(filter) ?
				filter.replace(ralpha, opacity) :
				filter + ' ' + opacity;
		}
		
		return element;
	},
	/**
	 * 获取目标元素的opacity
	 * @param {String|HTMLElement} element 目标元素
	 * @return {String} 元素的opacity，类型为String 符合W3C规范
	 */
	getOpacity : function(element) {
		var ropacity = /opacity=([^)]*)/;
		
		element = this.getElement(elment);
		
		if(this._isSupporOpacity(element)) {
			return this.getStyle(element, 'opacity');
		} else {
			//这里优先使用currentStyle，因为这个样式是最终的结果
			return ropacity.test(element.currentStyle ? element.currentStyle.filter : element.style.filter || '') ? 
				(parseFloat(RegExp.$1) / 100) + '' : '';
		}
	},
	/**
	 * 返回目标元素的同级的前一个元素节点
	 * @param {String|HTMLElement} element 目标元素
	 * @return {HTMLElement} 前一个元素节点
	 */
	prev : function(element) {
		return this._matchNode(element, 'previousSibling', 'previousSibling');
	},
	/**
	 * 删除子节点列表的某个子节点
	 * @param {String|HTMLElement} node 要删除的节点
	 * @return {HTMLElement} 删除的节点，成功则返回该节点，失败则返回null
	 */
	remove : function(element) {
		element = this.getElement(element);
		return element.parentNode && element.parentNode.removeChild(element);
	},
	/**
	 * 移除目标元素指定的class
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} className 类名，支持多个class，使用空格分割
	 * @return {HTMLElement} 修改后的元素
	 */
	removeClass : function(element, className) {
		element = this.getElement(element);
		
		var oldClass = element.className.split('\x20'),
			newClass = className.split('\x20');
			
		for(var i = 0, nl = newClass.length; i < nl; i++) {
			for(var j = 0, ol = oldClass.length; j < ol; j++) {
				if(oldClass[j] == newClass[i]) {
					oldClass.splice(j, 1);
					break;
				}
			}
		}
		
		element.className = oldClass.join(' ');
		
		return element;
	},
	/**
	 * 移除样式的指定属性
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} property 删除的属性
	 * @return {HTMLElement} 修改后的元素
	 */
	removeStyle : function(element, property) {
		element = this.getElement(element);
		
		var style = element.style;
		//主流浏览器以及IE9+支持
		if(style.removeProperty) {
			//参数对大写小不敏感
			style.removeProperty(property);
		} else {
			property = yas.util.toCamelCase(property);
			//IE特有方法，属性需要驼峰标识
			style.removeAttribute(property);
		}
		
		return element;
	},
	/**
	 * 设置目标元素的样式
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} key 属性
	 * @param {String} value 值
	 * @return {HTMLElement} 目标元素
	 */
	setStyle : function(element, key, value) {
		
	},
	/**
	 * 批量设置目标元素的样式集
	 * @param {String|HTMLElement} element 目标元素
	 * @param {Object} styles 样式集
	 */
	setStyles : function(element, styles) {
	
	},
	/**
	 * 显示元素
	 * @param {String|HTMLElement} element 目标元素
	 * @return {HTMLElement} 目标元素
	 */
	show : function(element) {
		element = this.getElement(element);
		
		element.style.display = '';
		
		return element;
	},
	/**
	 * 切换元素的显示状态
	 * @param {String|HTMLElement} element
	 * @return {HTMLElement} 目标元素
	 */
	toggle : function(element) {
		element = this.getElement(element);
		
		element.style.display  = element.style.display == 'none' ? '' : 'none';
		
		return element;
	},
	/**
	 * 切换类名的添加与删除
	 * @param {String|HTMLElement} element 目标元素
	 * @param {String} className 类名
	 */
	toggleClass : function(element, className) {
		if(this.hasClass(element, className)) {
			this.removeClass(element, className);
		} else {
			this.addClass(element, className);
		}
	}
};

/**
 * TODO：需要更新的地方
 * 1)DOM方法体中基本都包含element的获取方法，这个需要优化，可以考虑放在一个方法中，只需要调用一次即可
 * 
 */

//style.cssText（只读属性）
//set方式不会报错，但不会生效
//get方式的属性需要使用驼峰标识（使用键值对）
//
//内容为标签内的style属性，其他均不能取到
//
//comStyle.cssText（只读属性）
//set方式不会报错，但不会生效
//get方式的属性对大小写不敏感，取不到内容（使用键值对）
//取值需要使用comStyle.getPropertyValue(),属性不能使用驼峰标识
//
//内容为计算后的样式值
//
//style（可读可写）
//style[property]，property对大小写不敏感
