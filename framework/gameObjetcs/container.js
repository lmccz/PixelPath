import { Matrix4x4 } from "../utils/math/matrix4x4.js";
import { Transform } from "../utils/math/transform.js";


export class Container 
{
    scene;
    children = [];
    parent;

    localMatrix = Matrix4x4.identity();
    worldMatrix = Matrix4x4.identity();
    transform = new Transform();

    constructor(scene)
    {
        this.scene = scene;
    }

    addChild(child)
    {
        if (child.parent)
        {
            throw new Error(`Child has a parent`);
        };

        child.parent = this;
        this.children.push(child);
    }

    updateMatrices()
    {
        this.localMatrix = this.transform.getTransformationMatrix();
        this.updateWorldMatrix(this.parent);

        for (let child of this.children)
        {
            child.updateMatrices();
        }
    }

    updateWorldMatrix(parentWorldMatrix)
    {
        if (parentWorldMatrix)
        {
            this.worldMatrix = parentWorldMatrix.multiply(this.localMatrix);
            return;
        }

        this.worldMatrix.copyFrom(this.localMatrix);
    }

    update(t, d)
    {
        this.updateMatrices();

        for (let child of this.children)
        {
            if (child.preUpdate)
            {
                child.preUpdate(t, d)
            }
        }
    }
}