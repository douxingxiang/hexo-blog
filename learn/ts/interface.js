// interface
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var obj = { size: 10, label: "Size 10 Objects" };
printLabel(obj);
function showLabel(labelObj) {
    console.log(labelObj.label);
}
showLabel(obj);
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
console.log(mySquare);
//# sourceMappingURL=interface.js.map