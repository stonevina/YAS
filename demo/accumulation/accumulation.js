/**
 * 主要总结下js中常见的技巧，常见问题，经典案例
 * @author wt
 * @since 2013-3-11
 */
var yas = {
	/**
	 * 创建xmlHttpRequest对象
	 * @fileOverview http://www.w3school.com.cn/xml/xml_parser.asp
	 * @return {XMLHttpRequest} xhq XMLHttpRequest对象
	 */
	getXHR : function() {
		if(XMLHttpRequest === undefined) {
			XMLHttpRequest = function() {
				return new ActiveXObject(
					navigator.userAgent.indexOf('MSIE 5') > 0 ? 
					'Microsoft.XMLHTTP' : 'Msxml2.XMLHTTP'
				);
			};
		}
		return new XMLHttpRequest();
	},
	/**
	 * 解析XML文件
	 * @param {String} url xml文件的路径
	 */
	loadXmlFile : function(url) {
		var xhq = this.getXHR(), xmlDoc;
		xhq.open('GET', url, false);
		xhq.send();
		xmlDoc = xhq.responseXML;
		return xmlDoc;
	},
	/**
	 * 解析XML文本
	 */
	loadXmlText : function() {
		var xmlDoc;
		//非IE系列
		if(window.DOMParser) {
			var parser = new DOMParser();
			//将字符串txt载入解析器
			xmlDoc = parser.parseFromString(txt,'text/xml');
		} else {
			var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
			xmlDoc.async = false;
			//loadXML用于加载文本，load用于加载文件
			xmlDoc.loadXML(txt);
		}
		return xmlDoc;
	},
	/**
	 * 同一个上下文中，闭包使用的是同一个作用域，即闭包中的变量是运行后的最后结果
	 * 解决的方式是增加一层闭包，改变上下文
	 */
	example_1 : function() {
		//修改前
		var data = [];
		for(var i = 0; i < 3; i++) {
			data[i] = function() {
				alert(i);
			};
		}
		data[0]();//3
		data[1]();//3
		data[2]();//3
		//修改后
		var m_data = [];
		for(var i = 0; i < 3; i++) {
			m_data[i] = (function(x) {
				return function() {
					alert(x);
				};
			})(i);
		}
		m_data[0]();//0
		m_data[1]();//1
		m_data[2]();//2
		//或者也可以采用下面这种方式
		var m_data2 = [];
		for(var i = 0; i < 3; i++) {
			(m_data2[i] = function() {
				//callee 返回正被执行的 Function 对象，也就是所指定的 Function 对象的正文。
				alert(arguments.callee.x);
			}).x = k;
		}
		m_data2[0]();//0
		m_data2[1]();//1
		m_data2[2]();//2
	},
	/**
	 * 传值与引用的区别，对于基本数据类型是传值，对于复合数据类型是引用
	 */
	example_2 : function() {
		//基本类型，包括字符串、数值、布尔
		i = 4;//4
		m = i;//4
		i = 5;//5
		m;//4
		//复合数据类型，包括对象和数组
		i = [1,2,3];//[1, 2, 3]
		m = i;//[1, 2, 3]
		i.push(4);//4
		i;//[1, 2, 3, 4]
		m;//[1, 2, 3, 4]
		
		i = {a : 3, b : 5};//Object
		m = i;//Object
		i.c = 4;//4
		i;//{a : 3, b : 5, c : 4}
		m;//{a : 3, b : 5, c : 4}
		//特殊数据类型，包括Null和Undefined
	},
	/**
	 * for循环的变量问题
	 */
	example_3 : function() {
		for(var k = 3, i = 0; i < 3; i++) {};
		//这里k是全局的，不受区块限制
		k;//3
	},
	/**
	 * jQuery noConflict机制解析
	 * @description 这里要注意js中的传递，都是值传递，对于基本类型会传递自身的拷贝，
	 * 对于引用类型是传递地址值
	 */
	example_4 : function() {
		//基本类型
		//var $ = 1;
		//var jQuery = 'a';
		
		//复合类型
		var $ = [1,2,3];
		var jQuery = {a : 1, b : 2};
		
		(function(window, undefined) {
			var jQuery = (function() {
			
				var jQuery = function() {};
				_jQuery = window.jQuery;
				_$ = window.$;
				console.info(_jQuery);
				console.info(_$);
				
				jQuery.noConflict = function(deep) {
					if ( window.$ === jQuery ) {
						window.$ = _$;
					}
		
					if ( deep && window.jQuery === jQuery ) {
						window.jQuery = _jQuery;
					}
		
					return jQuery;
				}
				
				return jQuery;
			})();
			//这里虽然是赋值，但是不会影响之前的_jQuery 和 _$的值，因为它们的值是最早值得拷贝或者是地址值
			window.jQuery = window.$ = jQuery;
			console.info(_jQuery);
			console.info(_$);
		})(window);

		//解决冲突之后插件失效的问题
		var query = jQuery.noConflict(true);
		(function ($) {
		     // 插件或其他形式的代码，也可以将参数设为 jQuery
		})(query);
	},
	/**
	 * 验证对象是地址值传递
	 */
	example_5 : function() {
		function setName(obj) {
			obj.name = 'test1';
			//这里对象的引用已经改变，不是之前的地址值，所以不是修改原始地址值所指的的对象内容
			obj = {};
			obj.name = 'test2';
		}
		
		var person = {};
		window.setName(person);
		console.info(person.name);//test1，不是test2
	}
};