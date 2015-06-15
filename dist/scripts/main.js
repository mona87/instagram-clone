var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore')
Backbone.$ = $;
var UserModel = require('./models/UserModel.js')
var UserCollection = require('./collections/UserCollection.js')
var ImageModel = require('./models/ImageModel.js');
var ImageCollection = require('./collections/ImageCollection.js')
var CommentModel = require('./models/CommentModel.js')
var CommentCollection = require('./collections/CommentCollection.js')
var Router = require('./models/router.js');

$(document).ready(function(e){

	var myRouter = new Router();
	Backbone.history.start();

	var users = new UserCollection();
	var imageList = new ImageCollection();
	var commentList = new CommentCollection();
	userExist = false;
	imageExist = false;
	new Date();
	var url = window.location.href
	var	profileName = url.split("/").pop();
	console.log(profileName);

	var buildImgTemplate = _.template($('.img-template').html());
	
	users.fetch({ success: onUsersLoaded });
	function onUsersLoaded(UserCollection){

		//gets username refresh
		userExist = users.findWhere({
					username: profileName
				})
		if(userExist){

			// console.log('user exist');
			// console.log('user is login is set to'+userExist.get('loggedIn'))
			$('.imagefeed-username').html(profileName);
		}
		
		$('#login').on('submit', function(e){
			e.preventDefault();

			userExist = users.findWhere({
					username: $('#login-username').val(),
					password: $('#login-password').val()
				})
				if(userExist){
					$('.error').hide();
					$('.imagefeed-username').html($('#login-username').val());
					userExist.set({loggedIn: true, lastLoggedIn: Date.now()});
					console.log('user is login is set to'+userExist.get('loggedIn'))
					console.log(userExist)
					// userExist.save();
					var query =  $('#login-username').val();				
					myRouter.navigate('imageFeed/'+query, {trigger: true});
				}
				else{
					$('.error').show();
					$('.error').html('Your username / password combination is incorrect.');
				}			
		});

		$('#signup').on('submit', function(e){
			e.preventDefault();
			new Date();
			$('.error').hide();

			var newUser = new UserModel({
				fullname: $('#signup-fullname').val(),
				username: $('#signup-username').val(),
				password: $('#signup-password').val(),
				email: $('#signup-email').val(),
				dateCreated: Date.now(),
				lastLoggedIn: Date.now()
			});
			if(newUser.isValid()){
				$('.error').hide();
				newUser.save();
				var query =  $('#signup-username').val();
				myRouter.navigate('imageFeed/'+query, {trigger: true})
			}
			else{
				$('.error').show();
				$('.error').html(newUser.validationError);
			}
		});
	}

	imageList.fetch({ success: onImagesLoaded });
		$('#image-input-form').on('submit', function(e){
				e.preventDefault();
				
				var imageToAdd = new ImageModel({
					url: $('.image-input').val(),
					caption: $('.image-caption').val(),
					userID: profileName,
					createdAt: Date.now()
				});
				;
				if(imageToAdd.isValid()){
					$('.error').hide();	
					console.log('profilename '+profileName)
					console.log('url ' +imageToAdd.get('url'))		
					imageList.add(imageToAdd);
					// imageToAdd.save();
					$('.image-input').val('');
					$('.image-caption').val('')			
				}else{
					$('.error').show();
					$('.error').html(imageToAdd.validationError);
				}				
		});
	function onImagesLoaded (ImageModel){
			 imageList.forEach(function(model){
			 	$('.images').append(buildImgTemplate({model: model}));
			 });
			 imageList.on('add', function(mod){
			 	console.log(mod)
				$('.images').prepend(buildImgTemplate({model: mod.attributes}));
				console.log('url '+mod.get('url'));
				console.log('attr '+mod.attributes);
			});
	}
	

	$('#home-login-btn').on('click', function(e){
		e.preventDefault();
		myRouter.navigate('login', {trigger:true});

	});
	$('.imagefeed-logout').on('click', function(e){
		e.preventDefault();
		myRouter.navigate('home', {trigger:true});
	});





});