
const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");


const createPromises = (theGroup) => {

	let allPs = [];
	let thePrice = 0;

	theGroup.forEach((tick) => {
		let startP = new Promise((resolve, reject) => {
			fetch("https://finance.yahoo.com/quote/" + tick + "?p=" + tick)			
			.then(response => {
				return response.text();
			})
			.then(reply => {
				const $ = cheerio.load(reply);
				if (tick === "GLD") {
					thePrice = $('.quote-header-section').find('span').eq(11).text();
				} else {
					thePrice = $('.quote-header-section').find('span').eq(3).text();
				}
				resolve(thePrice);
			})
			.catch(() => "error");

		})
		allPs.push(startP);
	})
	return allPs;
}


module.exports = createPromises;