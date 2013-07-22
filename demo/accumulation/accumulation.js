/**
 * 主要总结下js中常见的技巧，常见问题，经典案例
 * @author wt
 * @version 1.0
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
	 * 验证对象是地址值传递,引用
	 */
	reference_use : function() {
		function setName(obj) {
			obj.name = 'test1';
			//这里对象的引用已经改变，不是之前的地址值，所以不是修改原始地址值所指的的对象内容
			obj = {};
			obj.name = 'test2';
		}
		
		var person = {};
		window.setName(person);
		console.info(person.name);//test1，不是test2
	},
	/**
	 * 总结下splice、slice、sub、substr、substring的区别
	 */
	example_6 : function() {
		var array = [1,2,2,3,4,5,6];
		
		//从一个数组中移除一个或多个元素，如果必要，在所移除元素的位置上插入新元素，返回所移除的元素。
		//arrayObj.splice(start, deleteCount, [item1[, item2[, . . . [,itemN]]]])
		array.splice(0,2,8);//[1,2],array = [8, 2, 3, 4, 5, 6]
		array.splice(0,2,8,9);//[1,2],array = [8, 9, 2, 3, 4, 5, 6]
		
		//返回一个数组的一段
		//arrayObj.slice(start, [end])
		array.slice(0, 3);//[1,2,2]
		
		//将 HTML 的 <SUB> 标识放置到 String 对象中的文本两端。
		'test'.sub();//<sub>test</sub>
		
		//返回一个从指定位置开始的指定长度的子字符串。
		//stringvar.substr(start [, length ])
		var str = 'Hello World!!';
		str.substring(0, 4);//Hell
		
		//返回位于 String 对象中指定位置的子字符串。 
		//stringvar.substring(start, end)
		//	substring 方法将返回一个包含从 start 到最后（不包含 end ）的子字符串的字符串。
		//		
		//	substring 方法使用 start 和 end 两者中的较小值作为子字符串的起始点。例如， strvar.substring(0, 3) 和 strvar.substring(3, 0) 将返回相同的子字符串。 
		//		
		//	如果 start 或 end 为 NaN 或者负数，那么将其替换为0。 
		//		
		//	子字符串的长度等于 start 和 end 之差的绝对值。例如，在 strvar.substring(0, 3) 和 strvar.substring(3, 0) 返回的子字符串的的长度是 3。 
		str.substring(3, 7);//lo W
	},
	/**
	 * callee方法的使用，使用递归的方式进行测试,它是指返回当前正在执行的函数
	 * 在测试的时候发现，同样一段程序，chrome的V8貌似不及FF啊！！
	 */
	callee_use : function() {
		//计算开始时间
		var t1 = new Date().getMilliseconds();
		var sum = function(n) {
			return n == 1 ? 1 : n + sum(n-1);
		};
		sum(3000);
		//计算结束时间
		var t2 = new Date().getMilliseconds();
		console.info('计算时间为：' + parseInt(t2 - t1, 10) + 'ms');//chrome 下2ms
		
		///<>------------------------华丽的分割线-------------------------------------------
		
		//计算开始时间
		var t1 = new Date().getMilliseconds();
		var sum = function(n) {
			return n == 1 ? 1 : n + arguments.callee(n-1);
		};
		sum(3000);
		//计算结束时间
		var t2 = new Date().getMilliseconds();
		console.info('计算时间为：' + parseInt(t2 - t1, 10) + 'ms');//chrome 下1ms
	},
	/**
	 * this的使用方式,分两种方式，一种是单纯的字面量，一种是原型链
	 */
	this_use : function() {
		//字面量
		var Test = {
			progress : 'old',
			start : function() {
				this.progress = 'new';
			}
		};
		var test = Test.start;
		//当前this指向的是window对象,window.progress == 'new'
		test();// == window.test();test.call(Test)可以将当前this强制指向Test，则Test.progress == new 
		console.info(test.hasOwnProperty('progress'))//false
		console.info(Test.progress);//old
		
		//字面量
		var Test = {
			progress : 'old',
			start : function() {
				this.progress = 'new';
			}
		};
		Test.start();
		console.info(Test.progress);//new
		
		//原型链,this指向的是对象
		var Test = function() {};
		Test.prototype = {
			progress : 'old',
			start : function() {
				//可以为对对象添加一个属性
				this.progress = 'new';
			}
		};
		
		var test = new Test();
		test.start();
		console.info(test.progress);//new
		console.info(test.hasOwnProperty('progress'));//true
		console.info(test.hasOwnProperty('start'));//false
	},
	/**
	 * toString()方法的使用
	 * ECMAScript 规定Boolean、Number、String等都是伪对象，所有对象都有toString的方法
	 */
	toString_use : function() {
		//Boolean类型的toString()，只输出true or false
		var bFound = false;
		console.info(bFound.toString());//"false"
		
		//Number类型具有两种模式，默认模式和基模式
		var iNum1 = 10;
		//默认模式 == toString(10)
		iNum1.toString();//10
		//基模式，可以指定机制
		iNum1.toString(2);//"1010"
		iNum1.toString(10);//"10"
		iNum1.toString(16);//"a"
		
		//Array，toString()方法和join()返回的结果相同
		var array = [1,2,3];
		array.toString();//"1,2,3"
	},
	/**
	 * AscII码的使用方法
	 */
	ascII_use : function() {
		var test = 'ab';
		var code = test.charCodeAt(0);//97
		String.fromCharCode(code);//"a"
	},
	/**
	 * isPrototypeOf的使用方法,
	 * 返回一个布尔值，指出对象是否存在于另一个对象的原型链中
	 */
	isPrototypeOf_use : function() {
		var i = 'a', m = String('b'), n = new String('c');
		console.info(String.prototype.isPrototypeOf(i));//false
		console.info(String.prototype.isPrototypeOf(m));//false
		console.info(String.prototype.isPrototypeOf(n));//true
		
		//i.constructor == function String() {[native code]};
		console.info(i.constructor == m.constructor && m.constructor == n.constructor);//true
	},
	/**
	 * 闭包补充应用
	 */
	closure_use : function() {
		//类型一
		var name = 'The Window';
		var object = {
			name : 'My Object',
			getNameFunc : function() {
				return function() {
					return this.name;
				}
			}
		};
		
		object.getNameFunc()();//'The Window'，this指的是window
		
		//类型二
		var name = 'The Window'
		var object = {
			name : 'My Object',
			getNameFunc : function() {
				//使用闭包保留对局部变量的引用
				var that = this;
				return function() {
					return that.name;
				}
			}
		};
		
		object.getNameFunc()();//'My Object'
	},
	/**
	 * 深度复制数组对象
	 * @param {Array} arr
	 */
	array_deepCopy_use : function(arr) {
		return arr.concat(0) || arr.slice(0);
	},
	/**
	 * 汉字和Unicode的相互转化
	 * dos命令native2ascii
	 */
	convert : function() {
		function ascii(str) {
			return str.replace(/[^\u0000-\u00FF]/g, function($0) {
						return escape($0).replace(/(%u)(\w{4})/gi, "\&#x$2;")
					});
		}
		function unicode(str) {
			return str.replace(/[^\u0000-\u00FF]/g, function($0) {
						return escape($0).replace(/(%u)(\w{4})/gi, "\\u$2")		
					});
		}
		function reconvert(str) {
			str = str.replace(/(\\u)(\w{4})/gi, function($0) {
						return (String.fromCharCode(parseInt((escape($0).replace(
										/(%5Cu)(\w{4})/g, "$2")), 16)));
					});
			str = str.replace(/(&#x)(\w{4});/gi, function($0) {
						return String.fromCharCode(parseInt(escape($0).replace(
										/(%26%23x)(\w{4})(%3B)/g, "$2"), 16));
					});
			return str;
		}
	},
	/**
	 * 对象初始化
	 */
	init : function() {
		({
		  x: 10,
		  foo: function () {
			function bar() {
			  console.log(x);
			  console.log(y);
			  console.log(this.x);//3
			}
			with (this) { //1
			  var x = 20;//所有的变量声明都放置在函数顶部声明,先声明，后执行，此时x y在foo的作用域中已经声明
			  var y = 30;
			  bar.call(this);//2
			}
		  }
		}).foo();
		//undefined 30 20
		//原因分析：1号位置的this指代的是那个对象，在with执行的过程中，会先在所指的对象中找，所有 x = 20,修改的是 x : 10的值,
		//y = 30，修改的是foo中的y，在bar中调用的时候，x, y分别指代的是foo中的局部变量，this.x是对象中的x，foo中的x只是声明
		//未赋值,注明：with会被删除
		
		//demo，在我们去搜寻__parent__之前，首先会去__proto__的链接中
		Object.prototype.x = 10;
 
		var w = 20;
		var y = 30;
		 
		// 在SpiderMonkey全局对象里
		// 例如，全局上下文的变量对象是从"Object.prototype"继承到的
		// 所以我们可以得到“没有声明的全局变量”
		// 因为可以从原型链中获取
		 
		console.log(x); // 10
		 
		(function foo() {
		 
		  // "foo" 是局部变量
		  var w = 40;
		  var x = 100;
		 
		  // "x" 可以从"Object.prototype"得到，注意值是10哦
		  // 因为{z: 50}是从它那里继承的
		 
		  with ({z: 50}) {
		    console.log(w, x, y , z); // 40, 10, 30, 50
		  }
		 
		  // 在"with"对象从作用域链删除之后
		  // x又可以从foo的上下文中得到了，注意这次值又回到了100哦
		  // "w" 也是局部变量
		  console.log(x, w); // 100, 40
		 
		  // 在浏览器里
		  // 我们可以通过如下语句来得到全局的w值
		  console.log(window.w); // 20
		 
		})();	
		
		//demo
		var x = 10, y = 10; 
		with ({x: 20}) { 
		  var x = 30, y = 30; 
		  console.info(x); // 30 
		  console.info(y); // 30 
		} 
		console.info(x); // 10 
		console.info(y); // 30
	}
};