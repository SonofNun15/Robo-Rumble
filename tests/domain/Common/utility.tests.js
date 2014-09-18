describe ('utility', function() {
	it ('should by descending values for a property', function() {
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
});