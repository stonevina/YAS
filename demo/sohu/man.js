/**
 * 实现一个叫Man的类，包含attr, words, say三个方法。
 * @type 
 */
var Man;
//+++++++++++答题区域+++++++++++

	Man = function(obj) {
		if(!(this instanceof Man)) {
			return new Man(obj);
		}
		this.info = {
			fullname : '<用户未输入>',
			gender : '<用户未输入>',
			'words-limit' : '',
			'words-emote' : '',
			words : []
		};
		for(var k in obj) {
			this.info[k] = obj[k];
		}
	};
	
	Man.prototype = {
		attr : function(k, v) {
			if(typeof k === 'object') {
				for(var o in k) {
					this.info[o] = k[o];
				}
			} else {
				if(arguments.length > 1) {
					this.info[k] = v;
				} else {
					return this.info[k];
				}
			}
		},
		words : function(word) {
			this.info.words.push(word);
		},
		say : function() {
			var par = [];
			for(var i = 0, l = this.info['words-limit']; i < l; i++) {
				par.push(this.info.words[i]);
			}
			return this.info.fullname + this.info['words-emote'] + ':' + par.join('');
		}
	};

//+++++++++++答题结束+++++++++++

try{
        
        var me = Man({ fullname: "小红" });
        var she = new Man({ fullname: "小红" });
        
        console.group();
        console.info("我的名字是：" + me.attr("fullname") + "\n我的性别是：" + me.attr("gender"));
        console.groupEnd();
        /*------[执行结果]------

		我的名字是：小红
		我的性别是：<用户未输入>

        ------------------*/

        me.attr("fullname", "小明");
        me.attr("gender", "男");
        me.fullname = "废柴";
        me.gender = "人妖"; 
        she.attr("gender", "女");
        
        console.group();
        console.info("我的名字是：" + me.attr("fullname") + "\n我的性别是：" + me.attr("gender"));
        console.groupEnd();
        /*------[执行结果]------

		我的名字是：小明
		我的性别是：男

        ------------------*/
        
        console.group();
        console.info("我的名字是：" + she.attr("fullname") + "\n我的性别是：" + she.attr("gender"));
        console.groupEnd();
        /*------[执行结果]------

		我的名字是：小红
		我的性别是：女

        ------------------*/

        me.attr({
                "words-limit": 3,
                "words-emote": "微笑"
        });
        me.words("我喜欢看视频。");
        me.words("我们的办公室太漂亮了。");
        me.words("视频里美女真多！");
        me.words("我平时都看优酷！");
        
        console.group();
        console.log(me.say());
        /*------[执行结果]------

		小明微笑："我喜欢看视频。我们的办公室太漂亮了。视频里美女真多！"

        ------------------*/

        me.attr({
                "words-limit": 2,
                "words-emote": "喊"
        });

        console.log(me.say());
        console.groupEnd();
        /*------[执行结果]------

		小明喊："我喜欢看视频。我们的办公室太漂亮了。"

        ------------------*/
        
}catch(e){
        console.error("执行出错，错误信息: " + e);
}