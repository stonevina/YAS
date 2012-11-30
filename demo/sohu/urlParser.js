/**
 * 实现一个URI解析方法，把url里#之后的参数解析成指定的数据结构。
 * @param {String} s
 */
function urlParser(s){
        //+++++++++++答题区域+++++++++++
		var regexp = {
			sexp : /\?/
		};
		var str = s.split('#')[1].split('&'), result = [];
        
		//格式化参数数组，形如'[a=b, c=d]'
		var formatStr = function(objStr) {
			var obj = {}, str = [];
			for(var i = 0, l = objStr.length; i < l; i++) {
				var oj = objStr[i].split('=');
				obj[oj[0]] = oj[1] = (isNaN(oj[1]) ? '\"' + oj[1] + '\"' : +oj[1]);
			}
			return obj;
		};
			
		//不带？号的uri
		if(!regexp.sexp.test(str[0])) {
			result.push(formatStr(str));
			return result;
		} else {
			var temp = str[0].split('?');
				str.splice(0, 1, temp[1]);
			var prefix = temp[0].split('/').length > 1 ? temp[0].split('/').slice(0,2) : temp[0].split('/');
			prefix.push(formatStr(str));
			return prefix;
		}
		
        //+++++++++++答题结束+++++++++++
}

try{
        var url1 = "http://www.abc.com/m/s/#page/2/?type=latest_videos&page_size=20";
        var url2 = "http://www.abc.com/m/s/#type=latest_videos&page_size=20";
        var url3 = "http://www.abc.com/m/s/#page?type=latest_videos&page_size=20";

        console.group();
        console.info( urlParser(url1) );
        console.info( urlParser(url2) );
        console.info( urlParser(url3) );
        console.groupEnd();
        /*------[执行结果]------

        ["page", "2", { "type": "latest_videos", "page_size": 20 }]
        [{ "type": "latest_videos", "page_size": 20 }]
        ["page", { "type": "latest_videos", "page_size": 20 }]
        
        ------------------*/
        
}catch(e){
        console.error("执行出错，错误信息: " + e);
}