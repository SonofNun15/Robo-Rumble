function Scheduler(map) {
	this.map = map;
	this.phase = 0;
}

//the scheduler runs each of the robot turns, followed by the npcs, and finally the board elements.
//then optionally the robots and npcs get another chance to take an end-of-turn action.
//the scheduler has four public functions, newTurn, initPhase, runNext and runAll.

Scheduler.prototype.newTurn = function() {
	this.phase = 0;
};

Scheduler.prototype.initPhase = function() {
	if (this.phase <= this.map.game.phasesPerTurn)
	{
		//reinitialize the enumerators each phase, in order to sort by priority
		this.phase++;
		var sortedRobotList = utility.sortByDescendingNumeric(this.map.getRobots(), function(robot, thisArg) { return utility.get(robot.priorities, thisArg.phase); }, this);
		this.robotEnumerator = new ArrayEnumerator(sortedRobotList);
		this.npcEnumerator = new ArrayEnumerator(this.map.getNPCs());
		this.boardElementEnumerator = new ArrayEnumerator(sortedRobotList);	//enumerates robots to activate the board elements nearby
		return true;
	}
	else
	{
		return false;
	}
};

Scheduler.prototype.runAll = function() {
	var endOfTurn = !this.runNext();
	
	while (endOfTurn === false)
	{
		endOfTurn = !this.runNext();
	}
};

Scheduler.prototype.runNext = function() {
	if (this.robotEnumerator.moveNext())
	{
		this.takeRobotTurn(this.robotEnumerator.current());
	}
	else if (this.npcEnumerator.moveNext())
	{
		this.takeNPCTurn(this.npcEnumerator.current());
	}
	else if (this.boardElementEnumerator.moveNext())
	{
		this.takeBoardElementTurn(this.boardElementEnumerator.current());
	}
	else
	{
		return false;
	}
	
	return true;
};

//
// Private methods
//

Scheduler.prototype.takeRobotTurn = function(robot) {
	robot.executePhase(this.phase, this.map);	//the map needs to get to the executing modules somehow. This may not be the best way to do it, but it'll work for now.
};

Scheduler.prototype.takeNPCTurn = function(npc) {

};

Scheduler.prototype.takeBoardElementTurn = function(robot) {
	// cycle through each boardElement priority level
	for (var i = boardElementPriorities.highest; i >= 0; i--)
	{
		var elements = _.filter(this.map.getBoardElements(), touchesRobotSpace);
		_.each(elements, run, this);
	}
	
	function touchesRobotSpace(element) {
		return element.coordinate.equals(robot.coordinate)
				|| (element.coordinate.equals(robot.coordinate.add(new Point(1, 0, 0))) && element.size.y >= 1 && element.size.z >= 1)	//touches the right side of the robot's space
				|| (element.coordinate.equals(robot.coordinate.add(new Point(0, 1, 0))) && element.size.x >= 1 && element.size.z >= 1)	//touches the south side of the robot's space
				|| (element.coordinate.equals(robot.coordinate.add(new Point(0, 0, 1))) && element.size.x >= 1 && element.size.y >= 1);	//touches the top of the robot's space
	}
	
	function run(element) {
		if (utility.get(element.priority, i) === true)
		{
			element.execute(robot, this.map, this.phase);
		}
	}
};