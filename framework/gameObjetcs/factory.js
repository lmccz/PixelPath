import { Image } from "./2d/image.js";
import { Sprite } from "./2d/sprite.js";


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


GameObjectFactory.register('sprite', function (x, y, z, texture, anims)  
{
    const sprite = new Sprite(this.scene, x, y, z, texture, anims);

    this.existing(sprite);

    return sprite;
});



