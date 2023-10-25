import { DegToRad } from "../utils/math/angle.js";
import { Linear } from "../utils/math/linear.js";
import { Matrix4x4 } from "../utils/math/matrix4x4.js";
import { Vector3 } from "../utils/math/vector3.js";
import { Vector2 } from "../utils/math/vector2.js";
import { Camera } from "./camera.js";
import { SceneEvents } from "../scene/scene.js";


export class PerspectiveCamera extends Camera 
{
    nearClip = 1;
    farClip = 1000;
    fovDeg = 60;

    follow;
    lerp = new Vector3(1, 1, 1);
    followOffset = new Vector3(0, 0, 0);

    // shake
    duration = 0
    progress = 0;
    elapsed = 0;
    intensity = new Vector2(0, 0);

    pipeline;

    constructor(scene, fovDeg = 60)
    {
        super(scene);
        this.fovDeg = fovDeg;
        this.updateMatrix();
        
        scene.events.on(SceneEvents.PREUPDATE, this.update, this);
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

    startShake(duration = 100, intensity = 0.05)
    {
        this.runShake = true
        this.duration = duration;
        this.intensity.setTo(intensity, intensity);
        this.progress = 0;
        this.elapsed = 0;
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

        if (!this.runShake)
        {
            return;
        }

        this.elapsed += d;
        this.progress = this.elapsed / this.duration;

        if (this.elapsed < this.duration)
        {
            const x = this.transform.position.x + (Math.random() * this.intensity.x * this.width * 2 - this.intensity.x * this.width)
            const y = this.transform.position.y + (Math.random() * this.intensity.y * this.height * 2 - this.intensity.y * this.height)

            this.transform.position.setTo(x, y);
        }
        else
        {
            this.runShake = false;
        }
    }
}