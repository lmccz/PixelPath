import { AttributeInfo, GLBuffer } from "./gl-buffer.js";


export class BasicPipeline 
{
    renderer;
    gl;

    shader;
    buffer;

    constructor(renderer)
    {
        this.renderer = renderer;
        this.gl = renderer.gl;
        this.shader = renderer.getShader('basic');
        this.buffer = new GLBuffer(this.gl);

        const a_position = this.shader.getAttributeLocation('a_position');
        const positionArribute = new AttributeInfo();
        positionArribute.location = a_position
        positionArribute.offset = 0;
        positionArribute.size = 3;
        this.buffer.addAttributeLocation(positionArribute);

        const a_texCoord = this.shader.getAttributeLocation('a_texCoord');
        const texCoordArribute = new AttributeInfo();
        texCoordArribute.location = a_texCoord
        texCoordArribute.offset = 3;
        texCoordArribute.size = 2;
        this.buffer.addAttributeLocation(texCoordArribute);

        const vertices = [
            // x,y,z ,u, v
            0, 0, 0, 0, 1,
            0, 1, 0, 0, 0,
            1, 1, 0, 1, 0,
            1, 1, 0, 1, 0,
            1, 0, 0, 1, 1,
            0, 0, 0, 0, 1,
        ];

        this.buffer.pushBackData(vertices);
        this.buffer.upload();
        this.buffer.unbind();
    }

    render(uvOffset, uvSize, tint, worldMatrix, texture, width, height)
    {
        this.shader.use();

        const u_uvOffset = this.shader.getUniformLocation("u_uvOffset");
        this.gl.uniform2fv(u_uvOffset, uvOffset.toFloat32Array());

        const u_uvSize = this.shader.getUniformLocation("u_uvSize");
        this.gl.uniform2fv(u_uvSize, uvSize.toFloat32Array());

        const u_color = this.shader.getUniformLocation("u_color");
        this.gl.uniform4fv(u_color, tint.toFloat32Array());

        const u_model = this.shader.getUniformLocation("u_model");
        this.gl.uniformMatrix4fv(u_model, false, worldMatrix.toFloat32Array());

        texture.activateAndBind(0);

        const u_diffuse = this.shader.getUniformLocation("u_diffuse");
        this.gl.uniform1i(u_diffuse, 0);

        const u_vertexScale = this.shader.getUniformLocation("u_vertexScale");
        this.gl.uniform3f(u_vertexScale, width, height, 1.0);

        this.buffer.bind();
        this.buffer.draw();
        this.buffer.unbind();
        texture.unbind();

        this.gl.uniform3f(u_vertexScale, 1, 1, 1);
        this.gl.uniform2fv(u_uvOffset, new Float32Array([0.0, 0.0]));
        this.gl.uniform2fv(u_uvSize, new Float32Array([1.0, 1.0]));
    }
}