describe ('Robot', function() {
	it ('should return the instructions that the robots modules support', function() {
		var robot = new Robot();
		robot.chassis = {
			modules: [ new SpeedyWheels() ],
		};
		
		var cpu = {
			getComplexityLevel: function(module) { return complexity.simple; },
		};

		var instructions = robot.getInstructionList(cpu);
		expect(instructions).to.have.length(3);
		expect(instructions).to.contain(instruction.move2);
		expect(instructions).to.contain(instruction.turnLeft);
		expect(instructions).to.contain(instruction.turnRight);
	});
	
	it ('should not return duplicate instructions when modules share the same instruction', function() {
		var robot = new Robot();
		robot.chassis = {
			modules: [
				{
					getInstructionList: function() {
						return [ instruction.move1, instruction.move2 ];
					},
				},
				{
					getInstructionList: function() {
						return [ instruction.move2, instruction.move3 ];
					},
				}
			],
		};
		
		var cpu = {
			getComplexityLevel: function(module) { return complexity.simple; },
		};

		var instructions = robot.getInstructionList(cpu);

		expect(instructions).to.have.length(3);
		expect(instructions).to.contain(instruction.move1);
		expect(instructions).to.contain(instruction.move2);
		expect(instructions).to.contain(instruction.move3);
	});
	
	it ('should get the maximum complexity available in a cpu when getting all instructions', function() {
		var robot = new Robot();
		robot.chassis = new Chassis();
		robot.chassis.modules = [ 
			new SpeedyWheels(),
			{
				type: moduleType.cpu,
				getComplexityLevel: function(module) { return complexity.simple; },
				getInstructionList: function() { return []; },
			},
			{
				type: moduleType.cpu,
				getComplexityLevel: function(module) { return complexity.moderate; },
				getInstructionList: function() { return []; },
			},
		];

		var instructions = robot.getAllInstructions();
		expect(instructions).to.have.length(4);
		expect(instructions).to.contain(instruction.turnLeft);
		expect(instructions).to.contain(instruction.turnRight);
		expect(instructions).to.contain(instruction.move2);
		expect(instructions).to.contain(instruction.move3);
	});
});