export const SceneEvents = {
    LOAD: 'load',
    CREATE: 'create',
}


export class Scene
{
    game = undefined;
    key = '';
    active = false;
    events = undefined;

    world;
    camera;

    constructor(game)
    {
        this.game = game;
    }

    preUpdate(time, delta)
    {
        this.world.update(time, delta);
        this.camera.update(time, delta);
    }

    update(t, d)
    {

    }
}