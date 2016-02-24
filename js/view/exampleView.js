//Site Wrapper Object constructor
var ExampleView = function (container, model) {

	this.update = function(){

		// Get all the relevant elements of the view (ones that show data
	  	// and/or ones that responed to interaction)
		
		//welcome view
		if( $('#newDinnerBtn').length !== 0 ) {
			this.newDinnerBtn = $("#newDinnerBtn");
			// Add view controller
			this.viewControllerWelcome = new ViewControllerWelcome(this,model);
		}


		// Side menu
		if( $('.view-side').length !== 0 ) {
			this.peopleDropdown = $("#peopleDropdown");
			this.peopleDropdown.val(model.getNumberOfGuests());
			
			// Add selected items
			this.selectedDishItems = container.find("#selectedDishItems");
			this.selectedDishItems.html('');
			
			var selectedDishes = model.getFullMenu();
			for(var i=0; i<selectedDishes.length; i++) {
				var menuItemNameP = document.createElement('p');
				menuItemNameP.setAttribute('class','dish');
				var menuItemNamePText = document.createTextNode(selectedDishes[i].name);
				menuItemNameP.appendChild(menuItemNamePText);
				
				var menuItemCostP = document.createElement('p');
				menuItemCostP.setAttribute('class','cost');
				var menuItemCostPText = document.createTextNode(model.getDishPrice(selectedDishes[i].id));
				menuItemCostP.appendChild(menuItemCostPText);
				
				this.selectedDishItems.append(menuItemNameP);
				this.selectedDishItems.append(menuItemCostP);
			}

			this.totalPrice = container.find("#totalPrice");
			this.totalPrice.html("SEK "+model.getTotalMenuPrice());

			this.confirmDinnerBtn = $("#confirmDinner");

			// Add view controller
			this.viewControllerSide = new ViewControllerSide(this,model);
		}
		

		// Recipe tiles & Selection panel
		if( $('#recipeTiles').length !== 0 ) {
			this.recipeTiles = container.find("#recipeTiles");
			this.recipeTiles.html('');

			this.typeDropdown = $("#typeDropdown");
			this.searchText = $("#searchText");
			this.searchBtn = $("#searchBtn");

			var allDishes;
			if( this.searchText.val() === ''){
				allDishes = model.getAllDishes(this.typeDropdown.val()); 
			}
			else{
				allDishes = model.getAllDishes(this.typeDropdown.val(), this.searchText.val());
			}

			for(var i=0; i<allDishes.length; i++) {
				var recipeDiv = document.createElement('div');
				recipeDiv.setAttribute('class','col-xs-3');

				var recipeA = document.createElement('a');
				recipeA.setAttribute('href','index3.html?recipeId='+allDishes[i].id);
				var recipeAImg = document.createElement('img');
				recipeAImg.setAttribute('class','imgThumb');
				recipeAImg.setAttribute('src','images/'+allDishes[i].image);
				recipeA.appendChild(recipeAImg);
				recipeDiv.appendChild(recipeA);

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
			

			// Add view controller
			this.viewControllerPanel = new ViewControllerPanel(this,model);
		}
		
		// Individual recipe
		if( $('#individualRecipeTitle').length !== 0 ) {
			this.individualRecipeTitle = container.find("#individualRecipeTitle");
			this.individualRecipeTitle.html(model.getDish(100).name);

			this.titleImg = container.find("#titleImg");
			titleImg.src="images/"+model.getDish(100).image;

			this.individualRecipeDescription = container.find("#individualRecipeDescription");
			this.individualRecipeDescription.html(model.getDish(100).description);

			this.individualRecipePreparation = container.find("#individualRecipePreparation");
			this.individualRecipePreparation.html(model.getDish(100).description);
			
			this.recipeCost = container.find("#recipeCost");
			this.recipeCost.html("SEK "+model.getDishPrice(100));

			// Fill in ingredient list
			this.ingredientList = container.find("#recipeIngredientList");
			this.ingredientList.html('');

			var recipeIngredients = model.getDish(100).ingredients;
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

			// Add view controller
			this.viewControllerIndividualRecipe = new ViewControllerIndividualRecipe(this,model);
		}
		
		// Info panel
		if( $('#panel-info').length !== 0 ) {
			this.panelTitle = container.find("#panel-title");
			this.panelTitle.html("My Dinner: "+model.getNumberOfGuests()+" people");
		}
		
		// Menu thumbs
		if( $('#menuThumbs').length !== 0 ) {
			this.sumCost = container.find("#sumCost");
			this.sumCost.html("Total Cost: "+model.getTotalMenuPrice()+"SEK");
			
			this.menuThumbs = container.find("#menuThumbs");
			this.menuThumbs.html('<div class="col-xs-2" id ="vline"><p class="priceAlign" id="sumCost">Total Cost: 0SEK</p></div>');
			var menuDishes = model.getFullMenu();
			for(var i=0; i<menuDishes.length; i++) {
				var recipeDiv = document.createElement('div');
				recipeDiv.setAttribute('class','col-xs-2');

				var recipeImg = document.createElement('img');
				recipeImg.setAttribute('class','imgThumb');
				recipeImg.setAttribute('src','images/'+menuDishes[i].image);
				recipeDiv.appendChild(recipeImg);

				var recipeTitleDiv = document.createElement('div');
				recipeTitleDiv.setAttribute('class','panel');
				var recipeTitleH2 = document.createElement('h2');
				recipeTitleH2.setAttribute('class','recipeTitle');
				var recipeTitleH2Text = document.createTextNode(menuDishes[i].name);
				recipeTitleH2.appendChild(recipeTitleH2Text);
				recipeTitleDiv.appendChild(recipeTitleH2);
				recipeDiv.appendChild(recipeTitleDiv);
				
				var recipeP = document.createElement('p');
				recipeP.setAttribute('class','priceAlign');
				var recipePText = document.createTextNode(model.getDishPrice(menuDishes[i].id)+" SEK");
				recipeP.appendChild(recipePText);
				recipeDiv.appendChild(recipeP);


				this.menuThumbs.prepend(recipeDiv);
			}
		}
		
		// Summary container
		if( $('#summaryContainer').length !== 0 ) {
			this.summaryContainer = container.find("#summaryContainer");
			this.summaryContainer.html('');

			
			var menuDishes = model.getFullMenu();
			for(var i=0; i<menuDishes.length; i++) {
				var recipeSummaryDiv = document.createElement('div');
				recipeSummaryDiv.setAttribute('class','recipeSummary');

				var recipeImg = document.createElement('img');
				recipeImg.setAttribute('class','photo');
				recipeImg.setAttribute('src','images/'+menuDishes[i].image);
				recipeSummaryDiv.appendChild(recipeImg);
				
				var recipeDescriptionDiv = document.createElement('div');
				recipeDescriptionDiv.setAttribute('class','description');
				var recipeTitleH2 = document.createElement('h2');
				var recipeTitleH2Text = document.createTextNode(menuDishes[i].name);
				recipeTitleH2.appendChild(recipeTitleH2Text);
				recipeDescriptionDiv.appendChild(recipeTitleH2);
				var recipeDescriptionP = document.createElement('p');
				var recipeDescriptionPText = document.createTextNode(menuDishes[i].description);
				recipeDescriptionP.appendChild(recipeDescriptionPText);
				recipeDescriptionDiv.appendChild(recipeDescriptionP);
				recipeSummaryDiv.appendChild(recipeDescriptionDiv);
				
				var recipePreparationDiv = document.createElement('div');
				recipePreparationDiv.setAttribute('class','preparation');
				var recipeTitleH4 = document.createElement('h4');
				var recipeTitleH4Text = document.createTextNode('Preparation');
				recipeTitleH4.appendChild(recipeTitleH4Text);
				recipePreparationDiv.appendChild(recipeTitleH4);
				var recipePreparationP = document.createElement('p');
				var recipePreparationPText = document.createTextNode(menuDishes[i].description);
				recipePreparationP.appendChild(recipePreparationPText);
				recipePreparationDiv.appendChild(recipePreparationP);
				recipeSummaryDiv.appendChild(recipePreparationDiv);
				
				this.summaryContainer.append(recipeSummaryDiv);
				
				
				var recipeSummaryDiv = document.createElement('div');
				recipeSummaryDiv.setAttribute('style','clear:both height:0;');
				
				this.summaryContainer.append(recipeSummaryDiv);
			}
		}
	}
	model.addObserver(this);

	this.update();	
}
 
