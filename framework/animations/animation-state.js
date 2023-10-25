export class AnimationState 
{
    parent;
    repeat = -1;
    frameRate = 60;
    frames = [];
    timer = 0;
    index = 0;
    count = 0;
    playing = false;

    constructor(parent)
    {
        this.parent = parent;
    }

    play(key)
    {
        const { texture, frames, repeat, frameRate, cols, rows } = this.parent.scene.anims.getAnims(key);

        this.parent.texture = this.parent.scene.cache.get(texture);
        this.parent.uvSize.setTo(1.0 / cols, 1.0 / rows);
        this.parent.width = this.parent.uvSize.x * this.parent.texture.width;
        this.parent.height = this.parent.uvSize.y * this.parent.texture.height;

        this.frames.length = 0;
        this.frames = frames;
        this.repeat = repeat;
        this.frameRate = frameRate;
        this.timer = frameRate;
        this.index = 0;
        this.playing = true;
        this.count = frames.length;

        this.parent.uvOffset.x = this.frames[0].x;
        this.parent.uvOffset.y = this.frames[0].y;
    }



    update(t, d)
    {
        if (!this.playing) return;

        this.timer -= d;
        if (this.timer > 0) return;

        this.timer = this.frameRate;

        this.index += 1;

        if (this.index >= this.count)
        {
            this.index = 0;
        }

        const { x, y } = this.frames[this.index]
        this.parent.uvOffset.x = x;
        this.parent.uvOffset.y = y;
    }
}