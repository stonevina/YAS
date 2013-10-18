require.config({
	//设置路径别名
	paths : {
		'lib' : '../lib'
	}
});

//采用wrapper方式模拟AMD
require([
	'app',
	'lib/jquery/wrapper',
	'lib/backbone/wrapper'
], function(app, $, Backbone) {
	app.initialize($);
	console.info($().jquery);
	console.info(Backbone);
});