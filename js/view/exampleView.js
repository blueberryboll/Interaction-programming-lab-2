//Site Wrapper Object constructor
var exampleView = function (container, model) {

	alert("exampleView !");
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	
	this.new_dinner_btn = container.find("#new-dinner-btn");
	this.new_dinner_btn.html("Hello World");
	this.new_dinner_btn.hide();
	
}
 
