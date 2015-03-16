/**
 * Created by dou on 15/3/15.
 */
var gl;

function start()
{
    var canvas = document.getElementById("glcanvas");
    gl = initWebGL(canvas);
    if(gl)
    {
        gl.clearColor(0, 0, 0, 1);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    }
}

function initWebGL(canvas)
{
    window.gl = null;

    try
    {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    catch (e) {}
    if(!gl)
    {
        alert("WebGL initialization failed");
    }
}