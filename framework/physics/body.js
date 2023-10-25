import { Vector3 } from "../utils/math/vector3.js";

export class Body 
{
    parent;
    size = new Vector3(16, 16, 16);

    constructor(parent)
    {
        this.parent = parent;
    }

    setSize(x, y, z)
    {
        this.size.setTo(x, y, z)
    }

    getCenterPoint()
    {
        const result = new Vector3();
        const pos = this.parent.worldMatrix.getTranslation();

        result.x = pos.x;
        result.y = pos.y;
        result.z = pos.z;

        return result;
    }

    getMinPoint()
    {
        const result = new Vector3();
        const pos = this.parent.worldMatrix.getTranslation();

        result.x = pos.x - (this.size.x / 2);
        result.y = pos.y - (this.size.y / 2);
        result.z = pos.z - (this.size.z / 2);

        return result;
    }

    getMaxPoint()
    {
        const result = new Vector3();
        const pos = this.parent.worldMatrix.getTranslation();

        result.x = pos.x + this.size.x / 2;
        result.y = pos.y + this.size.y / 2;
        result.z = pos.z + this.size.z / 2;

        return result;
    }
}