import { AttributeInfo, GLBuffer } from "../gl-buffer.js";


export class CombinePipeline 
{
    renderer;
    gl;
    shader;
    buffer;

    constructor(renderer)
    {
        this.renderer = renderer;
        this.gl = renderer.gl;
        this.shader = renderer.getShader('combine');
        this.buffer = new GLBuffer(this.gl);

        const a_position = this.shader.getAttributeLocation('a_position');
        const positionArribute = new AttributeInfo();
        positionArribute.location = a_position
        positionArribute.offset = 0;
        positionArribute.size = 3;
        this.buffer.addAttributeLocation(positionArribute);

        const vertices = [
            -1, -1, 0,
            -1, 1, 0,
            1, 1, 0,
            1, 1, 0,
            1, -1, 0,
            -1, -1, 0,
        ];

        this.buffer.pushBackData(vertices);
        this.buffer.upload();
        this.buffer.unbind();
    }

    render(diffusedTexture, lightingTexture)
    {
        this.shader.use();

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, diffusedTexture);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, lightingTexture);

        const diffuseLocation = this.shader.getUniformLocation("diffuseTexture");
        this.gl.uniform1i(diffuseLocation, 0);
        const lightLocation = this.shader.getUniformLocation("lightIntensityTexture");
        this.gl.uniform1i(lightLocation, 1);

        this.buffer.bind();
        this.buffer.draw();
        this.buffer.unbind();
    }
}