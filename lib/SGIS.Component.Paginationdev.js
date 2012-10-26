registerNamespace("SGIS.Component.Pagination");

/**
 * @param {String} pgId 分页容器的id
 * @param {JSONObject} data 分页的数据
 * @param {int} totalRecord 分页的记录总条数
 * @param {int} perPage 每页的记录数
 * @param {int} width	分页容器的宽度
 * @param {int} height	分页容器的高度
 * @param {String} templateId 模版id
 * @param {Function} onComplete 回调函数，主要用于在切换页码时回调
 */
SGIS.Component.Pagination = function(pgId,data,totalRecord,perPage,width,height,templateId,onComplete,map){
	this.pgId = pgId;
	this.data = data;
	this.totalRecord = totalRecord;
	this.perPage = perPage;
	
	//设置分页容器的css
	this.width = width || {};
	this.height = height;

	//加载分页数据时所使用到的模板
	this.templateId = templateId || {};
	
	//回调函数
	this.onComplete = onComplete || {};
	
	//可选参数
	this.map = map ||{};
	
	//总页数
	this.totalPage = Math.ceil(this.totalRecord/this.perPage);
	//当前页
	this.currentPage = 1;
	//当前起始页
	this.startRecord = null;
	//当前结束页
	this.endRecord = null;
	
	//点击不同按钮所对应的枚举值
	this.forwordEnum = {
		first : 1, //首页
		prev : -1,  //上页
		next : 1,  //下页
		last : this.totalPage  //尾页
	};
	//过滤搜索框中的提示文本
	this.alertInfor = "请输入关键字";
	
	this.databackup = data;//备份数据
};

SGIS.Component.Pagination.prototype = {
	//分页容器初始化
	init : function(){
		//填充各种div
		$("#"+this.pgId).html(this.addFilterbar()+this.addContainer()+this.addToolbar());
		//加载数据&&添加按钮事件
		this.getStartEnd().loadData().refresh().addEvent("pgFirst,pgPrev,pgNext,pgLast").addFilterEvent();
		
		var _this = this;
		
		if(Object.prototype.toString.call(this.map) === '[object Function]') {
			$("#showDetails").live("click",function() {
				_this.map();
			});
		} else {
			$("#showDetails").hide();
		}
	},
	//添加分页的容器
	addContainer : function(){
		var temp = "<div id= 'pgContainer' class='ui-content' style='height:" + (this.height-30) + "px;width:100%;overflow-y:auto;'><ul></ul></div>";
		return temp;
	},
	//添加过滤搜索框
	addFilterbar : function(){
		var temp = ["<div class='ui-bbox' id='result-t'>"];
		temp.push("<input type='text' id='j-filterText' style='vertical-align:middle;font-family: 微软雅黑;' value='" + this.alertInfor + "'/>");
		temp.push("<span class='ui-button' style='margin-left:10px;vertical-align:middle;'>");
		temp.push("<a href='javascript:void(0);' id='j-filterBtn'><span>搜索</span></a>");
		temp.push("<a href='javascript:void(0)' id='showDetails'><span>详细</span></a>")
		temp.push("</span></div>");
		return temp.join("");
	},
	//添加分页容器的工具栏
	addToolbar : function(){
		//采用引用类型进行拼串，比直接用字符串效率高
		var temp = [];
		temp.push("<div class='pgToolbar'><div class='pgPanel'>");
		temp.push("<div class='pgSearchInfo'>共" + this.totalRecord + "条记录</div>");
		temp.push("<div category='first' class='pgBtn pgFirst' title='首页'></div>");
		temp.push("<div category='prev' class='pgBtn pgPrev' title='上页'></div>");
//		temp.push("<div class='separator'></div>");
		temp.push("<div>第 <input class='pgCurrentPage' type='text' value=" + this.currentPage + " title='页码' />/" + this.totalPage + "页</div>");
//		temp.push("<div class='separator'></div>");
		temp.push("<div category='next' class='pgBtn pgNext' title='下页'></div>");
		temp.push("<div category='last' class='pgBtn pgLast' title='尾页'></div>");
		temp.push("</div></div>");
		return temp.join("");
	},
	//加载数据
	loadData : function(){
		this.data.length == 0 ? alert("查询结果为空") : "";
		var c = $("#pgContainer ul").empty();
		var template = SGIS.Util.template($("#"+this.templateId).html());
		for(var i = this.startRecord-1; i <= this.endRecord-1; i++){
			c.append(template(this.data[i]));
		}
		return this;
	},
	//首页、上页、下页、尾页响应事件,需要传入按钮的class
	addEvent : function(className){
		var that = this;
		var o = className.split(",");
		for(var i = 0; i < o.length; i++){
			$("."+o[i]).click(function(event){
				event.stopPropagation();//阻止冒泡
				var loc = $(this).attr("category");
				if(that.currentPage == 1&&(loc == 'first' ||loc == 'prev')){ //当前是第一页的话
					that.refresh();
				}else if(that.currentPage == that.totalPage&&(loc == 'next' ||loc == 'last')){//当前是最后一页的话
					that.refresh();
				}else{
					var reg = /^first$|^last$/; 
					//单独处理第一页和最后一页按钮的currentPage
					reg.test(loc) ? that.currentPage = eval("that.forwordEnum."+loc) : that.currentPage += eval("that.forwordEnum."+loc);
					that.getStartEnd().refresh().loadData();
				}
				
				//增加额外的回调
				Object.prototype.toString.call(that.onComplete) === '[object Function]' ? Function.call(that.onComplete,{data : that.getCurrentPageData().data}) : null;
			});
		}
		return this;
	},
	//添加过滤搜索框的事件
	addFilterEvent : function(){
		var that = this;
		
		//搜索文本框中的各种事件
		$("#j-filterText").bind({
			focus : function(){
				$(this).val() == that.alertInfor ? $(this).val("") : "";
			},
			blur : function(){
				$(this).val() == "" ? $(this).val(that.alertInfor) : "";
			},
			keydown : function(e){
				//回车
				if (e.keyCode == 13) {$("#j-filterBtn").click();};
				//ESC
				if (e.keyCode == 27) {$(this).val("").focus();}
			}
		});
		
		//搜索按钮单击事件的回调
		var callback = function(){
			var _filterText = $("#j-filterText").val();
			_filterText == that.alertInfor ? _filterText = "" : "";		//主要是为了在不输入关键字的情况下显示所有的结果
			that.data = $.grep(that.databackup,function(o,i){
				//这里主要考虑到产业布局的系统中的单位名称代码不是 name而是dwxxmc，所以在这稍作修改
				var name = o.NAME || o.name;//这里主要是做空间查询后，返回的结果中指标的大小写
				return (name ? name.indexOf(_filterText) != -1 : o.dwxxmc.indexOf(_filterText) != -1);	
			});
			that.totalRecord = that.data.length;
			that.totalPage = Math.ceil(that.totalRecord/that.perPage);
			
			//添加下面两句是为了在筛选结果后结果列表中的记录条数和总页数也能更新，暂保留
			$(".pgSearchInfo").html("共&nbsp;" + that.totalRecord + "&nbsp;条记录");
			$(".pgCurrentPage").get(0).nextSibling.nodeValue = "/" + that.totalPage + "页";
			
			that.getStartEnd().refresh().loadData();//提供简单的链式调用
			
			//搜索结果列表更新后，地图上面的点更新
			$("div[category='first']").click();
			
			//增加额外的回调
			
			Object.prototype.toString.call(that.onComplete) === '[object Function]' ? Function.call(that.onComplete,{data : that.getCurrentPageData().data}) : null;
			
		};
		
		$("#j-filterBtn").bind({
			click : callback
		});
	},
	//获取当前页的开始和结束记录，用于在加载数据时使用
	getStartEnd : function(){
//		this.data.length == 0 ? "" : this.currentPage = 1;
		this.startRecord = (this.currentPage - 1)*this.perPage+1;
		this.endRecord = Math.min(this.currentPage*this.perPage,this.totalRecord);
		return this;
	},
	//获取当前页的数据
	getCurrentPageData : function(){
		var _this = this;
		return {
			data : $.grep(_this.data,function(k,v){return (v >= _this.startRecord - 1 && v <= _this.endRecord - 1)})
		}
	},
	//更新分页容器的工具栏
	refresh : function(){
		$(".pgCurrentPage").val(this.currentPage);
		if(this.currentPage == this.totalPage){
			$(".pgNext").addClass("pgNextDisabled");
			$(".pgLast").addClass("pgLastDisabled");
			$(".pgPrev").removeClass("pgPrevDisabled");
			$(".pgFirst").removeClass("pgFirstDisabled");
		}else if(this.currentPage == 1){
			$(".pgPrev").addClass("pgPrevDisabled");
			$(".pgFirst").addClass("pgFirstDisabled");
			$(".pgNext").removeClass("pgNextDisabled");
			$(".pgLast").removeClass("pgLastDisabled");
		}else {
			$(".pgNext").removeClass("pgNextDisabled");
			$(".pgPrev").removeClass("pgPrevDisabled");
			$(".pgFirst").removeClass("pgFirstDisabled");
			$(".pgLast").removeClass("pgLastDisabled");
		}
		return this;
	}
};