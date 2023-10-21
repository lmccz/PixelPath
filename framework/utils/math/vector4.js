export class Vector4
{
	x = 0;
	y = 0;
	z = 0;
	w = 0;

	constructor(x = 0, y = 0, z = 0, w = 0)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	setTo(x = this.x, y = this.y, z = this.z, w = this.w)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	toArray()
	{
		return [this.x, this.y, this.z, this.w];
	}

	toFlaot32Array() 
	{
		return new Float32Array(this.toArray());
	}

	copyFrom(vector) 
	{
		this.x = vector.x;
		this.y = vector.y;
		this.z = vector.z;
		this.w = vector.w;
	}

	add(v) 
	{
		return new Vector4(this.x + v.x, this.y + v.y, this.z + v.z, v.w);
	}

	sub(v) 
	{
		return new Vector4(this.x - v.y, this.y - v.y, this.z - v.z, this.w - v.w);
	}

	multiplyAndAddToOneValue(b) 
	{
		return Vector4.multiplyAndAddToOneValue(this, b);
	}

	transformMatrix(mat) 
	{
		const a = new Vector4(0, 0, 0, 0);
		const m = mat.getData();
		a.x = m[0] * this.x + m[4] * this.y + m[8] * this.z + m[12] * this.w;
		a.y = m[1] * this.x + m[5] * this.y + m[9] * this.z + m[13] * this.w;
		a.z = m[2] * this.x + m[6] * this.y + m[10] * this.z + m[14] * this.w;
		a.w = m[3] * this.x + m[7] * this.y + m[11] * this.z + m[15] * this.w;
		return a;
	}

	static multiplyAndAddToOneValue(a, b) 
	{
		const x = a.x * b.x;
		const y = a.y * b.y;
		const z = a.z * b.z;
		const w = a.w * b.w;
		return x + y + z + w;
	}

	toString() 
	{
		const n = this.toArray().map(i => i.toFixed(2))
		return `x: ${n[0]}; y: ${n[1]}; z: ${n[2]}; w: ${n[3]}`
	}

	toFloat32Array() 
	{
		return new Float32Array(this.toArray());
	}
}