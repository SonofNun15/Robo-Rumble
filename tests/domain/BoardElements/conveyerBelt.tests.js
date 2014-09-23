describe ('ConveyerBelt', function() {
	it ('should filter by conveyer belt using isConveyerBelt', function() {
		var belt = new ConveyerBelt();
		
		var boardElement1 = {
			type: mapItemType.boardElement
		};
		
		var boardElement2 = {
			type: mapItemType.boardElement
		};
		
		var map = new Map();
		map.items.push(belt);
		map.items.push(boardElement1);
		map.items.push(boardElement2);
		
		var belts = _.filter(map.getBoardElements(), function(element) { return element.isConveyerBelt; });
		
		expect(belts).to.contain(belt);
		expect(belts).to.not.contain(boardElement1);
		expect(belts).to.not.contain(boardElement2);
	});
});