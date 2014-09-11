// Public interface:

// bool moveNext()
// Summary: Advances the enumerator to the next item in the collection
// Returns: True if there is another item in the list or false if the enumeration is done.

// void reset()
// Summary: Returns this enumerator to the beginning of the collection.

// bool isDone()
// Summary: Determines if the enumerator has reached the end of the collection.
// Returns: True if there are no more items in the collection to enumerate.

// var current()
// Returns: Gets the currently enumerated item.

function ArrayEnumerator(array) {
	this.array = array;
	this.setIndex(-1);
}

ArrayEnumerator.prototype.moveNext = function() {
	var hasItem = !this.done;

	if (!this.done) {
		this.setIndex(this.currentIndex + 1);
	}

	return hasItem;
};

ArrayEnumerator.prototype.reset = function() {
	this.setIndex(-1);
};

ArrayEnumerator.prototype.isDone = function() {
	return this.done;
};

ArrayEnumerator.prototype.current = function() {
	if (this.currentIndex >= 0 && this.currentIndex < this.array.length) {
		return this.array[this.currentIndex];
	}
};

//
// Private methods
//

ArrayEnumerator.prototype.setIndex = function(index) {
	this.currentIndex = index;
	this.done = (this.array == null || this.currentIndex + 1 >= this.array.length);
};