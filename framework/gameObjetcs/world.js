import { SceneEvents } from "../scene/scene.js";
import { Container } from "./container.js";


export class World extends Container 
{
    constructor(scene)
    {
        super(scene);
        scene.events.on(SceneEvents.PREUPDATE, this.update, this);
    }
}