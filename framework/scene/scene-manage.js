import { GameEvents } from "../core/game.js";
import { SceneEvents } from "./scene.js";


export class SceneManager
{
    game = undefined;
    scene = [];

    constructor(game, scene)
    {
        this.game = game;

        const newScene = new scene();

        newScene.game = this.game;
        newScene.cache = this.game.cache;
        newScene.renderer = this.game.renderer;
        newScene.scene = this;
        newScene.input = this.game.input;
        newScene.anims = this.game.anims;

        game.plugins.forEach(p =>
        {
            newScene[p.key] = new p.plugin(newScene);
        })

        this.scene = newScene;
    }

    start()
    {
        if (this.scene.init)
        {
            this.scene.init();
        }

        if (this.scene.preload)
        {
            this.scene.preload();
            this.scene.events.emit(SceneEvents.LOAD);
            this.scene.events.once('load-complete', this.create, this);
            return;
        }

        this.create();
    }

    create()
    {
        if (this.scene.create) this.scene.create();
        this.game.events.emit(GameEvents.START);
    }

    tick(time, delta)
    {
        this.scene.events.emit(SceneEvents.PREUPDATE, time, delta);
        this.scene.update(time, delta);
        this.scene.renderer.render(this.scene.world.children, this.scene.camera);
    }
}