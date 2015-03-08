//boolean
var isDone = false;
console.log(isDone);
//number
var height = 6;
console.log(height);
//string
var name = "dou";
console.log(name);
//array
var list = [1, 2, 3];
var list_2 = [2, 3, 4];
console.log(list);
console.log(list_2);
//enum
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
;
var c = 1 /* Red */;
var r = Color[1];
console.log(c);
console.log(r);
//any
var rand_var = 4;
console.log(rand_var);
//void
// functions that return nothing
