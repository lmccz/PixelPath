import { AttributeInfo, GLBuffer } from "../gl-buffer.js";


export class LightPipeline 
{
    renderer;
    gl;
    shader;
    buffer;

    constructor(renderer)
    {
        this.renderer = renderer;
        this.gl = renderer.gl;
        this.shader = renderer.getShader('light');
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

    // 贴了两层纹理
    render(gameObject, fragPosTexture, normalVectorTexture)
    {
        this.shader.use();

        const position = gameObject.worldTransform.getTranslation();
        const pointLightPosition = this.shader.getUniformLocation("u_point_light_position");
        this.gl.uniform3fv(pointLightPosition, position.toFloat32Array());

        const pointLightIntensity = this.shader.getUniformLocation("u_point_light_intensity");
        this.gl.uniform4fv(pointLightIntensity, gameObject.color.toFloat32Array());

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, fragPosTexture);
        const fragPosLocation = this.shader.getUniformLocation("u_frag_pos");
        this.gl.uniform1i(fragPosLocation, 0);

        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, normalVectorTexture);
        const normalVectorLocation = this.shader.getUniformLocation("u_normal_vector");
        this.gl.uniform1i(normalVectorLocation, 1);

        this.buffer.bind();
        this.buffer.draw();
        this.buffer.unbind();
    }
}