import { SceneEvents } from "../scene/scene.js";
import { Vector3 } from "../utils/math/vector3.js";
import { Body } from "./body.js";


export class Physics
{
    world = [];
    collides = [];
    gravity = 60;
    active = false;

    constructor(scene)
    {
        scene.events.on(SceneEvents.PREUPDATE, this.update, this);
    }

    addCollide(aBody, bBody, callback)
    {
        this.collides.push({ aBody, bBody, callback });
    }

    enable(object)
    {
        const body = new Body(object);
        this.world.push(body);
        return body;
    }

    update(t, d)
    {
        for (const body of this.world)
        {
            body.parent.transform.position.z -= (this.gravity / d);
            if (body.parent.z <= 0) body.parent.transform.position.z = 0;
        }

        for (const collide of this.collides)
        {
            const result = this.isCollide(collide.aBody, collide.bBody);
            if (result)
            {
                collide.callback(result);
            }
        }
    }

    isCollide(a, b)
    {
        const bMin = b.getMinPoint();
        const bMax = b.getMaxPoint();
        const bCenter = b.getCenterPoint();

        const aMin = a.getMinPoint();
        const aMax = a.getMaxPoint();
        const aCenter = a.getCenterPoint();

        const tx = bCenter.x - aCenter.x;
        const ty = bCenter.y - aCenter.y;
        const tz = bCenter.z - aCenter.z;

        let aExtent = a.size.x / 2;
        let bExtent = b.size.x / 2;
        let xOverlap = aExtent + bExtent - Math.abs(tx);
        if (xOverlap < 0)
        {
            return null;
        }

        aExtent = a.size.y / 2;
        bExtent = b.size.y / 2;
        let yOverlap = aExtent + bExtent - Math.abs(ty);
        if (yOverlap < 0)
        {
            return null;
        }

        aExtent = a.size.z / 2;
        bExtent = b.size.z / 2;
        let zOverlap = aExtent + bExtent - Math.abs(tz);
        if (zOverlap < 0)
        {
            return null;
        }

        if (Math.abs(aMin.x - bMax.x) < Math.abs(bMin.x - aMax.x))
        {
            xOverlap = -xOverlap;
        }

        if (Math.abs(aMin.y - bMax.y) < Math.abs(bMin.y - aMax.y))
        {
            yOverlap = -yOverlap;
        }

        if (Math.abs(aMin.z - bMax.z) < Math.abs(bMin.z - aMax.z))
        {
            zOverlap = -zOverlap;
        }

        return new Vector3(xOverlap, yOverlap, zOverlap);
    }
}