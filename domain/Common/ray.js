function Ray(vector, startTime, endTime) {
	this.origin = vector.origin;
	this.offset = vector.offset;
	this.invoffset = vector.offset.inverse();
	// 0 is positive, 1 is negative
	this.sign = [ this.invoffset.x < 0 ? 1 : 0
				, this.invoffset.y < 0 ? 1 : 0
				, this.invoffset.z < 0 ? 1 : 0 ];
	if (this.startTime != null)
	{
		this.startTime = startTime;
	}
	else
	{
		this.startTime = 0;
	}
	if (this.endTime != null)
	{
		this.endTime = endTime;
	}
	else
	{
		this.endTime = 1;
	}
}
