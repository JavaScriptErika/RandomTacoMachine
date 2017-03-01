# Random Taco Machine

## Similar to a random quote machine, except tacos. 
### Fancy seeing it live? [Click me for tacos!](https://javascripterika.github.io/RandomTacoMachine/)


### User Experience:
The user has the experience of viewing a randomized selection of ingredients, including- condiments, mixins, seasonings, shells and more, to make one beast of a taco (via clicking the "next taco" button). If the user feels so inclined and want to "taco" 'bout it, they can even tweet the list of ingredients from the twitter button!

#### Features:
It was my goal to make this project a fun and delightful experience for the user. 

* The top portion of the page is a video for an engaging effect.

* When the down arrow is clicked, the page will scroll smoothly to the taco description.

* Upon the page loading, a random taco description and recipe is generated. 

* The user can click on the next taco button to show the next the recipe that pertains to the description.

* Taco recipe button "shakes." When the user hovers or focuses on the taco recipe button, it will pause animation.

### Inspiration:
Going through FreeCodeCamp, one of the projects was to create a random quote machine using an api. I searched and searched, but could not find an api I loved or was appropriate for a portfolio piece. So, I ended up finding (yay!) [this lovely taco api] (https://github.com/evz/tacofancy-api) and generated random taco recipes. And, who doesn't love tacos? This is the first time I've used an api ever, and it feels so great to be able to implement it and gain a better understanding on how they work. Needless to say, I definitely see the power api's hold for apps and cannot wait to build more projects!

#### A few thoughts along the way:
* The files for the api are in .MD format - thus, required a library for me to use to convert the format to html to display as the api contributors intended for their submitted recipes. It was an aha moment for me!

* With the api I am using, I had to download the md and jpeg files for all of the ingredients and even pull out a few photos into my root directory. Thus, there are a ton of folders and files! Reason being is there are some internal linking to other files in the recipe, and the url's don't point to a hard url; these files are required so I don't have broken images and links.

* When creating the taco summary/description, I experimented with the order of the ingredient names, hoping to match up the order of how they appear in the description to the recipe. This is not the case--the recipe ingredients appear random each time I deployed it on my local server. I'm thinking this is on the api's end because it is randomly generated. Something more to look into!

* For the background video, I used a public domain video from a site called, [Coverr](https://coverr.co). During the responsive phase of the design process, I noticed there was some gapping at the top of video container with the video not fully expanding at certain widths. I went to Coverr's site and noticed the same thing happening to their videos as well. This led me to using a jQuery plugin that solves responsive issues.

### Goals for upcoming projects:
* Dive into CSS animations

* Look into ways to organize my code via Module Patterns

* Implement more ES6 features

* Practice more with flexbox

* Learn Sass
