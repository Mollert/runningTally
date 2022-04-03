
const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");


let dateTime = require("./datesToDisplay.js");


const createPromises = (theGroup) => {

	let allPs = [];
	let current = dateTime();
	let dayName = ["Friday's", "Monday's", "Tuesday's", "Wednesday's", "Thursday's", "Friday's", "Saturday's", "Sunday's"];

	theGroup.forEach((tick) => {

		let dateSettled = "";
		let scrapeSettled = "";		
		let settledDay = "";
		let settlement = {
			"tick": tick,
			"price": "",		
			"settled": ""
		};

		let startP = new Promise((resolve, reject) => {
			fetch("https://www.cnbc.com/quotes/" + tick + "?qsearchterm=" + tick)
			.then(response => {
				return response.text();
			})
			.then(reply => {

				const $ = cheerio.load(reply);

				settlement.price = $('#MainContentContainer').find('.QuoteStrip-lastPrice').text();		
				scrapeSettled = $('#MainContentContainer').find('.QuoteStrip-lastTradeTime').text();
				settledDay = scrapeSettled.substring(scrapeSettled.indexOf("/") + 1, scrapeSettled.lastIndexOf("/"));
				settledDay = parseInt(settledDay);

				if (current.nowWeekday > 5) {
					settlement.settled = "Updated to friday's close.";
				} else if (current.nowMinute < 960) {
					settlement.settled = "Updated to " + dayName[current.nowWeekday-1] + " close.";
				} else {
					if (settledDay === current.nowDay) {
						settlement.settled = "Updated to " + dayName[current.nowWeekday] + " close.";
					} else {
						settlement.settled = "Waiting for " + dayName[current.nowWeekday] + " update.";
					}
				}

				resolve(settlement);
			})
			.catch(() => "error");

		})
		allPs.push(startP);
	})
	return allPs;
}


module.exports = createPromises;