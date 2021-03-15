
let firstOfYear = require("./valueAtFirstOfYear.js");
let theCommas = require("./addCommas.js");

let allCloseValues = [];

let portTotal = firstOfYear.woFunds;
let totalDifference = 0;
let findPercentage = 0;


const prepareCloseValue = (closes) => {

// Calculate close value of funds and add to portfolio value wo/fund value
	for (i = 0 ; i < closes.length ; i++) {
		let fundValue = Number(closes[i]);
		fundValue = (fundValue * firstOfYear.fundShares[i]);

		portTotal = portTotal + fundValue;
	}
	allCloseValues.push(theCommas(portTotal));

// Calculate if increase or decrease from first of year
	if (portTotal > firstOfYear.total) {
		allCloseValues.push("increase");
	} else {
		allCloseValues.push("decrease");	
	}

// Calculate the difference from the first of the year
	totalDifference = portTotal - firstOfYear.total;
	if (totalDifference < 0) {
		totalDifference = totalDifference * -1;
	}
	allCloseValues.push(theCommas(totalDifference));

// Find percentage from first of year
	findPercentage = ((totalDifference / firstOfYear.total) * 100).toFixed(1);
	allCloseValues.push(findPercentage);

// Calculate value and percentage of each fund
	for (i = 0 ; i < closes.length ; i++) {
		let currentValue = Number(closes[i]);
		currentValue = (currentValue * firstOfYear.fundShares[i]);

		allCloseValues.push(theCommas(currentValue));

		allCloseValues.push(((closes[i] - firstOfYear.fundValue[i]) / firstOfYear.fundValue[i] * 100).toFixed(1));
	}	

	return allCloseValues
}


module.exports = { prepareCloseValue, allCloseValues };