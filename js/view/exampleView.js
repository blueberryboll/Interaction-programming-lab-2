//Site Wrapper Object constructor
var ExampleView = function (container, model) {

	
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	
	// Side menu
	if( $('.view2').length !== 0 ) {
		this.people = container.find("#dropdownMenu1");
		this.people.html(model.getNumberOfGuests());

		this.totalPrice = container.find("#totalPrice");
		this.totalPrice.html("SEK "+model.getTotalMenuPrice());
	}
	

	// Recipe tiles
	this.recipeTiles = container.find("#recipeTiles");
	if( $('#recipeTiles').length !== 0 ) {
		allDishes = model.getAllDishes('main dish');
		for(var i=0; i<allDishes.length; i++) {
			var recipeDiv = document.createElement('div');
			recipeDiv.setAttribute('class','col-xs-3');

			var recipeImg = document.createElement('img');
			recipeImg.setAttribute('class','imgThumb');
			recipeImg.setAttribute('src','images/'+allDishes[i].image);
			recipeDiv.appendChild(recipeImg);

			var recipeTitleDiv = document.createElement('div');
			recipeTitleDiv.setAttribute('class','panel');
			var recipeTitleH2 = document.createElement('h2');
			recipeTitleH2.setAttribute('class','recipeTitle');
			var recipeTitleH2Text = document.createTextNode(allDishes[i].name);
			recipeTitleH2.appendChild(recipeTitleH2Text);
			recipeTitleDiv.appendChild(recipeTitleH2);
			recipeDiv.appendChild(recipeTitleDiv);
			
			var recipeP = document.createElement('p');
			var recipePText = document.createTextNode(allDishes[i].description);
			recipeP.appendChild(recipePText);
			recipeDiv.appendChild(recipeP);


			recipeTiles.appendChild(recipeDiv);
		}
	}
	
	if( $('#individualRecipeTitle').length !== 0 ) {
		// Individual recipe
		this.individualRecipeTitle = container.find("#individualRecipeTitle");
		this.individualRecipeTitle.html(model.getDish(100).name);

		this.titleImg = container.find("#titleImg");
		titleImg.src="images/"+model.getDish(100).image;

		this.individualRecipeDescription = container.find("#individualRecipeDescription");
		this.individualRecipeDescription.html(model.getDish(100).description);

		this.individualRecipePreparation = container.find("#individualRecipePreparation");
		this.individualRecipePreparation.html(model.getDish(100).description);

		// Fill in ingredient list
		this.ingredientList = container.find("#recipeIngredientList");

		recipeIngredients = model.getDish(100).ingredients;
		for(var i=0; i<recipeIngredients.length; i++) {
			var ingredientDiv = document.createElement('div');
			ingredientDiv.setAttribute('class','ingredient');
			var ingredientDivText = document.createTextNode(recipeIngredients[i].quantity+" "+recipeIngredients[i].unit+" "+recipeIngredients[i].name);
			ingredientDiv.appendChild(ingredientDivText);

			var inCostDiv = document.createElement('div');
			inCostDiv.setAttribute('class','inCost');
			var inCostDivText = document.createTextNode("SEK "+recipeIngredients[i].price);
			inCostDiv.appendChild(inCostDivText);

			this.ingredientList.append(ingredientDiv);
			this.ingredientList.append(inCostDiv);
		}

	}
}
 
