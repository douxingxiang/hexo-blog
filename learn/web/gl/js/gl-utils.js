/**
 * Created by francis on 2015/3/17.
 */

// 根据canvas获取WebGL context
function initGL(canvas) {
    try {
        gl = canvas.getContext('webgl') || canvas.getContext("experimental-webgl");
        //主动设置WebGL视口
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch(e) {}

    if (!gl) {
        console.log("WebGL初始化失败！");
    }
}

function initShaders() {
    var shaderProgram;
    //从DOM获取vs,fs脚本字符串
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);
    gl.program = shaderProgram;
    //shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    //gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    //shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    //shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
}

function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    //获取脚本字符串
    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3)
            str += k.textContent;
        k = k.nextSibling;
    }

    //新建着色器
    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    //连接着色器
    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    //检查编译是否成功
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function getGLPointObjFromClientPoint(cvs, cx, cy)
{
    var obj = {x:0.0, y:0.0};
    var rect = cvs.getBoundingClientRect();
    obj.x = ((cx - rect.left) - cvs.width / 2) / (cvs.width / 2);
    obj.y = (cvs.height / 2 - (cy - rect.top)) / (cvs.height / 2);
    return obj;
}