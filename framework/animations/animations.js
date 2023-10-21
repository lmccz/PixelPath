export class Animations 
{
    anims = {};
    game;

    constructor(game)
    {
        this.game = game;
    }

    getAnims(key)
    {
        return this.anims[key]
    }

    create({ key, texture, cols, rows, repeat, frameRate })
    {
        this.anims[key] = {
            texture,
            frames: this.generateFrame({ cols, rows }),
            repeat,
            frameRate,
            cols,
            rows,
        }

        return this.anims[key];
    }

    generateFrame({ cols, rows })
    {
        const frames = [];
        const c = 1.0 / cols;
        const r = 1.0 / rows;
        const count = cols * rows;

        for (let i = 0; i < count; i++)
        {
            let x = c * (i % cols);
            let y = r * (i / cols >> 0);
            frames.push({ x, y });
        }

        return frames;
    }
}