import { Animations } from "../animations/animations.js";
import { PerspectiveCamera } from "../camera/perspective-camera.js";
import { Container } from "../gameObjetcs/container.js";
import { GameObjectFactory } from "../gameObjetcs/Factory.js";
import { Input } from "../input/input.js";
import { Loader } from "../loader/loader.js";
import { WebGLRenderer } from "../renderer/renderer.js";
import { SceneManager } from "../scene/scene-manage.js";
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

    scenePlugin = [
        { key: 'events', plugin: EventEmitter },
        { key: 'load', plugin: Loader },
        { key: 'add', plugin: GameObjectFactory },
        { key: 'camera', plugin: PerspectiveCamera },
        { key: 'world', plugin: Container }
    ];

    constructor(config)
    {
        const { width, height, clearColor, scenes } = config;

        this.width = width;
        this.height = height;
        this.clearColor = clearColor;

        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        document.body.appendChild(this.canvas);

        this.anims = new Animations(this)
        this.cache = new Cache(this);
        this.renderer = new WebGLRenderer(this);
        this.scene = new SceneManager(this, scenes);

        this.start();
    }

    start()
    {
        this.scene.start();
        this.timestep.start(this.tick.bind(this));
    }

    tick(t, d)
    {
        this.renderer.preRender();
        this.scene.tick(t, d);
    }
}