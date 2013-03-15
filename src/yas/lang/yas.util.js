/**
 * @fileOverview yas util方法，常用工具函数
 * @author wt
 * @version 1.0
 * @since 2013-3-3
 */
var yas = yas || {};
var yas = yas || {};

yas.util = {
	/**
	 * 将原对象的所有属性拷贝到目标对象中
	 * @param {Object} target 目标对象
	 * @param {Object} source 原对象
	 * @return {Object} 合并后的新对象
	 * 1.目标对象中和原对象key值相同的属性将会被覆盖
	 * 2.不合并source中prototype的属性
	 * @return {Object} 合并后的对象
	 */
	extend : function(target, source) {
		for(var k in source) {
			if(source.hasOwnProperty(k)) {
				target[k] = source[k];
			}
		}
		return extend;
	},
	/**
	 * 判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
	 * @description 这里和jQuery判断的写法类似
	 * @param {Object} obj 待判断对象
	 * @return {Boolean} 是否是字面量对象
	 */
	isPlain : function(obj) {
		var hasOwnProperty = Object.prototype.hasOwnProperty,
	        key;
	    if ( !obj ||
	         //一般的情况，直接用toString判断
	         Object.prototype.toString.call(obj) !== '[object Object]' ||
	         //IE下，window/document/document.body/HTMLElement/HTMLCollection/NodeList等DOM对象上一个语句为true
	         //isPrototypeOf挂在Object.prototype上的，因此所有的字面量都应该会有这个属性
	         //对于在window上挂了isPrototypeOf属性的情况，直接忽略不考虑
	         !('isPrototypeOf' in obj)
	       ) {
	        return false;
	    }
	
	    //判断new fun()自定义对象的情况
	    //constructor不是继承自原型链的
	    //并且原型中有isPrototypeOf方法才是Object
	    if ( obj.constructor &&
	        !hasOwnProperty.call(obj, 'constructor') &&
	        !hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf') ) {
	        return false;
	    }
	    //判断有继承的情况
	    //如果有一项是继承过来的，那么一定不是字面量Object
	    //OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
	    for ( key in obj ) {}
	    return key === undefined || hasOwnProperty.call( obj, key );
	},
	/**
	 * 删除字符串中的空格
	 * @param {String} source 目标源
	 * @param {String} location 删除空格的位置, 提供all, left, right，默认是删除两端
	 * @return {String} 修改后的字符串
	 */
	trim : function(source, location) {
		//正则表达式，包括删除两端、左边、右边的表达式
		var trimReg = {
			//两端
			all   : new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g'),
			//左侧
			left  : new RegExp('(^[\\s\\t\\xa0\\u3000]+)', 'g'),
			//右侧
			right : new RegExp('([\\u3000\\xa0\\s\\t]+\x24)', 'g')
		};
		
		location = location || 'all';
		
		return source.replace(trimReg[location], '');
	}
};