
const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");


let dateTime = require("./datesToDisplay.js");


const createPromises = (theGroup) => {

	let allPs = [];

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

				if (tick === "GLD") {
					if (dateTime.nowWeekday < 6 && dateTime.nowMinute > 570 && dateTime.nowMinute < 960) {
						settlement.price = $('#MainContentContainer').find('.QuoteStrip-lastPrice').text();
						settlement.settled = "It's being updated during market hours.";
					} else {
						settlement.price = $('#MainContentContainer').find('.QuoteStrip-lastPrice').eq(1).text();
						if (dateTime.nowWeekday > 5) {
							settlement.settled = "Updated to friday's close.";
						} else if (dateTime.nowMinute < 960) {
							settlement.settled = "Updated to previous day's close.";
						} else {
							settlement.settled = "Updated to today's close.";
						}
					}
				} else {
					settlement.price = $('#MainContentContainer').find('.QuoteStrip-lastPrice').text();		
					scrapeSettled = $('#MainContentContainer').find('.QuoteStrip-lastTradeTime').text();
					settledDay = scrapeSettled.substring(scrapeSettled.indexOf("/") + 1, scrapeSettled.lastIndexOf("/"));
					settledDay = parseInt(settledDay);

					if (dateTime.nowWeekday > 5) {
						settlement.settled = "Updated to friday's close.";
					} else if (dateTime.nowMinute < 960) {
						settlement.settled = "Updated to previous day's close.";
					} else {
//						(dateTime.nowMinute >= 960 && dateTime.nowMinute <= 1440) {
						if (settledDay === dateTime.nowDay) {
							settlement.settled = "Updated to today's close.";
						} else {
							settlement.settled = "Waiting for today's update.";
						}
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