import { DegToRad } from "../utils/math/angle.js";
import { Linear } from "../utils/math/linear.js";
import { Matrix4x4 } from "../utils/math/matrix4x4.js";
import { Vector3 } from "../utils/math/vector3.js";
import { Camera } from "./camera.js";


export class PerspectiveCamera extends Camera 
{
    nearClip = 1;
    farClip = 10000000;
    fovDeg = 60;

    follow;
    lerp = new Vector3(1, 1, 1);
    followOffset = new Vector3(0, 0, 0);

    pipeline;

    constructor(scene, fovDeg = 60)
    {
        super(scene);
        this.fovDeg = fovDeg;

        this.updateMatrix();
    }

    updateMatrix()
    {
        this.matrix = Matrix4x4.perspective(0, this.width, 0, this.height, this.nearClip, this.farClip, DegToRad(this.fovDeg));
    }

    startFollow({ target, lerpX, lerpY, lerpZ, offsetX, offsetY, offsetZ })
    {
        this.follow = target;
        this.lerp.setTo(lerpX, lerpY, lerpZ);
        this.followOffset.setTo(offsetX, offsetY, offsetZ);
    }

    stopFollow()
    {
        this.follow = undefined;
    }

    update(t, d)
    {
        super.update(t, d);

        if (this.follow)
        {
            const fx = this.follow.x - this.followOffset.x;
            const fy = this.follow.y - this.followOffset.y;
            const fz = this.follow.z - this.followOffset.z;

            const sx = Linear(this.transform.position.x, fx, this.lerp.x);
            const sy = Linear(this.transform.position.y, fy, this.lerp.y);
            const sz = Linear(this.transform.position.z, fz, this.lerp.z);

            this.transform.position.setTo(sx, sy, sz);
        }
    }

}