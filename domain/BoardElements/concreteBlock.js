function ConcreteBlock() {
	MapItem.call(this);
	this.type = mapItemType.boardElement;
	this.coordinate = new Point();
	this.size = new Size();
	this.priority = {};
}