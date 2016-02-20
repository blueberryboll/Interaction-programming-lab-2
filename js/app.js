$(function() {
	
	//We instantiate our model
	var model = new DinnerModel();
	
	// Testing code
	model.setSelectedDish(100);
	model.setNumberOfGuests(3);
	
	//And create the needed controllers and views
	var exampleView = new ExampleView($("#bodyContainer"), model);
	
});