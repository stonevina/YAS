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
			if(node.nodeType == 1) {
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
			if(id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
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
		while((element = element.parentNode) && element.nodeType == 1) {
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
	}
};