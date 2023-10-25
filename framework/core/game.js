import { Animations } from "../animations/animations.js";
import { PerspectiveCamera } from "../camera/perspective-camera.js";
import { GameObjectFactory } from "../gameObjetcs/Factory.js";
import { World } from "../gameObjetcs/world.js";
import { Input } from "../input/input.js";
import { Loader } from "../loader/loader.js";
import { Physics } from "../physics/physics.js";
import { WebGLRenderer } from "../renderer/renderer.js";
import { SceneManager } from "../scene/scene-manage.js";
import { TweenManager } from "../tween/tween-manager.js";
import { EventEmitter } from "../utils/event-emitter.js";
import { Cache } from "./cache.js";
import { TimeStep } from "./timestep.js";


export const GameEvents = {
    BOOT: 'boot',
    READY: 'ready',
    START: 'start',
    PREUPDATE: 'preupdate',
    UPDATE: 'update',
    POSTUPDATE: 'postupdate',
}


export class Game 
{
    canvas;
    width;
    height;
    clearColor;

    events = new EventEmitter;
    timestep = new TimeStep;
    input = new Input;
    cache;
    scene;
    renderer;

    plugins = [
        { key: 'events', plugin: EventEmitter },
        { key: 'load', plugin: Loader },
        { key: 'add', plugin: GameObjectFactory },
        { key: 'camera', plugin: PerspectiveCamera },
        { key: 'world', plugin: World },
        { key: 'physics', plugin: Physics },
        { key: 'tweens', plugin: TweenManager }
    ];

    constructor(config)
    {
        const { width, height, clearColor, scene, plugins } = config;

        this.width = width;
        this.height = height;
        this.clearColor = clearColor;
        this.plugins.push(...plugins);

        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);

        this.anims = new Animations(this)
        this.cache = new Cache(this);
        this.renderer = new WebGLRenderer(this);
        this.scene = new SceneManager(this, scene);

        this.start();
    }

    start()
    {
        this.events.once(GameEvents.START, () =>
        {
            this.timestep.start(this.tick.bind(this));
        });

        this.scene.start();
    }

    tick(t, d)
    {
        this.scene.tick(t, d);
    }
}