
let getUpdated = require("./readUpdated.js");
let pointInTime = require("./valueAtPointInTime.js");
let theCommas = require("./addCommas.js");


let allCloseValues = [];

const prepareCloseValue = (closes) => {

	let updatedValues = getUpdated();

	let portTotal = pointInTime.aMomentWoFunds;
	let workingTotal = pointInTime.yearBegan - pointInTime.withdrawal;
	let totalUpdatedValue = Number(updatedValues[1].replace(/,/g, ""));
	let totalDifference = 0;
	let portPercentage = 0;

// Capture first of year total, withdrawal and working total
	allCloseValues[0] = theCommas(pointInTime.yearBegan);
	allCloseValues[1] = theCommas(pointInTime.withdrawal);
	allCloseValues[2] = theCommas(workingTotal);

// Calculate close value of funds and add to total wo/fund value
	for (i = 0 ; i < closes.length ; i++) {
		let fundValue = Number(closes[i].price);
		fundValue = (fundValue * pointInTime.aMomentFundShares[i]);

		portTotal = portTotal + fundValue;
	}

	allCloseValues[3] = theCommas(portTotal);

// Calculate if increase or decrease from working total
	if (portTotal > workingTotal) {
		allCloseValues[4] = "n increase";
		allCloseValues[5] = "black";
	} else {
		allCloseValues[4] = " decrease";
		allCloseValues[5] = "red";
	}

// Calculate the difference from working total
	totalDifference = portTotal - workingTotal;
	if (totalDifference < 0) {
		totalDifference = totalDifference * -1;
	}

	allCloseValues[6] = theCommas(totalDifference);

// Find percentage from working total
	portPercentage = (((portTotal - workingTotal) / workingTotal) * 100);
	if (portPercentage < 0.1 && portPercentage > -0.1) {
		allCloseValues[4] = "Almost 0";
	} else {
		allCloseValues[7] = portPercentage.toFixed(1);		
	}

// Calculate if increase or decrease from last snapshot
	if (portTotal > totalUpdatedValue) {
		allCloseValues[8] = "n increase";
		allCloseValues[9] = "black";
	} else {
		allCloseValues[8] = " decrease";
		allCloseValues[9] = "red";
	}

// Calculate the difference from last snapshot
	totalDifference = portTotal - totalUpdatedValue;
	if (totalDifference < 0) {
		totalDifference = totalDifference * -1;
	}

	allCloseValues[10] = theCommas(totalDifference);

// Find percentage from last snapshot
	portPercentage = (((portTotal - totalUpdatedValue) / totalUpdatedValue) * 100);
	if (portPercentage < 0.1 && portPercentage > -0.1) {
		allCloseValues[8] = "Almost 0";
	} else {
		allCloseValues[11] = portPercentage.toFixed(1);		
	}

	let j = 12;
// Calculate value and percentage of each fund
	for (i = 0 ; i < closes.length ; i++) {
// Claculate current value of each fund
		let currentValue = Number(closes[i].price);
		currentValue = (currentValue * pointInTime.aMomentFundShares[i]);
		allCloseValues[j] = theCommas(currentValue);

// Is current value a increase or decrease in percentage since first of year
		let beganValue = pointInTime.beganFundValue[i] * pointInTime.beganFundShares[i];
		if (currentValue > beganValue) {
			allCloseValues[j+1] = "black";
		} else {
			allCloseValues[j+1] = "red";
		}
 		allCloseValues[j+2] = ((currentValue - beganValue) / beganValue * 100).toFixed(1);

// Convert updated stirng of value to number and then see if close value is more or less of updated value
		let updatedValueToNumber = updatedValues[i+6].replace(/,/g, "");
		updatedValueToNumber = Number(updatedValueToNumber);	
		let sinceUpdateDifference = currentValue - updatedValueToNumber;
		if (sinceUpdateDifference < 0) {
			sinceUpdateDifference = sinceUpdateDifference * -1;
			allCloseValues[j+3] = "decreased";
			allCloseValues[j+4] = "red";
		} else {
			allCloseValues[j+3] = "increased";
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