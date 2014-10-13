describe ('utility', function() {
	it ('should sort by descending values using a property', function() {
		var array = [
			{ num: 1 }, 
			{ num: 2 }, 
			{ num: 3 }
		]
		
		var result = utility.sortByDescendingNumeric(array, 'num');
		
		expect(result[0].num).to.equal(3);
		expect(result[1].num).to.equal(2);
		expect(result[2].num).to.equal(1);
	});
	
	it ('should sort by descending values using a callback function', function() {
		var array = [
			{ num: 1 },
			{ num: 2 },
			{ num: 3 }
		]
		
		var result = utility.sortByDescendingNumeric(array, function(item) { return item.num; });
		
		expect(result[0].num).to.equal(3);
		expect(result[1].num).to.equal(2);
		expect(result[2].num).to.equal(1);
	});
	
	it ('should get the value for the designated index', function() {
		var array = [];
		utility.map(array, 1, 'val1');
		utility.map(array, 2, 'val2');
		utility.map(array, 3, 'val3');
			
		expect(utility.get(array, 1)).to.equal('val1');
		expect(utility.get(array, 2)).to.equal('val2');
		expect(utility.get(array, 3)).to.equal('val3');
	});
	
	it ('should remove an object from the array using the instance', function() {
		var obj = { num: 5 };
		
		var array = [
			{ num: 1 },
			obj,
			{ num: 3 }
		];
		
		array.remove(obj);
		
		expect(array.length).to.equal(2);
		expect(array[0].num).to.equal(1);
		expect(array[1].num).to.equal(3);
	});
	
	it ('should remove an object from the array using the array index', function() {
		var array = [
			{ num: 1 },
			{ num: 2 },
			{ num: 3 }
		];
		
		array.remove(array[2]);
		
		expect(array.length).to.equal(2);
		expect(array[0].num).to.equal(1);
		expect(array[1].num).to.equal(2);
	});
});