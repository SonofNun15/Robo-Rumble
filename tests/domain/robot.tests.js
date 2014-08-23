describe ('Robot', function() {
	it ('should return the instructions that the robots modules support', function() {
		var robot = new Robot();
		robot.chassis = {
			modules: [ new SpeedyWheels() ],
		};
		
		var instructions = robot.getInstructionList();
		
		expect(instructions).to.have.length(4);
		expect(instructions).to.contain(instruction.move2);
		expect(instructions).to.contain(instruction.move3);
		expect(instructions).to.contain(instruction.turnLeft);
		expect(instructions).to.contain(instruction.turnRight);
	});
});