utility = {};

utility.sortByDescendingNumeric = function(collection, callback, thisArg) {
	if (typeof callback == 'function')
	{
		return _.sortBy(collection, function(item) { return -callback(item, thisArg); });
	}
	else
	{
		return _.sortBy(collection, function(item) { return -item[callback]; });
	}
};

utility.map = function(array, index, value) {
	array[index.toString()] = value;
};

utility.get = function(array, index) {
	return array[index.toString()];
};

Array.prototype.remove = function(item) {
	var index;

	index = this.indexOf(item);
	
	if (index >= 0) {
		return this.splice(index, 1)[0];
	} else {
		return null;
	}
};