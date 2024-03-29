
const { DateTime } = require("luxon");

// Selects day description due to number
const tailEnd = (whatDay) => {
	if (whatDay === 1 || whatDay === 21 || whatDay === 31) {
		return "st";
	} else if (whatDay === 2 || whatDay === 22) {
		return "nd";
	} else if (whatDay === 3 || whatDay === 23) {
		return "rd";
	} else {
		return "th";
	}
}

const getDateTime = () => {

// Minus five hours because of UTC time zone on Digital Ocean servers
	let rightNow = DateTime.now();
//	rightNow = rightNow.minus({hours: 5});

// Need true day of the month and present minute for scraping file
	let nowMinute = (rightNow.hour * 60) + rightNow.minute;
	let nowDay = rightNow.day;
	let nowWeekday = rightNow.weekday;

// Make sure the date is Monday(1) during the day to Friday(5) night only
	switch (rightNow.weekday) {
		case 1:
			if (rightNow.hour < 16) {
				rightNow = rightNow.minus({days: 3});
			}
			break;	
		case 2:
		case 3:
		case 4:
		case 5:
			if (rightNow.hour < 16) {
				rightNow = rightNow.minus({ days: 1 });
			}	
			break;
		case 6:
		case 7:
			rightNow = rightNow.set({weekday: 5});
			break;		
		default:
			break;
	}
// Creates dates to be used.  With and without the month
	let wMonth = rightNow.weekdayLong + ", " + rightNow.monthLong + " " + rightNow.day + tailEnd(rightNow.day);
	let woMonth = rightNow.weekdayLong + " the " + rightNow.day + tailEnd(rightNow.day);

return { wMonth, woMonth, nowWeekday, nowDay, nowMinute };
}


module.exports = getDateTime;