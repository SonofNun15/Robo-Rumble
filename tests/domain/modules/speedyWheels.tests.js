describe('SpeedyWheels', function() {
	it('should provide a known list of move instructions', function() {
		var module = new SpeedyWheels();
		
		var availableInstructions = module.getInstructionList();
		
		expect(availableInstructions).to.have.length(4);
		expect(availableInstructions).to.contain(instruction.move2);
		expect(availableInstructions).to.contain(instruction.move3);
		expect(availableInstructions).to.contain(instruction.turnLeft);
		expect(availableInstructions).to.contain(instruction.turnRight);
	});
});