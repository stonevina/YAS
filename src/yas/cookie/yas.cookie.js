/**
 * @fileOverview yas处理cookie通用方法
 * 参考Tangram.js && kissy.js
 * @description 注意点 
 * <ul>
 * 	<li>name相同、domain不同、path不同，则cookie也不同</li>
 * 	<li>name相同、domain相同、path相同，expires不同，则cookie相同</li>
 * <ul>
 * 目前方法只支持删除通过set方式添加的cookie，咱不支持跨域删除cookie，测试发现，设置path后，可能会造成无法删除cookie
 * @author wt
 * @version 1.0
 * @since 2012-12-03
 */
var yas = yas || {};

yas.cookie = {
	/**
	 * cookie内部变量
	 * @type 
	 */
	glob��码
		encode : encodeURIComponent,
		//解码
		decode : decodeURIComponent,
		doc : window.document,
		//毫秒级别
		MILLISECONDS_OF_DAY : 24 * 60 * 60 * 1000
	},
	/**
	 * 使用提供的键值设置cookie
	 * @param {String} name cookie名称
	 * @param {String} value  cookie值
	 * @param {Number | Date} expires 过期时间
	 * @param {String} domain cookie的domain
	 * @param {String} path	路径
	 * @param {Boolean} secure	是否可以通过https方式传到server端
	 * @param {Boolean} transform 是否要对value值进行编码
	 */
	set : function(name, value, ex,默认不e, value, expires, domain, path, secure, transform) {
		var date = expires,
			value = transform ? this.global.encode(value) : value;
		if(typeof expires == 'number') {
			date = new Date();
			date.setTime(date.getTime() + expires * this.global.MILLISECONDS_OF_DAY);
		}
		if(expires instanceof Date) {
			date = expires.toGMTString();	
		}
		document.cookie = name + '=' + value
						+ (expires ? '; expires=' + date : '')
						+ (path ? '; path=' + path : '')
						+ (domain ? '; domain=' + domain : '')
						+ (secure ? '; secure=' + secure : '');
	},	
	/**
	 * 根据name获取对应的cookie值
	 * @param {String} name
	 * @return {String} value cookie值
	 */
	get : function(name) {
		var reg = new RegExp('(?:^| )' + name + '(?:=([^;]*)|;|$)'),
//正则?表示匹配但不记录结果，推荐使用'),
			result = this.global.doc.cookie.match(reg)[1];
		return result ? result : '';
	},
	/**
	 * 利用expires设置过期的方式移除cookie
	 * @param {String} name 移除的cookie名称
	 * @param {String} domain cookie的domain
	 * @param {String} path cookie的path
	 * @param {Boolean} secure cookie的secure
	 */
	remove : function(name, domain, path, secure) {
		this.set(name, '', -1, domain, path, secure);
	}
};