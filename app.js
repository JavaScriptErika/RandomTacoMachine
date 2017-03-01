const tacoAPI = "https://taco-randomizer.herokuapp.com/random/",
		 $nextTaco = $('#nextTaco');
//empty object initialized so when JSON object is returned, can be accessed globally
let tacoObject = {},
		$tacoFull = $('#tacoFull'),
		$tacoP = $('#tacoP');

//callback function for ajaxRequest() that gives a description of taco recipe
//data is what is returned from the request as a JSON object
const tacoSummary = data => {
	tacoObject = data;
	let fullRecipe = "",
			tacoDescription = `<strong>Feast upon a mighty taco packed with:</strong> <em>${tacoObject.base_layer.name}</em> and the flavors of <em>${tacoObject.seasoning.name}</em>. Top it off with beastly gobs of <em>${tacoObject.mixin.name}</em> and <em>${tacoObject.condiment.name}</em>. Be responsible and stuff your fillings in some <em>${tacoObject.shell.name}</em>.`;

	$.each(tacoObject, function () {
		fullRecipe += this.recipe + '\n\n---\n';
	});

	tacoToHTML($tacoFull, fullRecipe);
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
	let tacoName = "",
			url = "";

	$.each(tacoIngredients, function () {
		tacoName += this.name + ', ';
	});

	url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tacoName + "tacos");

	$twitterButton.attr('href', url);

}

ajaxRequest = () => {
//AJAX request with URL and callback function
	$.getJSON(tacoAPI, tacoSummary)
	.fail(() => {
		$tacoP.html(`Rawr! Something went wrong. Please try again later.`);
	})
}


window.onload = function () {
	ajaxRequest();
}

$nextTaco.on("click", ajaxRequest);

//Smooth scrolling effect
$(function () {
	$('a[href*="#"]:not([href="#"])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
});
