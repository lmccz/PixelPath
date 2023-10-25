import { Color } from "../utils/display/color.js";
import { IntegerToColor } from "../utils/display/integer-to-color.js";
import { AmbientLightPipeline } from "./pipelines/ambient-light-pipeline.js";
import { BasicParticlesPipeline } from "./pipelines/basic-particles-pipeline.js";
import { BasicPipeline } from "./pipelines/basic-pipeline.js";
import { CombinePipeline } from "./pipelines/combine-pipeline.js";
import { LightPipeline } from "./pipelines/light-pipeline.js";
import { AmbientLightShader } from "./shaders/ambient-light-shader.js";
import { BasicShader } from "./shaders/basic-shader.js";
import { CombineShader } from "./shaders/combine-shader.js";
import { LightShader } from "./shaders/light-shader.js";
import { Texture } from "./texture.js";


export class WebGLRenderer 
{
    game;
    gl;
    shaders = {};
    pipelines = {};
    ambientLight = new Color(255, 255, 255, 255);

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

        if (!this.gl.getExtension('EXT_color_buffer_float') == null)
        {
            console.log('No EXT_color_buffer_float not supported, this test will fail');
        }

        this.gl.clearColor(c[0], c[1], c[2], c[3]);
        this.gl.viewport(0, 0, width, height);

        this.shaders['basic'] = new BasicShader(this.gl);
        this.shaders['light'] = new LightShader(this.gl);
        this.shaders['combine'] = new CombineShader(this.gl);
        this.shaders['ambient-light'] = new AmbientLightShader(this.gl);

        this.pipelines['basic'] = new BasicPipeline(this);
        this.pipelines['light'] = new LightPipeline(this);
        this.pipelines['combine'] = new CombinePipeline(this);
        this.pipelines['ambient-light'] = new AmbientLightPipeline(this);
        this.pipelines['basic-particles'] = new BasicParticlesPipeline(this);

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

    render(children, camera)
    {
        this.shaders['basic'].use();

        const u_projection = this.shaders['basic'].getUniformLocation("u_projection");
        this.gl.uniformMatrix4fv(u_projection, false, camera.getMatrix().toFloat32Array());

        const u_view = this.shaders['basic'].getUniformLocation("u_view");
        this.gl.uniformMatrix4fv(u_view, false, camera.getViewMatrix().toFloat32Array());

        this.frameBuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer);

        let fragColorTexture = this.createFrameBufferTexture(true);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, fragColorTexture, 0);

        let fragPosTexture = this.createFrameBufferTexture(true);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT1, this.gl.TEXTURE_2D, fragPosTexture, 0);

        let normalVectorTexture = this.createFrameBufferTexture(true);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT2, this.gl.TEXTURE_2D, normalVectorTexture, 0);

        let depthTexture = this.createDepthTexture()
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, depthTexture, 0);

        let status = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
        if (status != this.gl.FRAMEBUFFER_COMPLETE)
        {
            console.error(status);
        }

        this.gl.drawBuffers([
            this.gl.COLOR_ATTACHMENT0,
            this.gl.COLOR_ATTACHMENT1,
            this.gl.COLOR_ATTACHMENT2,
        ])

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // TODO
        // 并与相机检查是否超出视野则过滤
        // 例如： 在相机背后则不需要绘制

        for (let child of children)
        {
            if (child.visible)
            {
                this.pipelines[child.pipeline].render(child);
            }
        }

        let lightingFrameBuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, lightingFrameBuffer);

        let lightIntensityTexture = this.createFrameBufferTexture(false);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, lightIntensityTexture, 0);

        this.gl.drawBuffers([
            this.gl.COLOR_ATTACHMENT0
        ]);

        this.gl.blendFunc(this.gl.ONE, this.gl.ONE);

        this.pipelines['ambient-light'].render(this.ambientLight);

        for (let light of children)
        {
            if (light.pipeline === 'light')
            {
                this.pipelines['light'].render(light, fragPosTexture, normalVectorTexture);
            }
        }

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.pipelines['combine'].render(fragColorTexture, lightIntensityTexture);

        this.gl.deleteTexture(fragColorTexture);
        this.gl.deleteTexture(fragPosTexture);
        this.gl.deleteTexture(normalVectorTexture);
        this.gl.deleteTexture(lightIntensityTexture);
        this.gl.deleteTexture(depthTexture);
        this.gl.deleteFramebuffer(this.frameBuffer);
        this.gl.deleteFramebuffer(lightingFrameBuffer);
    }

    createFrameBufferTexture(isStorage)
    {
        let tex = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        if (isStorage)
        {
            this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);
            this.gl.texStorage2D(this.gl.TEXTURE_2D, 1, this.gl.RGBA16F, this.game.width, this.game.height);
        } else
        {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.game.width, this.game.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
        }
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        return tex;
    }

    createDepthTexture()
    {
        let tex = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.DEPTH_COMPONENT16, this.game.width, this.game.height, 0, this.gl.DEPTH_COMPONENT, this.gl.UNSIGNED_SHORT, null);
        return tex
    }
}