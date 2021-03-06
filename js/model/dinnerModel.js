//DinnerModel Object constructor
var DinnerModel = function() {
 
	// Data structure to hold number of guests
	// and selected dinner options for dinner menu
	
	var numberOfGuests = 1;
	
	var dishStarterId = 0;
	var dishMainId = 0;
	var dishDessertId = 0;
	
	// Load data from session
	if( !isNaN(parseInt(sessionStorage.getItem("numberOfGuests"))) ) { numberOfGuests = parseInt(sessionStorage.getItem("numberOfGuests")); };
	if( !isNaN(parseInt(sessionStorage.getItem("dishStarterId"))) ) { dishStarterId = parseInt(sessionStorage.getItem("dishStarterId")); };
	if( !isNaN(parseInt(sessionStorage.getItem("dishMainId"))) ) { dishMainId = parseInt(sessionStorage.getItem("dishMainId")); };
	if( !isNaN(parseInt(sessionStorage.getItem("dishDessertId"))) ) { dishDessertId = parseInt(sessionStorage.getItem("dishDessertId")); };


	this.setNumberOfGuests = function(num) {
		numberOfGuests = num;
		sessionStorage.setItem("numberOfGuests", numberOfGuests);
		notifyObservers();
	}

	// should return 
	this.getNumberOfGuests = function() {
		return numberOfGuests;
	}

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		for (var i = 0; i < dishes.length; i++) {
			if(dishes[i].type === type && (dishes[i].id === dishStarterId || dishes[i].id === dishMainId || dishes[i].id === dishDessertId)){
				return dishes[i];
			}
		}
	}
	// Set selected dish for menu
	this.setSelectedDish = function(id) {
		id = parseInt(id);
		if(this.getDish(id).type === "starter") {
			dishStarterId = id;
			sessionStorage.setItem("dishStarterId", dishStarterId);
		} else if(this.getDish(id).type === "main dish") {
			dishMainId = id;
			sessionStorage.setItem("dishMainId", dishMainId);
		} else if(this.getDish(id).type === "dessert") {
			dishDessertId = id;
			sessionStorage.setItem("dishDessertId", dishDessertId);
		}
		notifyObservers();
	}
	// Remove selected dish from menu
	this.removeSelectedDish = function(type) {
		if(type === "starter") {
			dishStarterId = 0;
			sessionStorage.setItem("dishStarterId", dishStarterId);
		} else if(type === "main dish") {
			dishMainId = 0;
			sessionStorage.setItem("dishMainId", dishMainId);
		} else if(type === "dessert") {
			dishDessertId = 0;
			sessionStorage.setItem("dishDessertId", dishDessertId);
		}
		notifyObservers();
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		var menuDishes = [];
		if(dishStarterId !== 0) {
			//menuDishes[0] = this.getSelectedDish('starter');
			menuDishes.push( this.getSelectedDish('starter') );
		}
		if(dishMainId !== 0) {
			//menuDishes[1] = this.getSelectedDish('main dish');
			menuDishes.push( this.getSelectedDish('main dish') );
		}
		if(dishDessertId !== 0) {
			//menuDishes[2] = this.getSelectedDish('dessert');
			menuDishes.push( this.getSelectedDish('dessert') );
		}
		return menuDishes;
	}

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		var fullMenu = this.getFullMenu();
		var allIngredients = [];
		for (i = 0; i < fullMenu.length; i++) {
			for (j = 0; j < fullMenu[i].ingredients.length; j++) {
				allIngredients.push(fullMenu[i].ingredients[j]);
			}
		}
		return allIngredients;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var allIngredients = this.getAllIngredients();
		var totalCost=0;
		for (i = 0; i < allIngredients.length; i++) {
			totalCost += allIngredients[i].price;
		}
		return Math.round( (totalCost/4*this.getNumberOfGuests()) *100)/100;
	}
	
	//Returns the price for one dish (all the ingredients multiplied by number of guests)
	this.getDishPrice = function(id) {
		var allIngredients = this.getDish(id).ingredients;

		var totalCost=0;
		for (i = 0; i < allIngredients.length; i++) {
			totalCost += allIngredients[i].price;
		}
		return Math.round( (totalCost/4*this.getNumberOfGuests()) *100)/100;
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		var dishType;
		for (i = 0; i < dishes.length; i++) {
			if(dishes[i].id === id){
				dishType= dishes[i].type;
			}
		}
		if(dishType === 'starter'){
			dishStarterId = id;
		}
		else if(dishType === 'main dish'){
			dishMainId = id;
		}
		else if(dishType === 'dessert'){
			dishDessertId = id;
		}
	}
	//Check if recipe is selected for menu
	this.isDishSelected = function(id) {
		if(id === dishStarterId || id === dishMainId || id === dishDessertId){
			return true;
		}
		else{
			return false;
		}
	}
	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		var dishType;
		for (i = 0; i < dishes.length; i++) {
			if(dishes[i].id === id){
				dishType= dishes[i].type;
			}
		}
		if(dishType === 'starter'){
			dishStarterId = 0;
			sessionStorage.setItem("dishStarterId", dishStarterId);
		}
		else if(dishType === 'main dish'){
			dishMainId = 0;
			sessionStorage.setItem("dishMainId", dishStarterId);
		}
		else if(dishType === 'dessert'){
			dishDessertId = 0;
			sessionStorage.setItem("dishDessertId", dishStarterId);
		}
		notifyObservers();
	}

	//Removes dish from menu
	this.removeDishTypeFromMenu = function(dishType) {
		if(dishType === 'starter'){
			dishStarterId = 0;
			sessionStorage.setItem("dishStarterId", dishStarterId);
		}
		else if(dishType === 'main dish'){
			dishMainId = 0;
			sessionStorage.setItem("dishMainId", dishStarterId);
		}
		else if(dishType === 'dessert'){
			dishDessertId = 0;
			sessionStorage.setItem("dishDessertId", dishStarterId);
		}
		notifyObservers();
	}

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type,filter) {
	  return $(dishes).filter(function(index,dish) {
		var found = true;
		if(filter){
			found = false;
			$.each(dish.ingredients,function(index,ingredient) {
				if(ingredient.name.indexOf(filter)!=-1) {
					found = true;
				}
			});
			if(dish.name.indexOf(filter) != -1)
			{
				found = true;
			}
		}
	  	return dish.type == type && found;
	  });	
	}

	//function that returns a dish of specific ID
	this.getDish = function (id) {
	  for(key in dishes){
			if(dishes[key].id == id) {
				return dishes[key];
			}
		}
	}

	this.addObserver = function(observer){
		observers.push(observer);

	}

	var notifyObservers = function(){
		for(var i = 0; i<observers.length; i++){
			observers[i].update();

		}
	}

	this.retrieveNewData = function(){
		notifyObservers();

	}


	var observers = [];

	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.

	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

}
