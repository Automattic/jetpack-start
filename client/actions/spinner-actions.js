var AppDispatcher = require('../dispatcher/app-dispatcher'),
	JPSConstants = require('../constants/jetpack-start-constants');

var SpinnerActions = {
	show: function() {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SHOW_SPINNER,
		});
	},

	hide: function() {
		AppDispatcher.dispatch({
			actionType: JPSConstants.HIDE_SPINNER,
		});	
	},

	showAsync: function(msg) {
		AppDispatcher.dispatch({
			actionType: JPSConstants.SHOW_ASYNC_SPINNER,
			message: msg
		});		
	},

	hideAsync: function() {
		AppDispatcher.dispatch({
			actionType: JPSConstants.HIDE_ASYNC_SPINNER,
			message: msg
		});			
	}
};

module.exports = SpinnerActions;