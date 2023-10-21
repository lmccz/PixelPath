- https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-fundamentals.html


- 光源
- sprite
- preUpdate()


# 流程
- 初始化Shader
- 初始化VertexBuffer
- 绘制

# MVP 模型 
- u_model 自身
- u_view
- u_projection


# 着色程序
- 准备好对应的shader代码（顶点和片段）；
- 创建顶点和片段着色器；
- 俩着色器link成一个着色程序； const  program;
- 输入型属性，在创建shader初始化的时候就获取好，不要放到循环； const a_position = gl.getAttribLocation(program, "a_position");
- 属性值从缓冲中获取数据，所以先创建一个缓冲；  const positionBuffer = gl.createBuffer();
- 绑定属性信息到缓冲，绑定点≈WebGL全局变量； gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
- 通过绑定点向缓冲中存放数据； gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

# 渲染准备
- 初始化裁剪空间(-1 -> 1);  gl.viewport(0, 0, width, height);

# 渲染前
- gl.clearColor(0, 0, 0, 0);
- gl.clear(gl.COLOR_BUFFER_BIT);

# 渲染
- 使用对应的着色程序； gl.useProgram(program);
- 将绑定点绑定到缓冲数据;  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
- 指定从缓冲中读取数据的方式;  gl.vertexAttribPointer(a_position, size, type, normalize, stride, offset);
- 启用对应属性;  gl.enableVertexAttribArray(a_position);
- 运行着色方法对  gl.drawArrays(primitiveType, offset, count);  或 gl.drawElements


# gl.vertexAttribPointer(location, size, type, normalize, stride, offset)
- location  // atribute在shader里的变量位置
- size      // atribute变量长度
- type      // buffer数据类型
- normalize // 正交化 默认false
- stride    // 每个点所占的BYTES ([x,y,r,g,b]) 一个点有5个信息 = 5 * 数据类型大小
- offset    // 每个点的信息从第几个开始BYTES开始 [x,y,r,g,b] 例如这里color的偏移值为 2 * 数据类型大小


# gl.drawArrays(primitiveType, offset, count);
- primitiveType     // [POINTS,TRIANGLES,LINES]
- offset            // 第几个点开始
- count             // 多少个点