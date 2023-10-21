
import { GameEvents } from "../core/game.js";
import { SceneEvents } from "./scene.js";


export class SceneManager
{
    game = undefined;
    scenes = [];

    constructor(game, scenes)
    {
        this.game = game;
        this.game.events.on(GameEvents.START, this.start, this);

        scenes.forEach(scene =>
        {
            const newScene = new scene(this);

            newScene.game = this.game;
            newScene.cache = this.game.cache;
            newScene.renderer = this.game.renderer;
            newScene.scene = this;
            newScene.input = this.game.input;
            newScene.anims = this.game.anims;

            game.scenePlugin.forEach(p =>
            {
                newScene[p.key] = new p.plugin(newScene);
            })

            this.scenes.push(newScene);
        });
    }

    start(key = this.scenes[0].key)
    {
        const scene = this.scenes.find(s => s.key === key);

        if (!scene)
        {
            throw new Error('no has scene for key:', key);
        }

        if (scene.init)
        {
            scene.init();
        }

        if (scene.preload)
        {
            scene.preload();
            scene.events.emit(SceneEvents.LOAD);
            scene.events.once(SceneEvents.CREATE, this.create, this);
            return;
        }

        this.create(key);
    }

    create(key)
    {
        const scene = this.scenes.find(s => s.key === key);

        if (!scene) throw new Error('no has scene for key:', key);
        if (scene.create) scene.create();

        scene.active = true;
    }

    tick(time, delta)
    {
        for (let i = 0; i < this.scenes.length; i++)
        {
            if (this.scenes[i].active)
            {
                this.scenes[i].preUpdate(time, delta);
                this.scenes[i].update(time, delta);

                this.game.renderer.render(this.scenes[i].world.children, this.scenes[i].camera);
            }
        }
    }
}