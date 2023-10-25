import { Image } from "./2d/image.js";
import { Particles } from "./2d/particles.js";
import { Sprite } from "./2d/sprite.js";
import { PointLight } from "./light/point-light.js";


export class GameObjectFactory
{
    scene = undefined

    constructor(scene)
    {
        this.scene = scene;
    }

    static register(factoryType, factoryFunction)
    {
        GameObjectFactory.prototype[factoryType] = factoryFunction;
    }

    existing(object)
    {
        this.scene.world.addChild(object);
    }
}


GameObjectFactory.register('image', function (x, y, z, texture)  
{
    const image = new Image(this.scene, x, y, z, texture);

    this.existing(image);

    return image;
});


GameObjectFactory.register('sprite', function (x, y, z, anims)  
{
    const sprite = new Sprite(this.scene, x, y, z, anims);

    this.existing(sprite);

    return sprite;
});


GameObjectFactory.register('light', function (x, y, z)  
{
    const light = new PointLight(x, y, z);

    this.existing(light);

    return light;
});


GameObjectFactory.register('particles', function (config)  
{
    const particles = new Particles(this.scene, config);

    this.existing(particles);

    return particles;
});




