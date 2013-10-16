

	var bindLoginUrlArray = new Array();
	bindLoginUrlArray[0] = "http://share.jd.com/qzone/login.action";
	bindLoginUrlArray[1] = "http://share.jd.com/sina/login.action";
	bindLoginUrlArray[2] = "http://share.jd.com/qqweibo/login.action";
	bindLoginUrlArray[3] = "http://share.jd.com/renren/login.action";
	bindLoginUrlArray[4] = "http://share.jd.com/kaixin001/login.action";
	bindLoginUrlArray[5] = "http://share.jd.com/douban/login.action";
	
	var getBindUrlArray = new Array();
	getBindUrlArray[0] = "http://share.jd.com/qzone/getBind.action";
	getBindUrlArray[1] = "http://share.jd.com/sina/getBind.action";
	getBindUrlArray[2] = "http://share.jd.com/qqweibo/getBind.action";
	getBindUrlArray[3] = "http://share.jd.com/renren/getBind.action";
	getBindUrlArray[4] = "http://share.jd.com/kaixin001/getBind.action";
	getBindUrlArray[5] = "http://share.jd.com/douban/getBind.action";
	
	var unBindUrlArray = new Array();
	unBindUrlArray[0] = "http://share.jd.com/qzone/unBind.action";
	unBindUrlArray[1] = "http://share.jd.com/sina/unBind.action";
	unBindUrlArray[2] = "http://share.jd.com/qqweibo/unBind.action";
	unBindUrlArray[3] = "http://share.jd.com/renren/unBind.action";
	unBindUrlArray[4] = "http://share.jd.com/kaixin001/unBind.action";
	unBindUrlArray[5] = "http://share.jd.com/douban/unBind.action";
	
	
	var thirdUrl = new Array();
	thirdUrl[0] = "http://user.qzone.qq.com/";
	thirdUrl[1] = "http://weibo.com/";
	thirdUrl[2] = "http://1.t.qq.com/";
	thirdUrl[3] = "http://www.renren.com/";
	thirdUrl[4] = "http://www.kaixin001.com/";
	thirdUrl[5] = "http://www.douban.com/";
	
	var thirdName = new Array();
	thirdName[0] = "QQ空间";
	thirdName[1] = "新浪微博";
	thirdName[2] = "腾讯微博";
	thirdName[3] = "人人网";
	thirdName[4] = "开心网";
	thirdName[5] = "豆瓣网";
	
	function finishBind(flag){
		jdThickBoxclose();
		var getBindUrl = getBindUrlArray[flag-1] + "?flag="+flag+"&callback=?";
    	jQuery.getJSON(getBindUrl,
			   function(result) {
			   if(result.errorCode == "0"){
						//alert(result.status);
						
						var nodeId = "#bind-type-" + flag;
						jQuery(nodeId + " li").remove(".fore3");
						jQuery(nodeId + " li").remove(".fore4");
						
						var html = "<li class=\"fore3\">绑定信息：<span class=\"u-img\">";
						html = html + "<a href=\"" + thirdUrl[flag-1] + "\" target=\"_blank\">";
                    	if(result.picUrl != '')
                    		html = html + "<img src=\""+result.picUrl+"\" align=\""+result.uname+"\" width=\"25\" height=\"25\">";
                    	else
                    		html = html + "<img src=\"http://club.jd.com/images/62.gif\" align=\""+result.uname+"\" width=\"25\" height=\"25\">";
						html = html + "</a>";
                    	html = html + "</span><a href=\"" + thirdUrl[flag-1] + "\" target=\"_blank\" class=\"u-name\">";
                    			
                    	html = html + result.uname + "</a>&nbsp;|&nbsp;<span class=\"ftx-03\">绑定有效期至" + result.endTimeStr
                    	+"</span><a href=\""+ bindLoginUrlArray[flag-1]+"\" target=\"_blank\" onclick=\"bind('" + flag +"')\" class=\"btn-link\">延长时间</a></li><li class=\"fore4\"><a href=\"javascript:void(0)\" class=\"btn-link01\" onclick=\"unBind('"+flag+"')\">解除绑定</a></li>";
						
						//alert(html);
						jQuery(nodeId).append(html);
						//reBound();//异步加载后重新绑定事件
					}else if(result.errorCode == "-1"){
					
					}else{
						bindFailThick();
						//alert("绑定失败!errorCode:" + result.errorCode);
					}
				});
	}
	
function unBind(flag){
	if (!confirm('是否解绑？')) {
            return;
        }
        jQuery.extend(jdModelCallCenter.settings, {
            clstag1: 0,
            clstag2: 0,
            flag: flag,
            fn: function() {
                jdModelCallCenter.unBindFunc(flag);
            }
        });
        jdModelCallCenter.settings.fn();
	}
	
	jQuery.extend(jdModelCallCenter, {
        unBindFunc: function(flag) {
            var getunBindUrl = unBindUrlArray[flag-1] +"?flag="+flag+"&callback=?";
            jQuery.login({
                modal: true,
                complete: function(result) {
                    if (result != null && result.IsAuthenticated != null && result.IsAuthenticated) {
                        jQuery.getJSON(getunBindUrl, 
						  			   { flag: flag },
                                        function(result) {
                            			   	if(result.errorCode == "0"){
                            					//alert(result.status);
                            						//替换节点
                            						var nodeId = "#bind-type-" + flag;
                            						jQuery(nodeId + " li").remove(".fore3");
                            						jQuery(nodeId + " li").remove(".fore4");
                            						
                            						var html = "<li class=\"fore4\"><a href=\""+bindLoginUrlArray[flag-1]+"\" target=\"_blank\" onclick=\"bind('" + flag +"')\" class=\"btn btn-11\"><s></s>立刻绑定</a></li>";
                            						//alert(html);
                            						jQuery(nodeId).append(html);
                            						//reBound();//异步加载后重新绑定事件
                            				}else{
                            					unbindFailThick();
                    							//alert("解绑失败！如果问题以旧存在，可能是相关平台繁忙，请稍候重试");
                            				}
                    					});
                    }
                }
            });
        }
    });

function bindFailThick(){
	setTimeout(function() {
       jQuery.jdThickBox({
        type: "text",
		width: 370,
		height: 120,
		_box:"flex02",
		source: "<div class=\"fxst\"><div class=\"fxst-t\"><s class=\"icon-warn03\"></s><strong class=\"ftx-04\">绑定失败，请重新绑定</strong></div><div class=\"fxst-c\"><p class=\"ftx-03\">如果问题依旧存在，可能是相关平台繁忙，请稍候重试</p></div><div class=\"btns\"><a href=\"javascript:void(0)\" class=\"btn btn-11\" onclick=\"jdThickBoxclose()\"><s></s>确定</a></div></div>",
		title: "温馨提示",
		_titleOn: true
            })
        }, 20)
}

function unbindFailThick(){
	setTimeout(function() {
       jQuery.jdThickBox({
        type: "text",
		width: 370,
		height: 120,
		_box:"flex02",
		source: "<div class=\"fxst\"><div class=\"fxst-t\"><s class=\"icon-warn03\"></s><strong class=\"ftx-04\">解绑失败</strong></div><div class=\"fxst-c\"><p class=\"ftx-03\">如果问题依旧存在，可能是相关平台繁忙，请稍候重试</p></div><div class=\"btns\"><a href=\"javascript:void(0)\" class=\"btn btn-11\" onclick=\"jdThickBoxclose()\"><s></s>确定</a></div></div>",
		title: "温馨提示",
		_titleOn: true
            })
        }, 20)
}

function bind(flag){
	setTimeout(function() {
       jQuery.jdThickBox({
		type: "text",
		width: 390,
		height: 140,
		_box:"flex01",
		source: "<div class=\"fxst\"><div class=\"fxst-t\"><strong>前往" + thirdName[flag-1] +"绑定帐号</strong></div><div class=\"btns\"><a href=\"javascript:void(0)\" class=\"btn btn-11\" onclick=\"finishBind('"+ flag +"')\"><s></s>完成连接</a><span class='ftx-03'>还未完成？请</span>&nbsp;<a href='" + bindLoginUrlArray[flag-1] +"' target='_blank' class='flk-05'>重新连接</a></div></div>",
		title: "帐号绑定",
		_titleOn: true
			})
        }, 20)
}


$("ul").hover(
  function () {
    $(this).addClass("select");
  },
  function () {
    $(this).removeClass("select");
  }
);

