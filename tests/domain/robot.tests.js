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
	
	var turns = 0;
	
	it ('should run all cpus', function() {
		turns = 0;
		
		var robot = new Robot();
	
		var cpu1 = new CPUEmulator(robot);
		var cpu2 = new CPUEmulator(robot);
		var cpu3 = new CPUEmulator(robot);
		
		robot.chassis = new Chassis();
		robot.chassis.modules = [ cpu1, cpu2, cpu3 ];
		
		robot.executePhase(1);
		
		expect(turns).to.equal(3);
	});
	
	function CPUEmulator() {
		Module.call(this);
		this.type = moduleType.cpu;
		this.cpuPriority = 0;
		this.turns = 0;
		
		this.refresh = function() {};
	};
	
	CPUEmulator.prototype.executeInstruction = function() {
		turns++;
		this.turns++;
	};
	
	it ('should run the instruction and move 1 space', function() {
		//integration test for robot, cpu, programInstruction, drive, and map
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 1);
		floor.size = new Size(2, 2, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 1);
		robot.heading = heading.south;
		
		var drive = new BasicWheels(robot);
	
		var cpu = new BasicProcessor(robot);
		cpu.instructions = [ 0, new ProgramInstruction(drive, instruction.move1) ];
		
		robot.chassis = new Chassis();
		robot.chassis.modules = [ cpu, drive ];
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		robot.executePhase(1, map);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(1);
		expect(robot.coordinate.z).to.equal(1);
	});
});