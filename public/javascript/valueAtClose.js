
let getUpdated = require("./readUpdated.js");
let firstOfYear = require("./valueAtFirstOfYear.js");
let theCommas = require("./addCommas.js");

let updatedValues = getUpdated();

let allCloseValues = [];

let portTotal = firstOfYear.woFunds;
let totalDifference = 0;
let portPercentage = 0;


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
		allCloseValues.push("black");
	} else {
		allCloseValues.push("decrease");
		allCloseValues.push("red");		
	}

// Calculate the difference from the first of the year
	totalDifference = portTotal - firstOfYear.total;
	if (totalDifference < 0) {
		totalDifference = totalDifference * -1;
	}
	allCloseValues.push(theCommas(totalDifference));

// Find percentage from first of year
	portPercentage = (((portTotal - firstOfYear.total) / firstOfYear.total) * 100);
	if (portPercentage < 0.1 && portPercentage > -0.1) {
		allCloseValues.push("Almost 0");
	} else {
		allCloseValues.push(portPercentage.toFixed(1));
	}

// Calculate value and percentage of each fund
	for (i = 0 ; i < closes.length ; i++) {
// Claculate value of each fund
		let currentValue = Number(closes[i]);
		currentValue = (currentValue * firstOfYear.fundShares[i]);

		allCloseValues.push(theCommas(currentValue));
// Is current value of the current value a plus or minus
		if (currentValue > (firstOfYear.fundValue[i] * firstOfYear.fundShares[i])) {
			allCloseValues.push("black");
		} else {
			allCloseValues.push("red");				
		}

		allCloseValues.push(((closes[i] - firstOfYear.fundValue[i]) / firstOfYear.fundValue[i] * 100).toFixed(1));	
// Convert updated stirng of value to number and then see if close value is more or less of updated value
		let updatedValueToNumber = updatedValues[i+6].replace(/,/g, "");
		updatedValueToNumber = Number(updatedValueToNumber);
		let sinceUpdateDifference = currentValue - updatedValueToNumber;
		if (sinceUpdateDifference < 0) {
			sinceUpdateDifference = sinceUpdateDifference * -1;
			allCloseValues.push("decreased");
			allCloseValues.push("red");			
		} else {
			allCloseValues.push("increased");
			allCloseValues.push("black");			
		}
// What is the difference between updated value and closed value
		allCloseValues.push(theCommas(sinceUpdateDifference));
// What is the percentage difference between updated value and closed value
		let fundPercentage = ((currentValue - updatedValueToNumber) / updatedValueToNumber * 100);
		if (fundPercentage < 0.1 && fundPercentage > -0.1) {
			allCloseValues.push("Almost 0");
		} else {
			allCloseValues.push(fundPercentage.toFixed(1));
		}
	}	

	return allCloseValues
}


module.exports = { prepareCloseValue, allCloseValues };