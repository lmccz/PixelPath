export class Vector2
{
    x = 0;
    y = 0;

    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    setTo(x = this.x, y = this.y)
    {
        this.x = x;
        this.y = y;
    }

    toArray() 
    {
        return [this.x, this.y];
    }

    toFloat32Array() 
    {
        return new Float32Array(this.toArray());
    }

    copyFrom(vector) 
    {
        this.x = vector.x;
        this.y = vector.y;
    }

    multiply(vec) 
    {
        return new Vector2(this.x * vec.x, this.y * vec.y);
    }

    add(v) 
    {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    sub(v) 
    {
        return new Vector2(this.x - v.y, this.y - v.y);
    }

    toString()
    {
        const n = this.toArray().map(i => i.toFixed(2));
        return `x: ${n[0]}; y: ${n[1]}`
    }
}