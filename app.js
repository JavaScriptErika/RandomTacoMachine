const tacoAPI = "http://taco-randomizer.herokuapp.com/random/";
//empty object initialized so when JSON object is returned, can be accessed globally
let tacoObject = {};
//element id is selected for full description of the recipe
let $tacoFull = $('#tacoFull');
const $recipeButton = $('#recipeButton');
const $nextTaco = $('#nextTacoButton');

//callback function for ajaxRequest() that gives a description of taco recipe
//data is what is returned from the request as a JSON object
const tacoSummary = data => {
	tacoObject = data;
	let $tacoP = $('#tacoP');
	let tacoDescription = "";

	tacoDescription += 'A yummy taco with ' + '<b>' + tacoObject.mixin.name + '</b> ';
	tacoDescription += 'and lots of flavor thanks to ' + '<b>' + tacoObject.seasoning.name + '</b>. ';
	tacoDescription += 'Stuff your face with a big boy portion of ' + '<b>' + tacoObject.base_layer.name + '</b>! ';
	tacoDescription += 'Don\'t forget the ' + '<b>' + tacoObject.condiment.name + '</b>. ';
	tacoDescription += 'Best part? It\'s all tucked away in ' + '<b>' + tacoObject.shell.name + '</b>.';

	tacoToHTML($tacoP, tacoDescription);
	tacoTweet(tacoObject);

} // end tacoSummary()

//converts markdown to html formatting
const tacoToHTML = (htmlElement, tacoMdFormat) => {
	const converter = new showdown.Converter();
	let tacoConverted = converter.makeHtml(tacoMdFormat);
	htmlElement.html(tacoConverted);
}

//grabs tacoObject to iterate through ingredients to tweet
const tacoTweet = tacoIngredients => {

	const $twitterButton = $('#twitterButton');
	let tacoName = "";

	$.each(tacoIngredients, function (i, value) {

		tacoName += this.name + ', ';
	})

	let url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tacoName + "tacos");
	console.log(url);

	$twitterButton.attr('href', url);

}
//AJAX request with URL and callback function
ajaxRequest = () => $.getJSON(tacoAPI, tacoSummary);
//end ajaxRequest()

//when page loads, a recipe will already be available
window.onload = () => {
	ajaxRequest();
	//hides the summary to begin with
	$tacoFull.hide();
}; //end onload event

$nextTaco.on('click', () => {
	ajaxRequest();
	//hides summary when user clicks next taco button
	$tacoFull.hide();
}); // end click event


$recipeButton.on('click', () => {
	let fullRecipe = "";

	$.each(tacoObject, function (i) {

		fullRecipe += this.recipe + '\n\n---\n';
	});
	$tacoFull.toggle();

	tacoToHTML($tacoFull, fullRecipe);

});
