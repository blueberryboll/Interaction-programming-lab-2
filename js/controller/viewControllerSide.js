var ViewControllerSide = function (view, model) {
	view.peopleDropdown.change(function(){
		model.setNumberOfGuests(view.peopleDropdown.val());
	})

	
	view.confirmDinnerBtn.attr("href", "index4.html");

	

}