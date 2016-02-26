var ViewControllerIndividualRecipe = function (view, model) {	
	view.backToSelectDishBtn.attr("href", "index2.html");
	
	view.confirmDishBtn.click(function(){		
		model.setSelectedDish(view.getDisplayDish());
	})
	
	
}