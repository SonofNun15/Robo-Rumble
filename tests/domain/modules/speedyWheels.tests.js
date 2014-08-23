describe('SpeedyWheels', function() {
	it('should provide a known list of move instructions with simple complexity', function() {
		var module = new SpeedyWheels();
		
		var availableInstructions = module.getInstructionList(complexity.simple);
		expect(availableInstructions).to.have.length(3);
		expect(availableInstructions).to.contain(instruction.turnLeft);
		expect(availableInstructions).to.contain(instruction.turnRight);
		expect(availableInstructions).to.contain(instruction.move2);
	});

	it('should provide a known list of move instructions with moderate complexity', function() {
		var module = new SpeedyWheels();
		
		var availableInstructions = module.getInstructionList(complexity.moderate);
		expect(availableInstructions).to.have.length(4);
		expect(availableInstructions).to.contain(instruction.turnLeft);
		expect(availableInstructions).to.contain(instruction.turnRight);
		expect(availableInstructions).to.contain(instruction.move2);
		expect(availableInstructions).to.contain(instruction.move3);
	});
});