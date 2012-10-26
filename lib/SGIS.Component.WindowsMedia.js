/**
 *@description 这个脚本的功能主要是向网页中嵌入WMV格式的视频
 *<li>目前主要依赖于jQuery脚本库
 */
 registerNamespace("SGIS.Component.WindowsMedia");
 /**
 *创建一个windowsMedia对象，需要传递文件路径，这里的路径是相对于页面的路径，和脚本的位置无关
 * @param {} id  视频的id
 * @param {} w  视频的宽度
 * @param {} h  视频的高度
 * @param {} options  视频的配置参数，其中FileName参数为必选，其他的参数可选
 * @author wt
 */
SGIS.Component.WindowsMedia = function(id,w,h,options){
	
	//这里这样写的目的是为了在jQuery中也可以使用this，如果不这样的，this将不再指向该对象
	var that = this;
	
	this.params = new Object();
	this.attributes = new Object();
	
	/**
	 * 系统所有的配置参数
	 */
	this.settings = {
		AutoRewind : 1,
		FileName : "",//这里是视频文件的路径
		ShowControls : 1,
		ShowPositionControls : 1,
		ShowAudioControls : 1,
		ShowTracker : 1,
		ShowDisplay : 0, 
		ShowStatusBar : 1,
		ShowGotoBar : 0,
		ShowCaptioning : 0,
		AutoStart : 0,
		Volume : -2500,
		AnimationAtStart : 1,
		TransparentAtStart : 0,
		AllowChangeDisplaySize : 0,
		AllowScan : 0,
		EnableContextMenu : 0,
		ClickToPlay : 0
	};
	
	//合并视频所需的参数
	jQuery.extend(this.settings,options);
	
	jQuery.each(this.settings,function(i,n){
		that.addParam(i,n);
	})
	
	if(id) {
		this.setAttribute("id",id);
	}
	if(w) {
		this.setAttribute("width",w);
	}
	if(h) {
		this.setAttribute("height",h);
	}
}

SGIS.Component.WindowsMedia.prototype = {
	setAttribute : function(name,value){
		this.attributes[name] = value;
	},
	getAttribute : function(name){
		return this.attributes[name];
	},
	addParam : function(name,value){
		this.params[name] = value;
	},
	getParams : function(){
		return this.params;
	},
	getWMVHTML : function() {
		var wmvNode = "";
		wmvNode = '<object id="'+ this.getAttribute('id') +'" classid="CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,5,715" standby="Loading Microsoft Windows Media Player components..." type="application/x-oleobject" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'">';
		var params = this.getParams();
		for(var key in params) {
		 wmvNode += '<param name="'+ key +'" value="'+ params[key] +'" />';
		}
		wmvNode += "</object>";
		return wmvNode;
	},
	/**
	 * 这里的id为视频渲染的容器id
	 * @param {} elementId
	 */
	render : function(elementId){
		$("#"+elementId).html(this.getWMVHTML());
	},
	show : function(){
		$("#"+this.getAttribute('id')).show();
	},
	hide : function(){
		$("#"+this.getAttribute('id')).hide();;
	}
};