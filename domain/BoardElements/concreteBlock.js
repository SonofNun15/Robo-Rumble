function ConcreteBlock() {
	MapItem.call(this);
	this.class = mapItemType.boardElement;
	this.coordinate = new Point();
	this.size = new Size();
}