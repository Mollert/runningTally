
const theCommas = (addC) => {

	addC = addC.toFixed(2);

	if (addC.length === 10) {
		addC = addC.slice(0, 1) + "," + addC.slice(1, -6) + "," + addC.slice(-6);
	} else if (addC.length < 10 || addC.length > 6) {
		addC = addC.slice(0, -6) + "," + addC.slice(-6);
	} else {
		addC = addC;
	}

	return addC;
}

module.exports = theCommas;
