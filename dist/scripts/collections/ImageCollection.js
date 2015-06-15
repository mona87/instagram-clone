var $ = require('jquery');
var Backbone = require('Backbone');
Backbone.$ = $;
var ImageModel = require('../../scripts/models/ImageModel.js');

module.exports = Backbone.Collection.extend({
	model: ImageModel,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/mona-instagram-images'
})