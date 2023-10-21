const LEVEL = 0;


export class Texture 
{
    gl;
    handle;
    width = 2;
    height = 2;

    constructor(gl, image)
    {
        this.gl = gl;
        // 创建纹理
        this.handle = gl.createTexture();
        this.bind();

        this.width = image.width;
        this.height = image.height;

        this.bind();

        gl.texImage2D(gl.TEXTURE_2D, LEVEL, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        // 对纹理的参数进行设置
        // gl.texParameteri(纹理种类，参数名称，具体值)

        // 纹理需要2的n次幂
        if (this.isPowerOf2()) gl.generateMipmap(gl.TEXTURE_2D);
        else
        {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        };

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }

    bind()
    {
        // 绑定纹理(那种纹理，那个纹理)
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.handle);
    }

    activateAndBind(textureUnit = 0)
    {
        // 激活纹理，放在第几个单元上（最少支持8个单元）
        this.gl.activeTexture(this.gl.TEXTURE0 + textureUnit);
        this.bind();
    }

    isPowerOf2()
    {
        return (this.isValuePowerOf2(this.width) && this.isValuePowerOf2(this.height));
    }

    isValuePowerOf2(value)
    {
        return (value & (value - 1)) == 0;
    }

    unbind()
    {
        this.gl.bindTexture(this.gl.TEXTURE_2D, undefined);
    }

    destroy()
    {
        this.gl.deleteTexture(this.handle);
    }
}