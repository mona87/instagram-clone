var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null,
		message: null,
		imageID: null,
		userID: null
	},
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/mona-instagram-comments1',
	idAttribute: '_id'
})