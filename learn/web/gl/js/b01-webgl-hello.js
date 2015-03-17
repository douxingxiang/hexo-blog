/**
 * Created by francis on 2015/3/17.
 */
function main()
{
    var canvas = document.getElementById('canvas');

    initGL(canvas);

    //设置canvas清除颜色：黑色不透明
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //清除canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
    /**
     * WebGL使用三种缓冲
     * 1. Color Buffer      颜色缓冲区   gl.COLOR_BUFFER_BIT     gl.clearColor(r, g, b, a)
     * 2. Depth Buffer      深度缓冲区   gl.DEPTH_BUFFER_BIT     gl.clearDepth(depth)
     * 3. Stencil Buffer    模板缓冲区   gl.STENCIL_BUFFER_BIT   gl.clearStencil(s)
     */
}