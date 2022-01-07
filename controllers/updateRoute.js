
const express = require("express");
const router = express.Router();
const fs = require("fs");


// Needed for close date
let postDates = require("../public/javascript/datesToDisplay.js");
// Need calculated info from closed values
let asValues = require("../public/javascript/valueAtClose.js");
let values = asValues.allCloseValues;


router.get("/", (req, res) => {

	let saveData = postDates.wMonth + "|" + values[0] + "|" + values[1] + "|" + values[2] + "|" + values[3] + "|" + values[4] + "|" + values[5] + "|" + values[12] + "|" + values[19] + "|" + values[26];

	let path = "./updateFile/updatedData.txt"

	fs.writeFile(path, saveData, {flag: "w"}, (error) => {
		if (error) {
			console.log(error.message);
			didUpdate = {
				issue: "one write to file",
				plural: ""
			};
			res.render("error", { didUpdate });			
		}
	});

	let posted = {
		date: postDates.wMonth,
		tPortfolio: values[0],
		increaseDecrease: values[1],
		color: values[2],
		difference: values[3],
		percent: values[4],
		tStock: values[5],
		iTech: values[12],
		matthews: values[19],
		gShares: values[26]
	}

	res.render("update", { posted });
});


module.exports = router;