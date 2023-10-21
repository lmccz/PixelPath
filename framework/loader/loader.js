import { ImageFile } from "./image.js";


const Files = [ImageFile];


export class Loader
{
    scene = undefined;
    queue = [];
    total = 0;
    completed = 0;
    loaders = Object.create(null);

    constructor(scene)
    {
        this.scene = scene;

        this.init();
        this.scene.events.once('load', this.load, this);
        this.scene.events.on('loadcompleted', this.complete, this);
    }

    init()
    {
        Files.forEach(e =>
        {
            const file = new e(this);
            this.loaders[file.key] = file;
            this[file.key] = file.init;
        });
    }

    load()
    {
        this.queue.forEach(e =>
        {
            this.loaders[e.type].load(e);
        });
    }

    complete()
    {
        this.completed += 1;
        if (this.completed === this.total) this.scene.events.emit('create', this.scene.key);
    }
}