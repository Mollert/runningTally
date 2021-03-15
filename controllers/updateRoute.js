
const express = require("express");
const router = express.Router();
const fs = require("fs");


// Needed for close date
let theDate = require("../public/javascript/datesToDisplay.js");
// Need calculated info from closed values
let asValues = require("../public/javascript/valueAtClose.js");
let values = asValues.allCloseValues;

router.get("/", (req, res) => {

	let saveData = theDate.wMonth + "|" + values[0] + "|" + values[1] + "|" + values[2] + "|" + values[3] + "|" + values[4] + "|" + values[6] + "|" + values[8] + "|" + values[10];
	
	let path = "./updateFile/updatedData.txt"

	fs.writeFile(path, saveData, {flag: "w"}, (error) => {
		if (error) {
			console.log(error.message);
			res.render("error", { error });			
		}
	});

	let posted = {
		date: theDate.wMonth,
		tPortfolio: values[0],
		increaseDecrease: values[1],
		difference: values[2],
		percent: values[3],
		tStock: values[4],
		iTech: values[6],
		matthews: values[8],
		gShares: values[10],
	}

	res.render("update", { posted });
});


module.exports = router;