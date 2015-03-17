/**
 * Created by francis on 2015/3/17.
 */
function main()
{
    // 获取canvas
    var canvas = document.getElementById('canvas');
    if(!canvas)
    {
        console.log('你的浏览器不支持canvas标签！');
        return;
    }

    // 获取渲染上下文
    var ctx = canvas.getContext('2d');

    // 画一个金色方块
    ctx.fillStyle = 'orange';
    ctx.fillRect(100, 100, 50, 50);
}