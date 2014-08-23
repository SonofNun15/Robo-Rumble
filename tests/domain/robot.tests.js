describe ('Robot', function() {
	it ('should return the instructions that the robots modules support', function() {
		var robot = new Robot();
		var chassis = new BoxChassis();
		chassis.modules.push(new SpeedyWheels());
		
		robot.chassis = chassis;
		
		var instructions = robot.getInstructionList();
		
		expect(instructions).to.have.length(4);
		expect(instructions).to.contain(instruction.move2);
		expect(instructions).to.contain(instruction.move3);
		expect(instructions).to.contain(instruction.turnLeft);
		expect(instructions).to.contain(instruction.turnRight);
	});
});