import { CreateProgram, CreateShader, DetectAttributes, DetectUniforms } from "./utils.js";


export class Shader 
{
    gl;
    vertexShader;
    fragmentShader;
    program;

    atributes = {};
    uniforms = {};

    constructor(gl, vertexSource, fragmentSource)
    {
        this.gl = gl;

        this.vertexShader = CreateShader(gl, gl.VERTEX_SHADER, vertexSource);
        this.fragmentShader = CreateShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
        this.program = CreateProgram(gl, this.vertexShader, this.fragmentShader);

        this.atributes = DetectAttributes(gl, this.program);
        this.uniforms = DetectUniforms(gl, this.program);
    }

    use()
    {
        this.gl.useProgram(this.program);
    }

    getAttributeLocation(name)
    {
        return this.atributes[name];
    }

    getUniformLocation(name)
    {
        return this.uniforms[name];
    }

    destroy()
    {
        console.error("DESTROY NOT IMPLEMENTED YET");
    }
}