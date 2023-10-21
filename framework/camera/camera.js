import { Matrix4x4 } from "../utils/math/matrix4x4.js";
import { Transform } from "../utils/math/transform.js";


export class Camera
{
    matrix = new Matrix4x4;
    worldMatrix = new Matrix4x4;
    transform = new Transform();

    width = 1;
    height = 1;
    scene;

    constructor(scene)
    {
        this.scene = scene;
        this.width = scene.game.width;
        this.height = scene.game.height;
    }

    getMatrix()
    {
        return this.matrix.clone();
    }

    getViewMatrix()
    {
        return this.worldMatrix;
    }

    update(t, d)
    {
        this.worldMatrix = this.transform.getTransformationMatrix("ZXY");
    }
}