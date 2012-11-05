/**
 * @fileOverview yas处理数组常用方法，兼容ECMAScript 5+版本
 * 参考underscore.js && Tangram.js && kissy.js
 * @author wt
 * @version 1.0
 * @since 2012-11-05
 */
var yas = yas || {};

yas.array = function() {
	//保留基本对象的原型变量
	this.ArrayProto 		= Array.prototype;
	this.ObjProto 			= Object.prototype;
	this.FuncProto 			= Function.prototype;
	/**
	 * 用来判断对象类型
	 */
	this.toString			= this.ObjProto.toString;
	/**
	 * 用来判断属性是否是原有对象
	 */
	this.hasOwnProperty 	= this.ObjProto.hasOwnProperty;
	/**
	 * 终止循环条件
	 */
	this.breaker 			= {};
	
	// 定义ECMAScript 5+ 中的方法
	/**
	 * 遍历的方法
	 */
	this.nativeForEach 		= this.ArrayProto.forEach;
	/**
	 * 数组转换
	 */
	this.nativeMap  		= this.ArrayProto.map;
	/**
	 * 指定元素索引位置
	 */
	this.nativeIndexOf  	= this.ArrayProto.nativeIndexOf;
	/**
	 * 指定元素索引位置，从后往前查
	 */
	this.nativeLastIndexOf 	= this.ArrayProto.lastIndexOf;
	/**
	 * 是否是数组
	 */
	this.nativeIsArray   	= this.ArrayProto.isArray;
};

yas.array.prototype = {
	/**
	 * 遍历数组或对象中的所有元素
	 * @param {Array || Object} source 需要遍历的数组或对象
	 * @param {Function} iterator 遍历执行方法
	 * @param {Object} context 上下文环境
	 */
	each : function(source, iterator, context) {
		if(!!source && (typeof iterator !== 'function')) return;
		if(this.nativeForEach === source.forEach) {
			source.forEach(iterator, context);		
		} else if(source.length === +source.length) {
			for(var l = source.length; l--;) {
				if(iterator.call(context, source[l], l, source) === this.breaker) return;
			}
		} else {
			//针对对象
			for(var key in source) {
				//只处理原始的属性
				if(this.hasOwnProperty.call(source, key)) {
					if(iterator.call(context, source[key], key, source) === this.breaker) return;
				}
			}
		}
	},
	/**
	 * 遍历数组或对象中的所有元素
	 * @param {Array || Object} source 需要遍历的数组或对象
	 * @param {Function} iterator 转换方法
	 * @param {Object} context 上下文环境
	 * @return {Array} 转化后的新数组
	 */
	map : function(source, iterator, context) {
		var results = [];
		if(!!source && (typeof iterator !== 'function')) return;
		if(this.nativeMap === source.map) {
			return source.map(iterator, context);		
		} else {
			this.each(source, function(value, index, list) {
				results[results.length] = iterator.call(context, value, index, list);
			});
		}
		return results;
	},
	/**
	 * 返回数组或对象中的最大值
	 * @param {Array || Object} source 基础对象
	 * @param {Function} iterator 执行方法
	 * @param {Object} context	上下文环境
	 */
	max : function(source, iterator, context) {
		if(!iterator && this.isArray(source)) return Math.max.apply(Math, source);
		if(!iterator && !!source) return -Infinity;
		var result = {computed : -Infinity};
		this.each(source, function(value, index, list) {
			var computed = iterator ? iterator(contex, value, index, list) : value;
			computed >= result.computed && (result = {value : value, computed : computed});
		});
		return result.value;
	},
	/**
	 * 返回数组或对象中的最小值
	 * @param {Array || Object} source 基础对象
	 * @param {Function} iterator 执行方法
	 * @param {Object} context	上下文环境
	 */
	min : function(source, iterator, context) {
		if(!iterator && this.isArray(source)) return Math.min.apply(Math, source);
		if(!iterator && !!source) return Infinity;
		var result = {computed : Infinity};
		this.each(source, function(value, index, list) {
			var computed = iterator ? iterator(contex, value, index, list) : value;
			computed < result.computed && (result = {value : value, computed : computed});
		});
		return result.value;
	},
	/**
	 * 
	 */
	pad : function() {
	
	},
	empty : function() {
	
	},
	/**
	 * 判断对象是否是数组
	 * @param {Object} source 待判断对象
	 * @return {Boolean} 是否是数组
	 */
	isArray : nativeIsArray || function(source) {
		return this.toString.call(source) === '[object Array]';
	}
};