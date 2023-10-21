export const CreateShader = (gl, type, source) =>
{
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) return shader;

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
};


export const CreateProgram = (gl, vertexShader, fragmentShader) =>
{
    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) return program;

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
};


export const DetectAttributes = (gl, program) =>
{
    const attribCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    const atributes = {};

    for (let i = 0; i < attribCount; i++)
    {
        const info = gl.getActiveAttrib(program, i);
        atributes[info.name] = gl.getAttribLocation(program, info.name);
    }

    return atributes;
};


export const DetectUniforms = (gl, program) =>
{
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    const uniforms = {};

    for (let i = 0; i < uniformCount; i++)
    {
        const info = gl.getActiveUniform(program, i);
        uniforms[info.name] = gl.getUniformLocation(program, info.name);
    }

    return uniforms;
};