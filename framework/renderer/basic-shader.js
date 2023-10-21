import { Shader } from "./shader.js";


const vertexSource = `#version 300 es

precision mediump float;
in vec3 a_position;
in vec2 a_texCoord;

uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;
uniform vec2 u_uvOffset;
uniform vec2 u_uvSize;
uniform vec3 u_vertexScale;

out vec2 v_texCoord;
out vec3 v_fragPos;

void main(){
	vec3 position = u_vertexScale * a_position;
	gl_Position = u_projection * inverse(u_view) * u_model * vec4(position, 1.0);
	v_fragPos = vec3(u_model * vec4(position, 1.0));
	vec2 texCoord = a_texCoord;

	v_texCoord = (texCoord * u_uvSize) + u_uvOffset;
}`;


const fragmentSource = `#version 300 es

precision mediump float;

uniform vec4 u_color;
uniform sampler2D u_diffuse;
uniform mat4 u_projection;
uniform mat4 u_model;

in vec2 v_texCoord;
in vec3 v_fragPos;

layout(location = 0) out vec4 fragColor;
layout(location = 1) out vec4 fragPos;
layout(location = 2) out vec4 normalVector;

void main(){
	fragColor = u_color * texture(u_diffuse, v_texCoord);
	if (fragColor.w == 0.0){
		discard;
	}
	// TODO: Updated this
	fragPos = vec4(v_fragPos, 1.0);
	normalVector = vec4(2.0,0.0,0.0, 1.0);
}`;


export class BasicShader extends Shader
{
    constructor(gl)
    {
        super(gl, vertexSource, fragmentSource);
    }
};