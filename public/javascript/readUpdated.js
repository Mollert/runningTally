
const fs = require("fs");

let getUpdated = () => {
	let path = "./updateFile/updatedData.txt"
	let readArray = [];
	let workingArray = [];

	let data = fs.readFileSync(path, "utf8");

	readArray = data.split(/\n/);

	//Remove "new line" from array that was left from the writing process
	if (readArray[readArray.length - 1] === "") {
		readArray.pop();
	}

	// Turns array of transactions into a workable array
	readArray.forEach(each => {
		workingArray = each.split("|");
	});

	return workingArray;
}


module.exports = getUpdated;