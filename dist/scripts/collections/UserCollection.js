var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $
var UserModel = ('../scripts/models/UserModel.js');

module.exports = Backbone.Collection.extend({
			Model: UserModel,
			url: 'http://tiny-pizza-server.herokuapp.com/collections/mona-users'
})