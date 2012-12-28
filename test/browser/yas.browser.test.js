//yas.browser.test
QUnit.test( 'yas.browser.test', function( assert ) {
    
    var engine  = yas.browser.engine,
    	browser = yas.browser.browserType,
    	system	= yas.browser.system;
    	
        //rendering engines
    var _engine = {            
        ie: 7,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,

        //complete version
        ver: '7.0'  
    };
    
    //browsers
    var _browser = {
        
        //browsers
        ie: 7,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,

        //specific version
        ver: '7.0'
    };

    
    //platform/device/OS
    var _system = {
        win: '7',
        mac: false,
        x11: false,
        
        //mobile devices
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,
        
        //game systems
        wii: false,
        ps: false 
    };   
	
	deepEqual( engine, _engine, 'engine print' );
	deepEqual( browser, _browser, 'browser print' );
	deepEqual( system, _system, 'system print' );
	 
});