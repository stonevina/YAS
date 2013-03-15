/**
 * @fileOverview yas Ajax方法
 * @fileOverview http://www.w3school.com.cn/ajax/ajax_xmlhttprequest_create.asp
 * @author wt
 * @version 1.0
 * @since 2012-12-31
 */
var yas = yas || {};

yas.ajax = function(options) {
	
	 //请求参数
	options = {
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
		
		//服务端返回的数据类型
		dataType : options.dataType || ''
	};
	
	/**
	 * 创建XMLHttpRequest
	 */
	var getXHR = function() {
		if(XMLHttpRequest === undefined) {
			XMLHttpRequest = function() {
				return new ActiveXObject(
					navigator.userAgent.indexOf('MSIE 5') > 0 ?
					'Microsoft.XMLHTTP' : 'Msxml2.XMLHTTP'
				);
			};
		}
		return new XMLHttpRequest();
	};

	//创建XmlHttpRequest对象
	var xhq = getXHR();
	xhq.open(options.type, options.url, options.async);
	
	//超时时间
	var timeoutLength = options.timeout;
	//记录请求是否完成
	var requestDone = false;
	
	setTimeout(function() {
		requestDone = true;
	}, timeoutLength);
	
	xhq.onreadystatechange = function() {
		if(xhq.readyState == 4 && !requestDone) {
			if(httpSuccess(xhq)) {
				options.onSuccess(httpData(xhq, options.dataType));
			} else {
				options.onError();
			}
			
			options.onComplete();
			
			//避免内存泄漏
			xhq = null;
		}
	}; 
	
	//建立与服务器的连接
	xhq.send();
	
	function httpSuccess(r) {
		try {
			//得不到服务器状态，且请求本地文件，认为成功
			return !r.status && location.protocol == 'file:' || 
			//所有200~300的状态码表示成功
			(r.status >= 200 && r.status < 300) || 
			//文档未修改也算成功
			r.status == 304 ||
			//Safari在文档未修改时返回空状态
			navigator.userAgent.indexOf('Safari') >= 0 && typeof r.status === undefined;
		} catch(e) {}
		
		return false;
	};
	
	//从Http响应中解析数据
	function httpData(r, type) {
		//获取content-type的首部
		var ct = r.getResponseHeader('content-type');
		
		//如果没有提供返回类型，则需要检查是否是xml格式
		var data = !type && ct && ct.indexOf('xml') >= 0;
		
		//如果提供返回类型且为xml则返回 xml，否则返回文本
		data = type == 'xml' || data ? r.responseXML : r.responseText;
		
		//如果是script类型，则按照javascript的形式执行文本
		if(type == 'script') {
			eval.call(window, data);		
		}
		
		//返回相应数据
		return data;
	};
};