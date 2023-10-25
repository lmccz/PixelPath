import { AnimationState } from "../../animations/animation-state.js";
import { Color } from "../../utils/display/color.js";
import { Vector2 } from "../../utils/math/vector2.js";
import { GameObject } from "../object.js";


export class Sprite extends GameObject 
{
    pipeline = 'basic';
    texture;

    tint = Color.white();
    uvOffset = new Vector2(0, 0);
    uvSize = new Vector2(1, 1);
    width = 1;
    height = 1;

    anims;

    constructor(scene, x, y, z, anims)
    {
        super(scene);
        this.transform.position.setTo(x, y, z);
        this.anims = new AnimationState(this);
        this.anims.play(anims);
    }

    preUpdate(t, d)
    {
        this.anims.update(t, d);
    }
}