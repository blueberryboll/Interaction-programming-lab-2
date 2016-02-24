var ViewControllerPanel = function (view, model) {
	view.typeDropdown.change(function(){
		model.retrieveNewData();
	})

	view.searchText.change(function(){
		model.retrieveNewData();

	})

	view.searchBtn.click(function(){		
		model.retrieveNewData();
	})
	

}