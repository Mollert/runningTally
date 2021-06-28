
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

// Wrapped date into function so it generates the correct date every time the seb page is hit
const postDates = () => {
	let rightNow = DateTime.now();

// Minus four hours because of UTC time zone on Digital Ocean servers
	rightNow = rightNow.minus({hours: 4});

	let theDate = {
		wMonth: "",
		woMonth: ""
	}
// Make sure the date is Monday(1) during the day to Friday(5) night only
	switch (rightNow.weekday) {
		case 1:
			if (rightNow.hour < 18) {
				rightNow = rightNow.minus({days: 3});
			}
			break;	
		case 2:
		case 3:
		case 4:
		case 5:
			if (rightNow.hour < 18) {
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
	theDate.wMonth = rightNow.weekdayLong + ", " + rightNow.monthLong + " " + rightNow.day + tailEnd(rightNow.day);
	theDate.woMonth = rightNow.weekdayLong + " the " + rightNow.day + tailEnd(rightNow.day);

	return theDate;
}


module.exports = postDates;