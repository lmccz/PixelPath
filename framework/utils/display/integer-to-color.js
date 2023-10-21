import { Color } from "./color.js";


export const IntegerToColor = input =>
{
    const rgb = IntegerToRGB(input);
    return new Color(rgb.r, rgb.g, rgb.b, rgb.a);
};


export const IntegerToRGB = color =>
{
    if (color > 16777215)
    {
        //  The color value has an alpha component
        return {
            a: color >>> 24,
            r: color >> 16 & 0xFF,
            g: color >> 8 & 0xFF,
            b: color & 0xFF
        };
    }

    return {
        a: 255,
        r: color >> 16 & 0xFF,
        g: color >> 8 & 0xFF,
        b: color & 0xFF
    };

};