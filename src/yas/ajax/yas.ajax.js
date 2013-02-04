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

		//HTTP请求类型
		type : options.type || 'POST',
		//请求地址
		url  : options.url || '',
		//请求的超时时间
		timeout : options.timeout || 5000,
		//请求是否异步
		async : options.async || true,
		
		//定义请求完成、成功、失败的回调函数
		onComplete : options.onComplete || function() {},
		onSuccess  : options.onSuccess || function() {},
		onError    : options.onError || function() {},
		
		//请求参数
		data : options.data || ''
		
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
	//创建XmlHttpRequest对象
	var xhq = getXHR();
	xhq.open(options.type, options.url, options.async);
};