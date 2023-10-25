import { Color } from "../../utils/display/color.js";
import { Matrix4x4 } from "../../utils/math/matrix4x4.js";
import { Transform } from "../../utils/math/transform.js";


export class PointLight
{
    parent;
    color = Color.white();
    transform = new Transform();
    worldTransform = Matrix4x4.identity();
    pipeline = 'light';

    constructor(x, y, z)
    {
        this.transform.position.setTo(x, y, z);
    }

    updateMatrices(t, d)
    {
        this.worldTransform = this.parent.worldMatrix.multiply(this.transform.getTransformationMatrix());
    }
}

