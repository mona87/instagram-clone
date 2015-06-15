var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
var validator = require('validator');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null,
		fullname: null,
		username: null,
		password: null,
		email: null,
		dateCreated: null,
		loggedIn: false,
		lastLoggedIn: null

	},
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/mona-users', 
	idAttribute: '_id',
	validate: function(attr){
		if(validator.isNull(attr.username)){
			return 'Your username or password was incorrect.'
		}
		else if(validator.isNull(attr.password)){
			return 'Your username or password was incorrect.'
		}
		else if(validator.isNull(attr.email)){
			return 'Please enter an email address.'
		}
		else if(!validator.isEmail(attr.email)){
			return 'Please enter an email address.'
		}
	}


});