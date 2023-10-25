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

    complete(data)
    {
        this.completed += 1;
        this.scene.events.emit('load-progress', { total: this.total, complete: this.completed, ...data });
        if (this.completed === this.total) this.scene.events.emit('load-complete', this.scene.key);
    }
}