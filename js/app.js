$(function() {
	
	//We instantiate our model
	var model = new DinnerModel();
	
	model.setNumberOfGuests(3);
	
	//And create the needed controllers and views
	var exampleView = new ExampleView($("#bodyContainer"), model);
	
});