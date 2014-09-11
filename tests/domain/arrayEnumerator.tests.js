describe('array enumerator', function() {
	it ('should indicate that an empty array is done', function() {
		var enumerator = new ArrayEnumerator([]);
		expect(enumerator.isDone()).to.be.true;
	});

	it ('should enumerator through array', function() {
		var enumerator = new ArrayEnumerator([0, 1, 2]);
		expect(enumerator.isDone()).to.be.false;


		expect(enumerator.moveNext()).to.be.true;
		expect(enumerator.isDone()).to.be.false;
		expect(enumerator.current()).to.equal(0);

		expect(enumerator.moveNext()).to.be.true;
		expect(enumerator.isDone()).to.be.false;
		expect(enumerator.current()).to.equal(1);

		expect(enumerator.moveNext()).to.be.true;
		expect(enumerator.isDone()).to.be.true;
		expect(enumerator.current()).to.equal(2);

		expect(enumerator.moveNext()).to.be.false;
	});

	it ('should not break when moving past end', function() {
		var enumerator = new ArrayEnumerator([5]);
		
		expect(enumerator.moveNext()).to.be.true;
		expect(enumerator.moveNext()).to.be.false;
		expect(enumerator.moveNext()).to.be.false;
		expect(enumerator.current()).to.equal(5);
	});

	it ('should reset from the beginning', function() {
		var enumerator = new ArrayEnumerator([1, 2, 3]);
		
		enumerator.moveNext();
		enumerator.moveNext();
		
		expect(enumerator.current()).to.equal(2);
		
		enumerator.reset();
		
		expect(enumerator.current()).to.be.undefined;
		
		enumerator.moveNext();
		
		expect(enumerator.current()).to.equal(1);
	});
	
	it('should start with no current item', function() {
		var enumerator = new ArrayEnumerator([1, 2, 3]);
		
		expect(enumerator.current()).to.be.undefined;
	});
});