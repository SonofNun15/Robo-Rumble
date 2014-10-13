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
});