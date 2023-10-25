import { Shader } from "../shader.js";


const vertexSource = `#version 300 es
precision mediump float;
in vec3 a_position;
out vec2 tex_coord;

void main(){
	gl_Position	= vec4(a_position, 1.0);
	tex_coord = vec2((gl_Position.x + 1.0) / 2.0, (gl_Position.y + 1.0) / 2.0);
}`;


const fragmentSource = `#version 300 es
precision mediump float;

uniform sampler2D diffuseTexture;
uniform sampler2D lightIntensityTexture;
out vec4 fragColor;
in vec2 tex_coord;

void main(){
	fragColor = texture(diffuseTexture, tex_coord) * texture(lightIntensityTexture, tex_coord);
}`;


export class CombineShader extends Shader
{
    constructor(gl)
    {
        super(gl, vertexSource, fragmentSource);
    }
};