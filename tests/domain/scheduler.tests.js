describe ('Scheduler', function() {
	var turns;
	
	it ('should run one robot', function() {
		turns = 0;
		var game = new Game();
		game.phasesPerTurn = 1;
	
		var robot1 = new RobotEmulator();
		var robot2 = new RobotEmulator();
		
		var map = new Map();
		map.items.push(robot1);
		map.items.push(robot2);
		map.game = game;
		
		var scheduler = new Scheduler(map);
		scheduler.initPhase();
		scheduler.runNext();
		
		expect(turns).to.equal(1);
	});
	
	it ('should sort robots by priority and run the highest priority', function() {
		turns = 0;
		var game = new Game();
		game.phasesPerTurn = 1;
	
		var robot1 = new RobotEmulator();
		robot1.priorities = [ 0, 300 ];		//turn phases are 1 based, so the first priority will always be ignored
		
		var robot2 = new RobotEmulator();
		robot2.priorities = [ 0, 350 ];
		
		var map = new Map();
		map.items.push(robot1);
		map.items.push(robot2);
		map.game = game;
		
		var scheduler = new Scheduler(map);
		scheduler.initPhase();
		scheduler.runNext();
		
		expect(turns).to.equal(1);
		expect(robot1.turns).to.equal(0);
		expect(robot2.turns).to.equal(1);
	});
	
	it ('should run robots in order of priority each phase', function() {
		turns = 0;
		var game = new Game();
		game.phasesPerTurn = 2;
	
		var robot1 = new RobotEmulator();
		robot1.priorities = [ 0, 300, 375 ];
		
		var robot2 = new RobotEmulator();
		robot2.priorities = [ 0, 350, 275 ];
		
		var map = new Map();
		map.items.push(robot1);
		map.items.push(robot2);
		map.game = game;
		
		var scheduler = new Scheduler(map);
		scheduler.initPhase();
		scheduler.runNext();
		
		expect(robot1.turns).to.equal(0);
		expect(robot2.turns).to.equal(1);
		
		scheduler.runNext();
		
		expect(robot1.turns).to.equal(1);
		
		scheduler.initPhase();
		scheduler.runNext();
		
		expect(robot1.turns).to.equal(2);
		expect(robot2.turns).to.equal(1);
		
		scheduler.runNext();
		
		expect(robot2.turns).to.equal(2);
		expect(turns).to.equal(4);
	});
	
	it ('should run all robots', function() {
		turns = 0;
		var game = new Game();
		game.phasesPerTurn = 1;
	
		var robot1 = new RobotEmulator();
		var robot2 = new RobotEmulator();
		var robot3 = new RobotEmulator();
		
		var map = new Map();
		map.items.push(robot1);
		map.items.push(robot2);
		map.items.push(robot3);
		map.game = game;
		
		var scheduler = new Scheduler(map);
		scheduler.initPhase();
		scheduler.runAll();
		
		expect(turns).to.equal(3);
	});
	
	function RobotEmulator() {
		MapItem.call(this);
		this.type = mapItemType.robot;
		this.priorities = [];
		this.turns = 0;
	};
	
	RobotEmulator.prototype.executePhase = function() {
		turns++;
		this.turns++;
	};
});