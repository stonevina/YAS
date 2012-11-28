//yas.array.min
QUnit.test( 'yas.array.min', function( assert ) {
    
    var numbers = [10, 5, 100, 2, 1000];
	var $ = new yas.array();
	var result = $.min(numbers);
 
    assert.equal( result, 2, 'yas.array.min([10, 5, 100, 2, 1000]) equals 2' );
});

//yas.array.max
QUnit.test( 'yas.array.max', function( assert ) {
    
    var numbers = [10, 5, 100, 2, 1000];
	var $ = new yas.array();
	var result = $.max(numbers);
 
    assert.equal( result, 1000, 'yas.array.max([10, 5, 100, 2, 1000]) equals 1000' );
});

//yas.array.pad
QUnit.test( 'yas.array.max', function( assert ) {
	
	var $ = new yas.array();
	var result = $.pad(-23, 4);
 
    assert.equal( result, '-023', 'yas.array.pad(23, 4) equals -023' );
});

//yas.array.map
QUnit.test( 'yas.array.map', function( assert ) {
	
	var numbers = [1, 2, 3];
	var $ = new yas.array();
	var result = $.map(numbers, function(num){ return num * 3; });
 	
	//对比数组需要使用deepEqual方法
    deepEqual( result, [3, 6, 9], 'yas.array.map([1, 2, 3]) equals [3, 6, 9]' );
});

