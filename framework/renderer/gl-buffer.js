const Draw = {
    // gl.ARRAY_BUFFER
    '34962': e =>
    {
        e.gl.drawArrays(e.mode, 0, e.data.length / e.elementSize);
    },
    // gl.ELEMENT_ARRAY_BUFFER
    '34963': e =>
    {
        e.gl.drawElements(e.mode, e.data.length, e.dataType, 0);
    }
}


export class AttributeInfo
{
    location = 0;
    size = 0;
    offset = 0;
};


export class GLBuffer 
{
    gl;
    elementSize = 0;
    stride = 0;
    buffer;

    bufferType = 0;
    dataType = 0;
    mode = 0;
    typeSize = 0;

    data = [];
    attributes = [];

    constructor(gl, dataType = gl.FLOAT, bufferType = gl.ARRAY_BUFFER, mode = gl.TRIANGLES)
    {
        this.gl = gl;
        this.elementSize = 0;
        this.dataType = dataType;
        this.bufferType = bufferType;
        this.mode = mode;

        this.typeSize = GLBuffer.getDataSize(gl, this.dataType);
        this.buffer = gl.createBuffer();
    }

    bind(normalized = false) 
    {
        // 将绑定点绑定到缓冲数据
        this.gl.bindBuffer(this.bufferType, this.buffer);

        for (let a of this.attributes)
        {
            // 指定从缓冲中读取数据的方式
            this.gl.vertexAttribPointer(a.location, a.size, this.dataType, normalized, this.stride, a.offset * this.typeSize);
            // 启用对应属性
            this.gl.enableVertexAttribArray(a.location);
        }
    }

    unbind()
    {
        for (let a of this.attributes)
        {
            this.gl.disableVertexAttribArray(a.location);
        }

        this.gl.bindBuffer(this.bufferType, undefined);
    }

    addAttributeLocation(info)
    {
        info.offset = this.elementSize;
        this.attributes.push(info);
        this.elementSize += info.size;
        this.stride = this.elementSize * this.typeSize;
    }

    pushBackData(data)
    {
        this.data.push(...data);
    }

    setData(data)
    {
        this.data.length = 0;
        this.data.push(...data);
    }

    upload()
    {
        this.gl.bindBuffer(this.bufferType, this.buffer);
        const bufferData = GLBuffer.dataToArrayBuffer(this.gl, this.dataType, this.data);
        this.gl.bufferData(this.bufferType, bufferData, this.gl.STATIC_DRAW);
    }

    draw() 
    {
        Draw[this.bufferType](this);
    }

    destroy()
    {
        this.gl.deleteBuffer(this.buffer);
        this.data = undefined;
        this.attributes = undefined;
        this.gl = undefined;
    }

    static dataToArrayBuffer(gl, dataType, data)
    {
        switch (dataType)
        {
            case gl.FLOAT:
                return new Float32Array(data);
            case gl.INT:
                return new Int32Array(data);
            case gl.UNSIGNED_INT:
                return new Uint32Array(data);
            case gl.SHORT:
                return new Int16Array(data);
            case gl.UNSIGNED_SHORT:
                return new Uint16Array(data);
            case gl.BYTE:
                return new Int8Array(data);
            case gl.UNSIGNED_BYTE:
                return new Uint8Array(data);
        };

        throw new Error(`Invalid datatype ${dataType}`);
    }

    static getDataSize(gl, dataType)
    {
        switch (dataType)
        {
            case gl.FLOAT:
            case gl.INT:
            case gl.UNSIGNED_INT:
                return 4;
            case gl.SHORT:
            case gl.UNSIGNED_SHORT:
                return 2;
            case gl.BYTE:
            case gl.UNSIGNED_BYTE:
                return 1;
            default:
                throw new Error(`Unrecognized data type ${dataType}`);
        }
    }
}