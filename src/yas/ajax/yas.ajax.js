/**
 * @fileOverview yas Ajax方法
 * @fileOverview http://www.w3school.com.cn/ajax/ajax_xmlhttprequest_create.asp
 * @author wt
 * @version 1.0
 * @since 2012-12-31
 */
var yas = yas || {};

yas.ajax = {
	/**
	 function(options) {
	
	 //请求参数
	options = {};
	
	/**
	 * 创建XMLHttpRequest
	 */
	var getXHR =
		if(XMLHttpRequest == undefined) {
			XMLHttpRequest = function() {
				return new ActiveXObject(
					navigator.userAgent.indexOf('MSIE 5') > 0 ?
					'Microsoft.XMLHTTP' : 'Msxml2.XMLHTTP'
				);
			};
		}
		return new XMLHttpRequest();
	}
};;
};