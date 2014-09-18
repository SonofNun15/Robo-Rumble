utility = {};

utility.sortByDescending = function(collection, callback, thisArg) {
	if (typeof callback == 'function')
	{
		collection.forEach(function(item) {
			item.sortValue = -callback(item, thisArg);
		});
		
		var sortedCollection = _.sortBy(collection, function(item) { return item.sortValue; });
		
		_.each(sortedCollection, function(item) { item.sortValue = null; });
		
		return sortedCollection;
	}
};