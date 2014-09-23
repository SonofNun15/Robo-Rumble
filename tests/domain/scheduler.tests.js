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
		robot1.priorities = { '1': 300 };		//turn phases are 1 based, so the first priority will always be ignored
		
		var robot2 = new RobotEmulator();
		robot2.priorities = { '1': 350 };
		
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
		robot1.priorities = { '1': 300, '2': 375 };
		
		var robot2 = new RobotEmulator();
		robot2.priorities = { '1': 350, '2': 275 };
		
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
	
	it ('should run all board elements touching the current robot', function() {
		turns = 0;
		
		var belt = new BoardElementEmulator();
		belt.priority = { '6': true };
		belt.coordinate = new Point(0, 0, 0);
		
		var pusher = new BoardElementEmulator();
		pusher.priority = { '5': true };
		pusher.coordinate = new Point(1, 0, 0);
		
		var crusher = new BoardElementEmulator();
		crusher.priority = { '3': true };
		crusher.coordinate = new Point(0, 0, 1);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		
		var map = new Map();
		map.items.push(robot);
		map.items.push(belt);
		map.items.push(pusher);
		map.items.push(crusher);
		
		var scheduler = new Scheduler(map);
		scheduler.takeBoardElementTurn(robot);
		
		expect(turns).to.equal(3);
		expect(belt.turns).to.equal(1);
		expect(pusher.turns).to.equal(1);
		expect(crusher.turns).to.equal(1);
	});
	
	function BoardElementEmulator() {
		MapItem.call(this);
		this.type = mapItemType.boardElement;
		this.priority = [];
		this.turns = 0;
	};
	
	BoardElementEmulator.prototype.execute = function() {
		turns++;
		this.turns++;
	};
});