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
	
	function RobotEmulator() {
		MapItem.call(this);
		this.class = mapItemType.robot;
		this.priorities = [];
		this.turns = 0;
	};
	
	RobotEmulator.prototype.executePhase = function() {
		turns++;
		this.turns++;
	};
});