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
	
	function RobotEmulator() {
		MapItem.call(this);
		this.class = mapItemType.robot;
		this.priorities = [];
	};
	
	RobotEmulator.prototype.executePhase = function() {
		turns++;
	};
});