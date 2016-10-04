var trainingSet = require('../training.json');

function bagOfWords(tokens) {
	bag = {};
	for (var i = 0; i < tokens.length; i++) {
		if (tokens[i] === undefined) bag[tokens[i]] = 1;
		else bag[tokens[i]]++;
	}
	return bag;
}

function trainingPosBag() {
	var posBag = {};
	for (var i = 0; i < trainingSet['positive'].length; i++) {
		var tokens = tokenize(trainingSet['positive'][i]);
		$.extend({}, posBag, bagOfWords(tokens));
	}
	return posBag;
}

function trainingNegBag() {
	var negBag = {};
	for (var i = 0; i < trainingSet['negative'].length; i++) {
		var tokens = tokenize(trainingSet['negative'][i]);
		$.extend({}, negBag, bagOfWords(tokens));
	}
	return negBag;
}

function trainingBag() {
	return $.extend({}, trainingPosBag(), trainingNegBag());
}

function classify(doc) {
	var tokens = tokenize(doc);
	var bag = bagOfWords(tokens);
	var priors = calculatePriors(trainingBag());
	var pPos = calculatePriors(trainingPosBag());
	var pNeg = calculatePriors(trainingNegBag());
	var probPos = 0, probNeg = 0;
	for (var i = 0; i < tokens; i++) {
		probPos += pPos[tokens[i]] * priors[tokens[i]];
		probNeg += pNeg[tokens[i]] * priors[tokens[i]];
	}
	probPos /= tokens['positive'].length;
	probNeg /= tokens['negative'].length;

	return {'pos': probPos, 'neg': probNeg};
}

function calculateTotal(bagOfWords) {
	var sum = 0;
	for (var word in bagOfWords) {
		sum += bagOfWords[word];
	}
	return sum;
}

function calculatePriors(bagOfWords) {
	var priors = {};
	var total = calculateTotal(bagOfWords);
	for (var word in bagOfWords) {
		priors[word] = bagOfWords[word]/total;
	}
	return priors;
}
