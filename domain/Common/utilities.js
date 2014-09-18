utility = {};

utility.sortByDescending = function(collection, callback, thisArg) {
	if (typeof callback == 'function')
	{
		return _.sortBy(collection, function(item) { return -callback(item, thisArg); });
	}
};