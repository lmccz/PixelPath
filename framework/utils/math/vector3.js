import { Matrix4x4 } from "./matrix4x4.js";
import { Vector4 } from "./vector4.js";


export class Vector3
{
    x = 0;
    y = 0;
    z = 0;

    constructor(x = 0, y = 0, z = 0)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    setTo(x = this.x, y = this.y, z = this.z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toArray() 
    {
        return [this.x, this.y, this.z];
    }

    toFloat32Array() 
    {
        return new Float32Array(this.toArray());
    }

    copyFrom(vector) 
    {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
    }

    multiply(vec) 
    {
        return new Vector3(this.x * vec.x, this.y * vec.y, this.z * vec.z);
    }

    add(v) 
    {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    sub(v) 
    {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    getLength() 
    {
        const num = this.x * this.x + this.y * this.y + this.z * this.z;
        return Math.sqrt(num);
    }

    rotateX(angle) 
    {
        let m = Matrix4x4.rotationX(angle);
        let v4 = new Vector4(this.x, this.y, this.z, 0);
        v4 = m.vectorMultiply(v4);
        return new Vector3(v4.x, v4.y, v4.z);
    }

    rotateY(angle) 
    {
        let m = Matrix4x4.rotationY(angle);
        let v4 = new Vector4(this.x, this.y, this.z, 0);
        v4 = m.vectorMultiply(v4);
        return new Vector3(v4.x, v4.y, v4.z);
    }

    rotateZ(angle) 
    {
        let m = Matrix4x4.rotationZ(angle);
        let v4 = new Vector4(this.x, this.y, this.z, 0);
        v4 = m.vectorMultiply(v4);
        return new Vector3(v4.x, v4.y, v4.z);
    }

    toString()
    {
        const n = this.toArray().map(i => i.toFixed(2))
        return `x: ${n[0]}; y: ${n[1]}; z: ${n[2]}`
    }
}