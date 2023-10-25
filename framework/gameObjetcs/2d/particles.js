import { Color } from "../../utils/display/color.js";
import { Matrix4x4 } from "../../utils/math/matrix4x4.js";
import { RandomFloat } from "../../utils/math/random.js";
import { Transform } from "../../utils/math/transform.js";
import { Vector2 } from "../../utils/math/vector2.js";


export class Particles
{
    pool = [];
    scene;
    pipeline = 'basic-particles';
    active = false;
    visible = true;

    texture;
    uvOffset = new Vector2(0, 0);
    uvSize = new Vector2(1, 1);
    width = 1;
    height = 1;

    parent;
    localMatrix = Matrix4x4.identity();
    worldMatrix = Matrix4x4.identity();
    transform = new Transform();

    constructor(scene, config)
    {
        this.scene = scene;
        this.texture = scene.cache.get(config.texture);
        this.transform.position.copyFrom(config.position);
        this.width = this.texture.width;
        this.height = this.texture.height;

        while (config.quantity > 0)
        {
            this.pool.push(new Particle(this, config));
            config.quantity -= 1;
        }
    }

    emitParticleAt(x, y, z)
    {
        this.transform.position.setTo(x, y, z);
    }

    updateMatrices()
    {
        this.localMatrix = this.transform.getTransformationMatrix();
        this.worldMatrix = this.parent.worldMatrix.multiply(this.localMatrix);
    }

    preUpdate(t, d)
    {
        for (let particle of this.pool)
        {
            particle.updateMatrices(this.worldMatrix);
            particle.updateProps(t, d);
        }
    }
}


class Particle 
{
    parent;
    localMatrix = Matrix4x4.identity();
    worldMatrix = Matrix4x4.identity();
    transform = new Transform();

    elapsed = 0;
    lifespan = 0;
    progress = 0;
    properties = [];
    tint = Color.white();

    constructor(parent, config)
    {
        this.parent = parent;
        this.lifespan = config.lifespan;
        this.elapsed = this.lifespan * Math.random();
        // 重新解析下
        Object.keys(config).forEach(e =>
        {
            if (ParseProperties[e])
            {
                this.properties.push({
                    key: e,
                    ...ParseProperties[e](config[e])
                })
            }
        });
    }

    updateMatrices()
    {
        this.localMatrix = this.transform.getTransformationMatrix();
        this.worldMatrix.copyFrom(this.localMatrix);
    }

    updateProps(t, d)
    {
        this.elapsed += d;
        this.progress = this.elapsed / this.lifespan;

        if (this.progress >= 1)
        {
            this.transform.position.copyFrom(this.parent.transform.position)
            this.elapsed = Math.random() * d;
            this.progress = this.elapsed / this.lifespan;
        }

        for (const p of this.properties)
        {
            PropsUpdate[p.key](this, p)
        }
    }
}


const ParseProperties = {
    speedX: ({ min, max }) =>
    {
        return { value: RandomFloat(min, max) }
    },
    speedY: ({ min, max }) =>
    {
        return { value: RandomFloat(min, max) }
    },
    speedZ: ({ min, max }) =>
    {
        return { value: RandomFloat(min, max) }
    },
    alpha: config => config,
    rotate: config => config,
    scale: config => config,
    tint: config => config,
}


const PropsUpdate = {
    // range (0 - 1)
    alpha: (particle, { start, end }) =>
    {
        particle.tint.alpha = (end - particle.progress + start) * 255;
    },
    // range (0 - 360)
    rotate: (particle, { start, end }) =>
    {
        const rotate = particle.progress * (end - start);
        particle.transform.rotation.setTo(rotate, rotate);
    },
    // range (0 - n)
    scale: (particle, { start, end }) =>
    {
        const scale = particle.progress * (end - start);
        particle.transform.scale.setTo(scale, scale);
    },
    // range (0 - 1)
    tint: (particle, { start, end }) =>
    {
        const color = particle.progress * (end - start) * 255;
        particle.tint.setTo(color, color, color);
    },
    speedX: (particle, { value }) =>
    {
        particle.transform.position.x += value;
    },
    speedY: (particle, { value }) =>
    {
        particle.transform.position.y += value;
    },
    speedZ: (particle, { value }) =>
    {
        particle.transform.position.z += value;
    },
};