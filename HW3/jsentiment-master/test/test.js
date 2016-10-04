$(document).ready(function() {
	var input = $('#tokenizeInput').text();
	var tokenizedOutput = tokenize(input);
	$('#tokenized').text(JSON.stringify(tokenizedOutput));
	$('#afinn').text(getAFINNSentiment(tokenizedOutput).ratio.toString());
	$('#lmPos').text(getLMSentiment(tokenizedOutput).ratioPos.toString());
	$('#lmNeg').text(getLMSentiment(tokenizedOutput).ratioNeg.toString());
});
