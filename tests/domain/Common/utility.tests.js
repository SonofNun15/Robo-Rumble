describe ('utility', function() {
	it ('should sort by descending values using a property', function() {
		var array = [
			{ num: 1}, 
			{ num: 2}, 
			{ num: 3}
		]
		
		var result = utility.sortByDescendingNumeric(array, 'num');
		
		expect(result[0].num).to.equal(3);
		expect(result[1].num).to.equal(2);
		expect(result[2].num).to.equal(1);
	});
	
	it ('should sort by descending values using a callback function', function() {
		var array = [
			{ num: 1},
			{ num: 2},
			{ num: 3}
		]
		
		var result = utility.sortByDescendingNumeric(array, function(item) { return item.num; });
		
		expect(result[0].num).to.equal(3);
		expect(result[1].num).to.equal(2);
		expect(result[2].num).to.equal(1);
	});
});