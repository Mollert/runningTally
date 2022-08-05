
const express = require("express");
const router = express.Router();


let getUpdated = require("../public/javascript/readUpdated.js");
// Needed for running Promises
let createPromises = require("../public/javascript/scrapeSite.js");
// Needed for preparing updated values
let atClose = require("../public/javascript/valueAtClose.js");
// Needed partial date
let postDates = require("../public/javascript/datesToDisplay.js");
// Check for all and correct data
let catchError = require("../public/javascript/catchError.js");


router.get("/", (req, res) => {

	let allFunds = ["VTSAX", "VITAX", "VCDAX", "MCHFX"];
	let updatedValues = getUpdated();
	let current = postDates();
	let checkError = [];

	const letsResolve = (pGroup) => {
		Promise.all(pGroup).then(result => {

//		console.log(result);

//		console.log(catchError(result));

			checkError = catchError(result);

//		console.log(checkError);

			if (checkError[0]) {
				checkError.shift();
				res.render("error", { checkError });
			} else {

				let closeValues = atClose.prepareCloseValue(result);

				let update = {
					working: {
						began: closeValues[0],
						withdrawn: closeValues[1],
						total: closeValues[2]
					},
					saved: {
						date: updatedValues[0],
						value: updatedValues[1],
						upDown: updatedValues[2],
						color: updatedValues[3],					
						difference: updatedValues[4],
						percentage: updatedValues[5]
					},
					close: {
						date: current.woMonth,
						value: closeValues[3],
						workingUpDown: closeValues[4],
						workingColor: closeValues[5],
						workingDifference: closeValues[6],
						workingPercentage: closeValues[7],
						upDown: closeValues[8],
						color: closeValues[9],
						difference: closeValues[10],
						percentage: closeValues[11]
					},
					totalfund: {
						settled: result[0].settled,
						closeValue: closeValues[12],
						ytdColor: closeValues[13],
						ytdResults: closeValues[14],
						upDown: closeValues[15],
						differenceColor: closeValues[16],	
						difference: closeValues[17],
						differencePercentage: closeValues[18]
					},
					iTfund: {
						settled: result[1].settled,
						closeValue: closeValues[19],
						ytdColor: closeValues[20],
						ytdResults: closeValues[21],
						upDown: closeValues[22],
						differenceColor: closeValues[23],	
						difference: closeValues[24],
						differencePercentage: closeValues[25]
					},
					consumefund: {
						settled: result[2].settled,
						closeValue: closeValues[26],
						ytdColor: closeValues[27],
						ytdResults: closeValues[28],
						upDown: closeValues[29],
						differenceColor: closeValues[30],	
						difference: closeValues[31],
						differencePercentage: closeValues[32]
					},
					chinafund: {
						settled: result[3].settled,
						closeValue: closeValues[33],
						ytdColor: closeValues[34],
						ytdResults: closeValues[35],
						upDown: closeValues[36],
						differenceColor: closeValues[37],	
						difference: closeValues[38],
						differencePercentage: closeValues[39]
					}
				}

				res.render("index", { update });

			}

		})
		
	}

	letsResolve(createPromises(allFunds));
});


module.exports = router;