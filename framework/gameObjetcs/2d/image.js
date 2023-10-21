import { Color } from "../../utils/display/color.js";
import { Vector2 } from "../../utils/math/vector2.js";
import { GameObject } from "../object.js";


export class Image extends GameObject 
{
    texture;
    pipeline = 'basic';

    tint = Color.white();
    uvOffset = new Vector2(0, 0);
    uvSize = new Vector2(1, 1);
    width = 1;
    height = 1;

    constructor(scene, x, y, z, texture)
    {
        super(scene);
        
        this.transform.position.setTo(x, y, z);
        this.texture = scene.cache.get(texture);
        this.width = this.texture.width;
        this.height = this.texture.height;
    }
}