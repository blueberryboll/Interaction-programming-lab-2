var ViewControllerSide = function (view, model) {
	view.peopleDropdown.change(function(){
		model.setNumberOfGuests(view.peopleDropdown.val());
	})

	
	view.confirmDinnerBtn.attr("href", "index4.html");

	this.update = function() {
		if( $('#starter').length !== 0 ) {
			this.mainDish = $("#starter");
			this.mainDish.click(function(){
				model.removeDishTypeFromMenu("starter");
			})
		}
		if( $('#maindish').length !== 0 ) {
			this.mainDish = $("#maindish");
			this.mainDish.click(function(){
				model.removeDishTypeFromMenu("main dish");
			})
		}
		if( $('#dessert').length !== 0 ) {
			this.mainDish = $("#dessert");
			this.mainDish.click(function(){
				model.removeDishTypeFromMenu("dessert");
			})
		}
	}
	this.update();

}