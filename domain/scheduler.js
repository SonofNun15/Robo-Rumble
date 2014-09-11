function Scheduler(map) {
	this.map = map;
}

//the scheduler runs each of the robot turns, followed by the npcs, and finally the board elements.
//then optionally the robots and npcs get another chance to take an end-of-turn action.
//the scheduler has four public functions, initTurn, startNewPhase, runNext and runAll.

Scheduler.prototype.initTurn = function() {
	//reinitialize the enumerators each turn, that will clean up any items that have been removed from the game
	this.robotEnumerator = new ArrayEnumerator(this.map.getRobots());
	this.npcEnumerator = new ArrayEnumerator(this.map.getNPCs());
	this.boardElementEnumerator = new ArrayEnumerator(this.map.getRobots());	//enumerates robots to activate the board elements nearby
	this.phase = 0;
};

Scheduler.prototype.startNewPhase = function() {
	if (this.phase < this.map.game.phasesPerTurn)
	{
		this.robotEnumerator.reset();
		this.npcEnumerator.reset();
		this.boardElementEnumerator.reset();
		this.phase += 1;
		return true;
	)
	else
	{
		return false;
	}
};

Scheduler.prototype.runNext = function() {
	if (this.robotEnumerator.moveNext())
	{
		this.takeRobotTurn(this.robotEnumerator.current();
	}
	else if (this.npcEnumerator.moveNext())
	{
		this.takeNPCTurn(this.npcEnumerator.current();
	}
	else if (this.boardElementEnumerator.moveNext())
	{
		this.takeBoardElementTurn(this.npcEnumerator.current();
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

};

Scheduler.prototype.takeNPCTurn = function(npc) {

};

Scheduler.prototype.takeBoardElementTurn = function(boardElement) {

};