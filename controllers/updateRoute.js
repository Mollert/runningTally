
const express = require("express");
const router = express.Router();
const fs = require("fs");


// Needed for close date
let postDates = require("../public/javascript/datesToDisplay.js");
// Need calculated info from closed values
let asValues = require("../public/javascript/valueAtClose.js");
let values = asValues.allCloseValues;


router.get("/", (req, res) => {

	let current = postDates();

	let saveData = current.wMonth + "|" + values[3] + "|" + values[4] + "|" + values[5] + "|" + values[6] + "|" + values[7] + "|" + values[12] + "|" + values[19] + "|" + values[26] + "|" + values[33];

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
		date: current.wMonth,
		tPortfolio: values[3],
		increaseDecrease: values[4],
		color: values[5],
		difference: values[6],
		percent: values[7],
		tStock: values[12],
		iTech: values[19],		
		conDis: values[26],
		matthews: values[33]		
	}

	res.render("update", { posted });
});


module.exports = router;