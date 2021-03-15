
const express = require("express");
const router = express.Router();


let getUpdated = require("../public/javascript/readUpdated.js");
// Needed for running Promises
let createPromises = require("../public/javascript/scrapeSite.js");
// Needed for preparing updated values
let atClose = require("../public/javascript/valueAtClose.js");
// Needed partial date
let theDate = require("../public/javascript/datesToDisplay.js");


router.get("/", (req, res) => {

	let allFunds = ["VTSAX", "VITAX", "MCHFX", "GLD"];
	let updatedValues = getUpdated();

	const letsResolve = (pGroup) => {
		Promise.all(pGroup).then(result => {

			let closeValues = atClose.prepareCloseValue(result);

			let update = {
				saved: {
					totalDate: updatedValues[0],
					totalValue: updatedValues[1],
					upDown: updatedValues[2],
					ytdValue: updatedValues[3],
					percentage: updatedValues[4]
				},
				close: {
					partialDate: theDate.woMonth,
					totalValue: closeValues[0],
					upDown: closeValues[1],
					ytdValue: closeValues[2],
					percentage: closeValues[3]
				},
				totalfund: {
					updateValue: updatedValues[5],
					closeValue: closeValues[4],
					results: closeValues[5]
				},
				iTfund: {
					updateValue: updatedValues[6],
					closeValue: closeValues[6],
					results: closeValues[7]
				},
				chinafund: {
					updateValue: updatedValues[7],
					closeValue: closeValues[8],
					results: closeValues[9]
				},
				goldfund: {
					updateValue: updatedValues[8],
					closeValue: closeValues[10],
					results: closeValues[11]
				}
			}

			res.render("index", { update });	
		})
	}

	letsResolve(createPromises(allFunds));
});


module.exports = router;