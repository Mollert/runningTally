
const catchError = (theFour) => {

	let postError = [false];

	for (let i = 0 ; i < theFour.length ; i++) {
		if (theFour[i].price === "") {
			postError.push(theFour[i].tick + " returned a blank result.");
			postError[0] = true;
		} else if (isNaN(theFour[i].price)) {
			postError.push(theFour[i].tick + " what was returned was not a number.");
			postError[0] = true;
		} else {
			postError.push(theFour[i].tick + " returned correct data.");
		}
	}

	return postError;
}


module.exports = catchError;