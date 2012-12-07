//yas.cookie.set
QUnit.test( 'yas.cookie.set', function( assert ) {
    
	var key = 's1';
	
	yas.cookie.set(key, key);
	
	QUnit.assert.ok(document.cookie.match(key + '=' + key), 'set success');
	
	yas.cookie.remove(key);
	
});

//yas.cookie.get
QUnit.test( 'yas.cookie.get', function( assert ) {
    
	document.cookie = 'g11=g1';
	
	QUnit.assert.ok(yas.cookie.get('g11') == 'g1', 'set success');
	
	yas.cookie.remove(key);
	
});

//yas.cookie.remove
QUnit.test( 'yas.cookie.remove', function( assert ) {
    
	document.cookie = 'g11=g1';
	
	yas.cookie.remove('g11');
	
	QUnit.assert.ok(yas.cookie.remove('g11') == null, 'set success');
	
});