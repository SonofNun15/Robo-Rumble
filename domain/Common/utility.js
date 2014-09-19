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