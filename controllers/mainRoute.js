
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

	let allFunds = ["VTSAX", "VITAX", "MCHFX", "GLD"];
	let updatedValues = getUpdated();
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
					saved: {
						totalDate: updatedValues[0],
						totalValue: updatedValues[1],
						upDown: updatedValues[2],
						color: updatedValues[3],					
						ytdValue: updatedValues[4],
						percentage: updatedValues[5]
					},
					close: {
						partialDate: postDates.woMonth,
						totalValue: closeValues[0],
						upDown: closeValues[1],
						color: closeValues[2],
						ytdValue: closeValues[3],
						percentage: closeValues[4]
					},
					totalfund: {
						settled: result[0].settled,
						closeValue: closeValues[5],
						ytdColor: closeValues[6],
						ytdResults: closeValues[7],
						upDown: closeValues[8],
						differenceColor: closeValues[9],	
						difference: closeValues[10],
						differencePercentage: closeValues[11]
					},
					iTfund: {
						settled: result[1].settled,
						closeValue: closeValues[12],
						ytdColor: closeValues[13],
						ytdResults: closeValues[14],
						upDown: closeValues[15],
						differenceColor: closeValues[16],	
						difference: closeValues[17],
						differencePercentage: closeValues[18]
					},
					chinafund: {
						settled: result[2].settled,
						closeValue: closeValues[19],
						ytdColor: closeValues[20],
						ytdResults: closeValues[21],
						upDown: closeValues[22],
						differenceColor: closeValues[23],	
						difference: closeValues[24],
						differencePercentage: closeValues[25]
					},
					goldfund: {
						settled: result[3].settled,
						closeValue: closeValues[26],
						ytdColor: closeValues[27],
						ytdResults: closeValues[28],
						upDown: closeValues[29],
						differenceColor: closeValues[30],	
						difference: closeValues[31],
						differencePercentage: closeValues[32]
					}
				}

				res.render("index", { update });

			}

		})
		
	}

	letsResolve(createPromises(allFunds));
});


module.exports = router;