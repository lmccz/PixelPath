export class TimeStep
{
    previousTime = 0;
    running = false;
    fps = 60;
    callback;

    start(callback)
    {
        if (this.running) return this;
        this.running = true;
        this.callback = callback;

        const step = () =>
        {
            const delta = performance.now() - this.previousTime;

            this.callback(this.previousTime, delta);
            this.previousTime = performance.now();

            window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    }
}

// 你那个时间戳刷新说错啦，不同的显示器刷新频率不同的话不可能都是16 17.  应该这样写才对   
// let startTime = new Date().getTime();
// if (new Date().getTime() - startTime >= 10)
// {
//     deg++;
//     startTime = new Date().getTime();
// }

