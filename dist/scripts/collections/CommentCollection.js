var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var CommentModel = require('../../scripts/models/CommentModel.js');

module.exports = Backbone.Collection.extend({
	model: CommentModel,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/mona-instagram-comments1'
})

