describe ('Crusher', function() {
	it ('should crush a robot', function() {
		var crusher = new Crusher();
		crusher.coordinate = new Point(0, 0, 1);
		crusher.activePhases = { '1': true, '5': true };
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Point(1, 1, 0);
		
		var map = new Map();
		map.items.push(crusher);
		map.items.push(robot);
		map.items.push(floor);
		
		crusher.execute(robot, map, 1);
		
		expect(map.items).to.not.contain(robot);
	});
});