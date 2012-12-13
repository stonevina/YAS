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
QUnit.test( 'yas.array.pad', function( assert ) {
	
	var $ = new yas.array();
	var result = $.pad(-23, 4);
 
    assert.equal( result, '-023', 'yas.array.pad(23, 4) equals -023' );
});

//yas.array.map
QUnit.test( 'yas.array.map', function( assert ) {
	
	var numbers = [1, 2, 3];
	var $ = new yas.array();
	var result = $.map(numbers, function(num){ return num * 3; });
 	
	//对比数组等对象需要使用deepEqual方法
    deepEqual( result, [3, 6, 9], 'yas.array.map([1, 2, 3]) equals [3, 6, 9]' );
});

//yas.array.indexOf
QUnit.test( 'yas.array.indexOf', function( assert ) {
	
	var numbers = [45, 78, 98, 345, 656, 32343];
	var $ = new yas.array();
	var result = $.indexOf(numbers, 656);
 	
    assert.equal( result, 4, 'yas.array.indexOf([45, 78, 98, 345, 656, 32343]) equals 4' );
});

//yas.array.lastIndexOf
QUnit.test( 'yas.array.lastIndexOf', function( assert ) {
	
	var numbers = [45, 78, 98, 345, 656, 32343];
	var $ = new yas.array();
	var result = $.lastIndexOf(numbers, 656);
 	
    assert.equal( result, 4, 'yas.array.lastIndexOf([45, 78, 98, 345, 656, 32343]) equals 4' );
});

//yas.array.remove
QUnit.test( 'yas.array.remove', function( assert ) {
	
	var numbers = [45, 78, 98, 345, 656, 32343, 656];
	var $ = new yas.array();
	var result = $.remove(numbers, 656);
 	
	//对比数组等对象需要使用deepEqual方法
    deepEqual( result, [45, 78, 98, 345, 32343], 'yas.array.remove([45, 78, 98, 345, 656, 32343, 656], 656) equals [45, 78, 98, 345, 32343]' );
});

//yas.array.removeByIndex
QUnit.test( 'yas.array.removeByIndex', function( assert ) {
	
	var numbers = [45, 78, 98, 345, 656, 32343];
	var $ = new yas.array();
	var result = $.removeByIndex(numbers, 3);
 	
	//对比数组等对象需要使用deepEqual方法
    deepEqual( result, [45, 78, 98, 656, 32343], 'yas.array.removeByIndex([45, 78, 98, 345, 656, 32343]) equals [45, 78, 98, 656, 32343]' );
});

//yas.array.filter
QUnit.test( 'yas.array.filter', function( assert ) {
	
	var numbers = [45, 78, 98, 345, 656, 32343];
	var $ = new yas.array();
	var result = $.filter(numbers, function(v, k) { return v % 2 == 0 });
 	
	//对比数组等对象需要使用deepEqual方法
    deepEqual( result, [78, 98, 656], 'yas.array.filter([45, 78, 98, 345, 656, 32343]) equals [78, 98, 656]' );
});

//yas.array.find
QUnit.test( 'yas.array.find', function( assert ) {
	
	var numbers = [1, 2, 3, 4, 5, 6];
	var $ = new yas.array();
	var result = $.find(numbers, function(v, k) { return v % 2 == 0 });
 	
    assert.equal( result, 2, 'yas.array.find([1, 2, 3, 4, 5, 6]) equals 2' );
});

//yas.array.contains
QUnit.test( 'yas.array.contains', function( assert ) {
	
	var numbers = [1, 2, 3, 4, 5, 6];
	var $ = new yas.array();
	var result = $.contains(numbers, 4);
 	
    assert.equal( result, true, 'yas.array.contains([1, 2, 3, 4, 5, 6], 4) is true' );
});

//yas.array.unique
QUnit.test( 'yas.array.unique', function( assert ) {
	
	var numbers = [1, 3, 2, 1, 2, 3];
	var $ = new yas.array();
	var result = $.unique(numbers);
 	
    deepEqual( result, [1, 3, 2], 'yas.array.unique([1, 3, 2, 1, 2, 3]) is [1, 3, 2]' );
});

//yas.array.rest
QUnit.test( 'yas.array.rest', function( assert ) {
	
	var numbers = [1, 3, 2, 1, 2, 3];
	var $ = new yas.array();
	var result = $.rest(numbers,3);
 	
    deepEqual( result, [1, 2, 3], 'yas.array.rest([1, 3, 2, 1, 2, 3]) is [1, 2, 3]' );
});

//yas.array.some
QUnit.test( 'yas.array.some', function( assert ) {
	
	var numbers = [1, 3, 2, 1, 2, 3];
	var $ = new yas.array();
	var result = $.some(numbers, function(num) { return num < 2; });
 	
    deepEqual( result, true, 'yas.array.some([1, 3, 2, 1, 2, 3]) is true' );
});

//yas.array.every
QUnit.test( 'yas.array.every', function( assert ) {
	
	var numbers = [1, 3, 2, 1, 2, 3];
	var $ = new yas.array();
	var result = $.every(numbers, function(num) { return num < 2; });
 	
    deepEqual( result, false, 'yas.array.every([1, 3, 2, 1, 2, 3]) is false' );
});

//yas.array.reduce
QUnit.test( 'yas.array.reduce', function( assert ) {
	
	var numbers = [1, 3, 2, 1, 2, 3];
	var $ = new yas.array();
	var result = $.reduce(numbers, function(memo, num) { return memo + num; }, 1);
 	
    deepEqual( result, 13, 'yas.array.reduce([1, 3, 2, 1, 2, 3]) is 13' );
});