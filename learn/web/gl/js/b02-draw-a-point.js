/**
 * Created by francis on 2015/3/17.
 */
/////////////////////////////////
// WebGL的绘图机制称作着色器（Shader）
/////////////////////////////////

var gl;
function main()
{
    var canvas = document.getElementById('canvas');

    initGL(canvas);
    initShaders();

    //设置canvas清除颜色：黑色不透明
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
    /**
     * 着色器Shader
     *
     * 顶点着色器：Vertex Shader，描述顶点特征，如位置、大小，颜色
     *      gl_Position     顶点位置
     *      gl_PointSize    顶点大小
     * 片段着色器：Fragment Shader，描述片段特征，如填充颜色
     *      gl_FragColor    片段填充颜色
     */

    /**
     * GLSL ES 数据类型
     *
     * float    浮点数（字面量必须含有小数点，不然会报错）
     * vec4     四个float元组
     */

    /**
     * gl.drawArrays(mode, first, count)
     * 绘制图形
     *
     * mode     形状类型
     *  gl.POINTS
     *  gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP
     *  gl.TRIANGLES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN
     * first    开始点位置
     * count    点数量
     */

    /**
     * WebGL坐标系
     *  右手坐标系（right-handed coordinate system）
     *  中心点(0.0, 0.0, 0.0)
     *  左右上下距离为1.0
     */

    /**
     * 传递数据到WebGL
     *
     * 传递给顶点着色器
     *  属性变量（attribute variable）    每个点的值都不同
     *      attribute   存储修饰符
     *      gl.getAttribLocation(program, name)
     *          program保存着顶点着色器和片段着色器
     *      gl.vertexAttrib[1234]f(location, v0, v1, v2, v3)
     *      gl.vertexAttrib[1234]v(location, vec)
     *          location    属性变量的存储位置
     *  统一变量（uniform variable）      每个点的值都相同
     *      uniform     存储修饰符
     *      gl.getUniformLocation(program, name)
     */
}