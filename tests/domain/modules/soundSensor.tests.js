describe ('SoundSensor', function() {
	it ('should inherit from sensor and override visible function', function() {
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		
		var sensor = new SoundSensor(robot);
		
		var otherRobot = new Robot();
		otherRobot.coordinate = new Point(1, 0, 0);
		
		var map = new Map();
		map.items.push(robot);
		map.items.push(otherRobot);
		
		var result = sensor.getVisibleObjects(map);
		
		expect(result).to.contain(otherRobot);
	});
	
	it ('should not be visible if out of range', function() {
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		
		var sensor = new SoundSensor(robot);
		
		var otherRobot = new Robot();
		otherRobot.coordinate = new Point(6, 0, 0);
		
		var map = new Map();
		map.items.push(robot);
		map.items.push(otherRobot);
		
		var result = sensor.getVisibleObjects(map);
		
		expect(result).to.not.contain(otherRobot);
	});
	
	it ('should not be visible if blocked', function() {
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		
		var sensor = new SoundSensor(robot);
		
		var wall = new ConcreteBlock();
		wall.coordinate = new Point(1, 0, 0);
		wall.size = new Size(0, 1, 1);
		
		var otherRobot = new Robot();
		otherRobot.coordinate = new Point(2, 0, 0);
		
		var map = new Map();
		map.items.push(robot);
		map.items.push(wall);
		map.items.push(otherRobot);
		
		var result = sensor.getVisibleObjects(map);
		
		expect(result).to.not.contain(otherRobot);
		expect(result).to.contain(wall);
	});
});