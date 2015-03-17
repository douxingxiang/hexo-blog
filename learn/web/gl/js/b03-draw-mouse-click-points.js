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

    //获取属性变量位置
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0)
    {
        console.log('获取属性变量位置失败！');
        return;
    }
    //给属性变量赋值
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

    canvas.onclick = function(e)
    {
        onClick(e, gl, canvas, a_Position);
    }

    //设置canvas清除颜色：黑色不透明
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_points = [];
function onClick(e, gl, canvas, a_Position)
{
    var p = getGLPointObjFromClientPoint(canvas, e.clientX, e.clientY);
    g_points.push(p.x);
    g_points.push(p.y);

    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for(var i = 0; i < len; i+=2)
    {
        gl.vertexAttrib2f(a_Position, g_points[i], g_points[i+1]);

        gl.drawArrays(gl.POINTS, 0, 1);
    }
}