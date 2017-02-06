const tacoAPI = "http://taco-randomizer.herokuapp.com/random/";
let tacoObject = {};
let $tacoFull = $('#tacoFull');
const $recipeButton = $('#recipeButton');
const $nextTaco = $('#nextTacoButton');


function tacoSummary(data) {
	tacoObject = data;
	let $tacoP = $('#tacoP');
	let tacoDescription = "";

	tacoDescription += "A yummy taco with " + '<b>' + tacoObject.mixin.name + '</b> ';
	tacoDescription += "and lots of flavor thanks to " + '<b>' + tacoObject.seasoning.name + '</b>. ';
	tacoDescription += "Stuff your face with a big boy portion of " + '<b>' + tacoObject.base_layer.name + '</b>! ';
	tacoDescription += 'Don\'t forget the ' + '<b>' + tacoObject.condiment.name + '</b>. ';
	tacoDescription += "Best part? It's all tucked away in " + '<b>' + tacoObject.shell.name + '</b>.';

	tacoToHTML($tacoP, tacoDescription);
	tacoTweet(tacoObject);

} // end tacoSummary()

function tacoTweet(tacoObject) {

	$twitterButton = $('#twitterButton');
	let tacoName = "";

	$.each(tacoObject, function (i) {

		tacoName += this.name + ', ';
	})

	var url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tacoName + "tacos");
	console.log(url);

	$twitterButton.attr('href', url);

}


function tacoToHTML(htmlElement, tacoMdFormat) {
	const converter = new showdown.Converter();
	let tacoConverted = converter.makeHtml(tacoMdFormat);
	htmlElement.html(tacoConverted);
}

function ajaxRequest() {
	$.getJSON(tacoAPI, tacoSummary);

} //end ajaxRequest()


window.onload = function () {
	ajaxRequest();
	$tacoFull.hide();

}; //end onload event

$nextTaco.on('click', function () {
	ajaxRequest();
	$tacoFull.hide();
}); // end click event


$recipeButton.on('click', function () {
	let fullRecipe = "";

	$.each(tacoObject, function (i) {

		fullRecipe += this.recipe + '\n\n---\n';
	});
	$tacoFull.toggle();

	tacoToHTML($tacoFull, fullRecipe);

});
