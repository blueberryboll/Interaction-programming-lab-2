//Site Wrapper Object constructor
var ExampleView = function (container, model) {

	this.displayDish = 0;
	
	this.setDisplayDish = function(id) {
		this.displayDish = id;
		sessionStorage.setItem("displayDish", this.displayDish);
	}
	
	this.getDisplayDish = function() {
		return this.displayDish;
	}
	
	this.initDisplayDish = function() {
		//if( !isNaN(parseInt(sessionStorage.getItem("displayDish"))) ) { this.displayDish = parseInt(sessionStorage.getItem("displayDish")); };
		if( this.getQueryVariable("recipeId") !== false ) { this.displayDish = parseInt(this.getQueryVariable("recipeId")); };
	}
	
	this.getQueryVariable = function(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
	}
	
	this.update = function(){

		// Get all the relevant elements of the view (ones that show data
	  	// and/or ones that responed to interaction) and populate with data from model
		
		// Welcome view
		if( $('#newDinnerBtn').length !== 0 ) {
			this.newDinnerBtn = $("#newDinnerBtn");
		}


		// Side menu
		if( $('.view-side').length !== 0 ) {
			this.peopleDropdown = $("#peopleDropdown");
			this.peopleDropdown.val(model.getNumberOfGuests());
			
			// Add selected items
			this.displayDishItems = container.find("#selectedDishItems");
			this.displayDishItems.html('<p class="dish">Pending</p><p class="cost" id="pendingCost">0.00</p>');
			
			if(model.isDishSelected(this.
				displayDish) === false){
				this.pendingCost = container.find("#pendingCost");
				this.pendingCost.html(model.getDishPrice( this.displayDish ));
			}

			
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
				var menuItemCostPA = document.createElement('a');
				menuItemCostPA.setAttribute('class','removal');
				menuItemCostPA.setAttribute('id',selectedDishes[i].type.replace(/\s+/, "") );
				menuItemCostPA.setAttribute('href','#');
				var menuItemCostPAText = document.createTextNode("╳");
				menuItemCostPA.appendChild(menuItemCostPAText);
				menuItemCostP.appendChild(menuItemCostPA);

				this.displayDishItems.prepend(menuItemCostP);				
				this.displayDishItems.prepend(menuItemNameP);
			}

			this.totalPrice = container.find("#totalPrice");
			this.totalPrice.html("SEK "+model.getTotalMenuPrice());

			this.confirmDinnerBtn = $("#confirmDinner");

			if(this.viewControllerSide ){
				this.viewControllerSide.update();
			}
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
		}
		
		// Individual recipe
		if( $('#individualRecipeTitle').length !== 0 ) {
			this.individualRecipeTitle = container.find("#individualRecipeTitle");
			this.individualRecipeTitle.html(model.getDish( this.displayDish ).name);

			this.titleImg = container.find("#titleImg");
			titleImg.src="images/"+model.getDish( this.displayDish ).image;

			this.individualRecipeDescription = container.find("#individualRecipeDescription");
			this.individualRecipeDescription.html(model.getDish( this.displayDish ).description);

			this.individualRecipePreparation = container.find("#individualRecipePreparation");
			this.individualRecipePreparation.html(model.getDish( this.displayDish ).description);
			
			this.recipeCost = container.find("#recipeCost");
			this.recipeCost.html("SEK "+model.getDishPrice( this.displayDish ));

			// Fill in ingredient list
			this.ingredientList = container.find("#recipeIngredientList");
			this.ingredientList.html('');

			var recipeIngredients = model.getDish( this.displayDish ).ingredients;
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
			
			this.backToSelectDishBtn = container.find("#backToSelectDish");
			
			this.confirmDishBtn = container.find("#confirmDish");
		}
		
		// Info panel
		if( $('#panel-info').length !== 0 ) {
			this.panelTitle = container.find("#panel-title");
			this.panelTitle.html("My Dinner: "+model.getNumberOfGuests()+" people");
			
			this.backtoEditDinnerBtn = container.find("#backtoEditDinner");
		}
		
		// Menu thumbs
		if( $('#menuThumbs').length !== 0 ) {			
			this.menuThumbs = container.find("#menuThumbs");
			this.menuThumbs.html('<div class="clearfix visible-xs"></div><div class="col-xs-2" id ="vline"><p class="priceAlign" id="sumCost">Total Cost: 0SEK</p></div>');
			
			this.sumCost = container.find("#sumCost");
			this.sumCost.html("Total Cost: "+model.getTotalMenuPrice()+"SEK");
			
			var menuDishes = model.getFullMenu();
			for(var i=0; i<menuDishes.length; i++) {
				var recipeDiv = document.createElement('div');
				recipeDiv.setAttribute('class','col-xs-3');

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
			
			this.printBtn = container.find("#print");
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
	
	// Make observer of the model
	model.addObserver(this);
	
	//Initialise variable
	this.initDisplayDish();

	// Populate layout elements with data from the model
	this.update();
	
	// Initialise view controllers
	// Welcome view
	if( $('#newDinnerBtn').length !== 0 ) { this.viewControllerWelcome = new ViewControllerWelcome(this,model); }
	// Side menu
	if( $('.view-side').length !== 0 ) { this.viewControllerSide = new ViewControllerSide(this,model); }
	// Recipe tiles & Selection panel
	if( $('#recipeTiles').length !== 0 ) { this.viewControllerPanel = new ViewControllerPanel(this,model);}
	// Individual recipe
	if( $('#individualRecipeTitle').length !== 0 ) { this.viewControllerIndividualRecipe = new ViewControllerIndividualRecipe(this,model);}
	// Info panel
	if( $('#panel-info').length !== 0 ) { this.viewControllerPanelInfo = new ViewControllerPanelInfo(this,model);}
	// Menu thumbs
	if( $('#menuThumbs').length !== 0 ) { this.viewControllerMenuThumbs = new ViewControllerMenuThumbs(this,model);}
}
 
