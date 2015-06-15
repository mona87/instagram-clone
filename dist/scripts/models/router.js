var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $

module.exports = Backbone.Router.extend({
	routes: {
		'':    					'home',
		'home': 				'home',
		'login': 				'login',
		'signup': 				'signup',
		'imageFeed/:query': 	'imageFeed',
		'profile/:query': 		'profile'
	},

	home: function(){
		$('.page').hide();
		$('#home').show();
		$('#login').hide();
		$('#imagefeed').hide();
	},
	signup: function(){
		$('.page').hide();
		$('#signup').show();
		$('#signup-link').css('color','#005686');
		$('#login-link').css('color','#cccccc');
		$('.error').hide();
	

	},
	login: function(){
		$('.page').hide();
		$('#login').show();
		$('#signup-link').css('color','#cccccc');
		$('#login-link').css('color','#005686');
		$('.error').hide();

		
	},
	imageFeed: function(){
		$('.page').hide();
		$('#imagefeed').show();



	},
	profile: function(){

	}
});