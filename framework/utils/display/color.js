export class Color
{
    red = 255;
    green = 255;
    blue = 255;
    alpha = 255;

    constructor(red = 255, green = 255, blue = 255, alpha = 255)
    {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    setTo(red = this.red, green = this.green, blue = this.green, alpha = this.alpha)
    {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    getRedFloat() 
    {
        return this.red / 255.0;
    }

    getGreenFloat() 
    {
        return this.green / 255.0;
    }

    getBlueFloat() 
    {
        return this.blue / 255.0;
    }

    getAlphaFloat() 
    {
        return this.alpha / 255.0;
    }

    toArray() 
    {
        return [this.red, this.green, this.blue, this.alpha];
    }

    toFloatArray() 
    {
        return [this.getRedFloat(), this.getGreenFloat(), this.getBlueFloat(), this.getAlphaFloat()];
    }

    toLightFloatArray() 
    {
        return [this.getRedFloat(), this.getGreenFloat(), this.getBlueFloat()];
    }

    toFloat32Array() 
    {
        return new Float32Array(this.toFloatArray());
    }

    toLightFloat32Array() 
    {
        return new Float32Array(this.toLightFloatArray());
    }

    static white() 
    {
        return new Color(255, 255, 255, 255);
    }

    static black() 
    {
        return new Color(0, 0, 0, 255);
    }

    static red() 
    {
        return new Color(255, 0, 0, 255);
    }

    static green() 
    {
        return new Color(0, 255, 0, 255);
    }

    static blue() 
    {
        return new Color(0, 0, 255, 255);
    }

    static random() 
    {
        return new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, Math.random() * 255);
    }
}