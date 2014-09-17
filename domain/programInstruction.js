function ProgramInstruction(module, instruction) {
	this.module = module;
	this.instruction = instruction;
}

ProgramInstruction.prototype.execute = function(map) {
	this.module.execute(this.instruction, map);
};