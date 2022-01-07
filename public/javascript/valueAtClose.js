
let getUpdated = require("./readUpdated.js");
let firstOfYear = require("./valueAtFirstOfYear.js");
let theCommas = require("./addCommas.js");


let allCloseValues = [];

const prepareCloseValue = (closes) => {

	let updatedValues = getUpdated();

	let portTotal = firstOfYear.woFunds;
	let totalDifference = 0;
	let portPercentage = 0;

// Calculate close value of funds and add to portfolio value wo/fund value
	for (i = 0 ; i < closes.length ; i++) {
		let fundValue = Number(closes[i].price);
		fundValue = (fundValue * firstOfYear.fundShares[i]);

		portTotal = portTotal + fundValue;
	}

	allCloseValues[0] = theCommas(portTotal);

// Calculate if increase or decrease from first of year
	if (portTotal > firstOfYear.total) {
		allCloseValues[1] = "increase";
		allCloseValues[2] = "black";
	} else {
		allCloseValues[1] = "decrease";
		allCloseValues[2] = "red";
	}

// Calculate the difference from the first of the year
	totalDifference = portTotal - firstOfYear.total;
	if (totalDifference < 0) {
		totalDifference = totalDifference * -1;
	}

	allCloseValues[3] = theCommas(totalDifference);

// Find percentage from first of year
	portPercentage = (((portTotal - firstOfYear.total) / firstOfYear.total) * 100);
	if (portPercentage < 0.1 && portPercentage > -0.1) {
		allCloseValues[4] = "Almost 0";
	} else {
		allCloseValues[4] = portPercentage.toFixed(1);		
	}

	let j = 5;
// Calculate value and percentage of each fund
	for (i = 0 ; i < closes.length ; i++) {
// Claculate value of each fund
		let currentValue = Number(closes[i].price);
		currentValue = (currentValue * firstOfYear.fundShares[i]);
		allCloseValues[j] = theCommas(currentValue);

// Is current value of the current value a plus or minus
		if (currentValue > (firstOfYear.fundValue[i] * firstOfYear.fundShares[i])) {
			allCloseValues[j+1] = "black";
		} else {
			allCloseValues[j+1] = "red";	
		}
		allCloseValues[j+2] = ((closes[i].price - firstOfYear.fundValue[i]) / firstOfYear.fundValue[i] * 100).toFixed(1);

// Convert updated stirng of value to number and then see if close value is more or less of updated value
		let updatedValueToNumber = updatedValues[i+6].replace(/,/g, "");
		updatedValueToNumber = Number(updatedValueToNumber);
		let sinceUpdateDifference = currentValue - updatedValueToNumber;
		if (sinceUpdateDifference < 0) {
			sinceUpdateDifference = sinceUpdateDifference * -1;
			allCloseValues[j+3] = "decrease";
			allCloseValues[j+4] = "red";
		} else {
			allCloseValues[j+3] = "increase";
			allCloseValues[j+4] = "black";						
		}

// What is the difference between updated value and closed value
		allCloseValues[j+5] = theCommas(sinceUpdateDifference);

// What is the percentage difference between updated value and closed value
		let fundPercentage = ((currentValue - updatedValueToNumber) / updatedValueToNumber * 100);
		if (fundPercentage < 0.1 && fundPercentage > -0.1) {
			allCloseValues[j+6] = "Almost 0";
		} else {
			allCloseValues[j+6] = fundPercentage.toFixed(1);			
		}
		j = j + 7;
	}	

	return allCloseValues
}


module.exports = { prepareCloseValue, allCloseValues };