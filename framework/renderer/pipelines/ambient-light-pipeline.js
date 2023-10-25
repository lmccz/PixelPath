import { AttributeInfo, GLBuffer } from "../gl-buffer.js";


export class AmbientLightPipeline 
{
    renderer;
    gl;
    shader;
    buffer;

    constructor(renderer)
    {
        this.renderer = renderer;
        this.gl = renderer.gl;
        this.shader = renderer.getShader('ambient-light');
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

    render(color)
    {
		this.shader.use();

		const location = this.shader.getUniformLocation("ambientLight");
		this.gl.uniform3fv(location, color.toLightFloat32Array());

		this.buffer.bind();
		this.buffer.draw();
		this.buffer.unbind();
    }
}