function Sensor() {
	_.extend(this, Module);
}

Sensor.getVisibleObjects = function(map) {
	var mapItems = map.getAllItems();
	
	_.each(mapItems, isItemVisible, this);
	
	return mapItems;
	
	function isItemVisible(item) {
		if (!this.visible(item, map))
		{
			mapItems.remove(item);
		}
	}
};