var $ = require('jquery');
var Backbone = require('backbone');
var validator = require('validator');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null,
		url: null,
		caption: null,
		createdAt: null,
		userID: null,
		likes: null
	},
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/mona-instagram-images',
	idAttribute: '_id',
	validate: function(attr){		
		
		if(validator.isNull(attr.url)){
			return 'Please enter an image url.'
		}
		else if(!validator.isURL(attr.url)){
			return 'Image is not a vaild url.'
		}
	}
})