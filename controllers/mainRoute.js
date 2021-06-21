
const express = require("express");
const router = express.Router();


let getUpdated = require("../public/javascript/readUpdated.js");
// Needed for running Promises
let createPromises = require("../public/javascript/scrapeSite.js");
// Needed for preparing updated values
let atClose = require("../public/javascript/valueAtClose.js");
// Needed partial date
let postDates = require("../public/javascript/datesToDisplay.js");


router.get("/", (req, res) => {

	let allFunds = ["VTSAX", "VITAX", "MCHFX", "GLD"];
	let updatedValues = getUpdated();
	let dateNM = postDates();
	let transfer = 0;
	let issueNum = 0;
	let didUpdate = {
		issue: "",
		plural: ""
	};

	const letsResolve = (pGroup) => {
		Promise.all(pGroup).then(result => {

//			console.log(result);

			result.forEach(each => {
				if (each === "") {
					issueNum++;
				} else {		
					transfer = Number(each);
					if (Number.isNaN(transfer)) {
						issueNum++;
					}
				}
			});

			if (result.length !== 4) {
				issueNum++;
			}

			switch (issueNum) {
				case 0:
					didUpdate.issue = "";
					break;
				case 1:
					didUpdate.issue = "one";
					break;
				case 2:
					didUpdate.issue = "two";
					didUpdate.plural = "s";
					break;
				case 3:
					didUpdate.issue = "three";
					didUpdate.plural = "s";
					break;
				default:
					break;
			}

			if (issueNum > 0) {
				res.render("error", { didUpdate });
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
					partialDate: dateNM.woMonth,
					totalValue: closeValues[0],
					upDown: closeValues[1],
					color: closeValues[2],
					ytdValue: closeValues[3],
					percentage: closeValues[4]
				},
				totalfund: {
					closeValue: closeValues[5],
					ytdColor: closeValues[6],
					ytdResults: closeValues[7],
					upDown: closeValues[8],
					differenceColor: closeValues[9],	
					difference: closeValues[10],
					differencePercentage: closeValues[11]
				},
				iTfund: {
					closeValue: closeValues[12],
					ytdColor: closeValues[13],
					ytdResults: closeValues[14],
					upDown: closeValues[15],
					differenceColor: closeValues[16],	
					difference: closeValues[17],
					differencePercentage: closeValues[18]
				},
				chinafund: {
					closeValue: closeValues[19],
					ytdColor: closeValues[20],
					ytdResults: closeValues[21],
					upDown: closeValues[22],
					differenceColor: closeValues[23],	
					difference: closeValues[24],
					differencePercentage: closeValues[25]
				},
				goldfund: {
					closeValue: closeValues[26],
					ytdColor: closeValues[27],
					ytdResults: closeValues[28],
					upDown: closeValues[29],
					differenceColor: closeValues[30],	
					difference: closeValues[31],
					differencePercentage: closeValues[32]
				},
				check: {
					asOfNow: dateNM.present					
				}
			}

			res.render("index", { update });

			}

		})
		
	}

	letsResolve(createPromises(allFunds));
});


module.exports = router;