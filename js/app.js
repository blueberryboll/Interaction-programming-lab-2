$(function() {
	
	//We instantiate our model
	var model = new DinnerModel();
	
	// Testing code
	model.setSelectedDish(100);
	model.setNumberOfGuests(3);
	
	//And instatiate the main controller
	//var mainController = new MainController();
	
	//And create the needed controllers and views
	var exampleView = new ExampleView($("#bodyContainer"), model);
});