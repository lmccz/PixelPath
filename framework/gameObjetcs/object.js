import { Matrix4x4 } from "../utils/math/matrix4x4.js";
import { Transform } from "../utils/math/transform.js";


export class GameObject 
{
    scene;
    parent;

    localMatrix = Matrix4x4.identity();
    worldMatrix = Matrix4x4.identity();
    transform = new Transform();

    active = true;
    visible = true;

    constructor(scene)
    {
        this.scene = scene;
    }

    get x()
    {
        return this.transform.position.x;
    }

    get y()
    {
        return this.transform.position.y;
    }

    get z()
    {
        return this.transform.position.z;
    }

    updateMatrices()
    {
        this.localMatrix = this.transform.getTransformationMatrix();
        this.worldMatrix = this.parent.worldMatrix.multiply(this.localMatrix);
    }
}