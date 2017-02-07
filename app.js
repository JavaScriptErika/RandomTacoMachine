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
	let tacoDescription = `Feast upon a mighty taco packed with the flavors of <b>${tacoObject.seasoning.name}</b> and <b>${tacoObject.base_layer.name}</b>!
		Don't forget the <b>${tacoObject.condiment.name}</b>.
			Best part? It's all tucked away in <b>${tacoObject.shell.name}</b>,
			topped off with <b>${tacoObject.mixin.name}</b>. `;


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

	$.each(tacoIngredients, function () {

		tacoName += this.name + ', ';
	});

	let url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tacoName + "tacos");
	$twitterButton.attr('href', url);

}
//AJAX request with URL and callback function
ajaxRequest = () => {

	$.getJSON(tacoAPI, tacoSummary);
	$tacoFull.hide();

}
//end ajaxRequest()

//Self-executing anonymous function
$(() => {
	ajaxRequest();
});

$nextTaco.on("click", ajaxRequest);

$recipeButton.on('click', () => {
	let fullRecipe = "";

	$.each(tacoObject, function () {

		fullRecipe += this.recipe + '\n\n---\n';
	});
	$tacoFull.toggle();

	tacoToHTML($tacoFull, fullRecipe);

});
