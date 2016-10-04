function tokenize(string) {
	var stringArr = string.toLowerCase()
			.replace(/['";:,.\/?\\-]/g, '')
		  	.split(/\b\s+/);
	//Remove empty element
	if (stringArr.indexOf("") > -1) { 
		stringArr.splice(stringArr.indexOf(""), 1);
	}
	//Remove duplicates
	stringArr = stringArr.filter(function(element, index) {
		return stringArr.indexOf(element.toLowerCase()) == index;
	});

	return stringArr;
}

// For use in production
//$.getJSON(<some url>/afinn).done(function(data) {
	// Assign the data to a variable.
//});

function getAFINNSentiment(tokens) {
	var score = 0, size = 0;
	for (var i = 0; i < tokens.length; i++) {
		if (tokens[i] in afinnData) {
			score += afinnData[tokens[i]];
			size++;
		}
	}
	return {"ratio": score/size, "score":score, "size":size};
}

function getLMSentiment(tokens) {
	var scorePositive = 0, scoreNegative = 0, size = 0;
	for (var i = 0; i < tokens.length; i++) {
		if (tokens[i].toUpperCase() in lmData) {
			scorePositive += lmData[tokens[i].toUpperCase()].pos;
			scoreNegative += lmData[tokens[i].toUpperCase()].neg;
			size++;
		}
	}
	return {"ratioPos":scorePositive/size, "ratioNeg":scoreNegative/size, "size":size};
}

function bagOfWords(tokens) {
	bag = {};
	for (var i = 0; i < tokens.length; i++) {
		if (tokens[i] === undefined) bag[tokens[i]] = 1;
		else bag[tokens[i]]++;
	}
	return bag;
}
