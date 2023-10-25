import { BasicPipeline } from "./basic-pipeline.js";


export class BasicParticlesPipeline extends BasicPipeline
{

    constructor(renderer)
    {
        super(renderer);
    }

    render(gameObject)
    {
        this.shader.use();

        gameObject.pool.forEach(e =>
        {
            const u_uvOffset = this.shader.getUniformLocation("u_uvOffset");
            this.gl.uniform2fv(u_uvOffset, gameObject.uvOffset.toFloat32Array());

            const u_uvSize = this.shader.getUniformLocation("u_uvSize");
            this.gl.uniform2fv(u_uvSize, gameObject.uvSize.toFloat32Array());

            const u_color = this.shader.getUniformLocation("u_color");
            this.gl.uniform4fv(u_color, e.tint.toFloat32Array());

            const u_model = this.shader.getUniformLocation("u_model");
            this.gl.uniformMatrix4fv(u_model, false, e.worldMatrix.toFloat32Array());

            gameObject.texture.activateAndBind(0);

            const u_diffuse = this.shader.getUniformLocation("u_diffuse");
            this.gl.uniform1i(u_diffuse, 0);

            const u_vertexScale = this.shader.getUniformLocation("u_vertexScale");
            this.gl.uniform3f(u_vertexScale, gameObject.width, gameObject.height, 1.0);

            this.buffer.bind();
            this.buffer.draw();
            this.buffer.unbind();
            gameObject.texture.unbind();
        });
    }
}