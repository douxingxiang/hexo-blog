// interface
function printLabel(labelledObj : { label: string}) {
	console.log(labelledObj.label);
}

var obj = { size: 10, label: "Size 10 Objects"};
printLabel(obj);

interface LabelledValue {
	label: string;
}

function showLabel(labelObj: LabelledValue) {
	console.log(labelObj.label);
}

showLabel(obj);

// optional property

interface SquareConfig {
	color?: string;
	width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
	var newSquare = {color:  "white", area: 100};
	if(config.color) {
		newSquare.color = config.color;
	}
	if(config.width) {
		newSquare.area = config.width * config.width;
	}
	return newSquare;
}

var mySquare = createSquare({color: "black"});
console.log(mySquare);


