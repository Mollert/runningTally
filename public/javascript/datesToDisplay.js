
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

let rightNow = new Date();

let theDate = {
	wMonth: "",
	woMonth: ""
}


// Make sure the date is Monday during the day to Friday night only
switch (rightNow.getDay()) {
	case 0:
		rightNow.setDate(rightNow.getDate() - 2);
		break;
	case 1:
		if (rightNow.getHours() < 18) {
			rightNow.setDate(rightNow.getDate() - 3);
		}
		break;	
	case 2:
	case 3:
	case 4:
	case 5:
		if (rightNow.getHours() < 18) {
			rightNow.setDate(rightNow.getDate() - 1);
		}	
		break;
	case 6:
		rightNow.setDate(rightNow.getDate() - 1);
		break;
	default:
		break;
}

// Creates dates to be used.  With and without the month
theDate.wMonth = daysOfWeek[rightNow.getDay()] + ", " + monthsOfYear[rightNow.getMonth()] + " " + rightNow.getDate() + tailEnd(rightNow.getDate());
theDate.woMonth = daysOfWeek[rightNow.getDay()] + " the " + rightNow.getDate() + tailEnd(rightNow.getDate());


module.exports = theDate;