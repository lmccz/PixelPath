export const RandomFloat = (min, max) =>
{
    const diff = max - min;
    return Math.random() * diff + min
}


export const RandomInt = (min, max) =>
{
    const diff = max - min;
    return (Math.random() * diff + min) >> 0;
}