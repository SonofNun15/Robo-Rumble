function Chassis() {
	this.modules = [];
}

Chassis.prototype.getCPUs = function() {
	return _.filter(this.modules, function(module) { return module.type == moduleType.cpu; });
};