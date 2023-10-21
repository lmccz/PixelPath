import { Color } from "../utils/display/color.js";
import { IntegerToColor } from "../utils/display/integer-to-color.js";
import { Vector2 } from "../utils/math/vector2.js";
import { BasicPipeline } from "./basic-pipeline.js";
import { BasicShader } from "./basic-shader.js";
import { Texture } from "./texture.js";


export class WebGLRenderer 
{
    game;
    gl;
    shaders = {};
    pipelines = {};

    constructor(game)
    {
        const { width, height, clearColor } = game;
        const c = IntegerToColor(clearColor).toFloatArray();

        this.game = game;
        this.gl = game.canvas.getContext("webgl2");

        // Enables transparency
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        // Enables depth
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.clearColor(c[0], c[1], c[2], c[3]);
        this.gl.viewport(0, 0, width, height);

        this.shaders['basic'] = new BasicShader(this.gl);
        this.pipelines['basic'] = new BasicPipeline(this);

        this.game.events.on('createtexture', this.createTexure, this);
    }

    createTexure(key, image)
    {
        const texture = new Texture(this.gl, image);
        this.game.events.emit('addcache', key, texture);
    }

    getShader(key)
    {
        return this.shaders[key];
    }

    preRender()
    {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    render(children, camera)
    {
        this.shaders['basic'].use();

        const u_projection = this.shaders['basic'].getUniformLocation("u_projection");
        this.gl.uniformMatrix4fv(u_projection, false, camera.getMatrix().toFloat32Array());

        const u_view = this.shaders['basic'].getUniformLocation("u_view");
        this.gl.uniformMatrix4fv(u_view, false, camera.getViewMatrix().toFloat32Array());

        // TODO
        // 并与相机检查是否超出视野则过滤
        // 例如： 在相机背后则不需要绘制

        for (let child of children)
        {
            if (child.visible)
            {
                this.pipelines['basic'].render(child.uvOffset, child.uvSize, child.tint, child.worldMatrix, child.texture, child.uvSize.x * child.width, child.uvSize.y * child.height);
            }
        }
    }
}