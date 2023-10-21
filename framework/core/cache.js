export class Cache
{
    map = Object.create(null);
    game = undefined;

    constructor(game)
    {
        this.game = game;
        this.game.events.on('addcache', this.add, this);
    }

    add(key, data)
    {
        if (!this.map[key])
        {
            this.map[key] = data;
            return;
        };

        throw new Error('Cache has for key:', key);
    }

    has(key)
    {
        if (this.map[key]) return true;
        return false;
    }

    remove(key)
    {
        this.map[key] = undefined;
    }

    get(key)
    {
        if (this.map[key])
        {
            return this.map[key];
        }

        throw new Error('Cache no have for key:', key);
    }
}