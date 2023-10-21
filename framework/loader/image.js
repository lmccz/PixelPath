export class ImageFile
{
    loader = undefined;
    key = 'image';

    constructor(loader)
    {
        this.loader = loader;
    }

    init(src, key)
    {
        // 注意 这里的this是指向的loader的
        // 因为把init添加到了loader上
        this.queue.push({ type: 'image', src, key });
        this.total += 1;
    }

    load(data)
    {
        const image = new Image;

        image.onload = () =>
        {
            this.loader.scene.game.events.emit('createtexture', data.key, image);
            this.loader.scene.events.emit('loadcompleted');
        };

        image.src = data.src;
    }
}