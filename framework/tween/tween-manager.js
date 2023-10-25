import { SceneEvents } from "../scene/scene.js";


// todo 添加事件
export class TweenManager 
{
    tweens = [];

    constructor(scene)
    {
        scene.events.on(SceneEvents.PREUPDATE, this.update, this);
    }

    add({ target, duration, repeat, yoyo, props })
    {
        this.tweens.push({
            target,
            duration,
            elapsed: 0,
            progress: 0,
            repeat,
            yoyo,
            props
        })
    }

    update(t, d)
    {
        for (let i = 0; i < this.tweens.length; i++)
        {
            const tween = this.tweens[i];

            tween.elapsed += d;
            tween.progress = tween.elapsed / tween.duration;

            for (const prop of tween.props)
            {
                const { key, from, to } = prop;
                const value = from + (to - from) * tween.progress;
                tween.target[key] = value;
            }

            if (tween.progress >= 1)
            {
                if (tween.yoyo)
                {
                    for (let j = 0; j < tween.props.length; j++)
                    {
                        const { from, to } = tween.props[j];
                        tween.props[j].from = to;
                        tween.props[j].to = from;
                    }

                    tween.elapsed = 0;
                    // tween.progress = 0;
                }

                if (tween.repeat === -1) continue;

                tween.repeat -= 1;

                if (tween.repeat <= 0)
                {
                    this.tweens.splice(i, 1);
                }
            }
        }
    }
}