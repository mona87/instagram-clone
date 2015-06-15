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


	var buildImgTemplate = _.template($('.img-template').html());
	var buildCommentTemplate = _.template($('.comment-template').html());
	var buildImgTemplate2 = _.template($('.user-images').html());

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
					// console.log('user is login is set to'+userExist.get('loggedIn'))

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
	function onImagesLoaded (ImageModel){
			 imageList.forEach(function(model){
			 	$('.images').append(buildImgTemplate({model: model}));
			 });
			 imageList.on('add', function(mod){
				$('.images').prepend(buildImgTemplate({model: mod.attributes}));
					console.log('[data-form="'+mod.attributes.attributes._id+'"]');
					console.log();
					addComments();


				});
			 	addComments();
			 	function addComments(){
				 	$('[data-form]').each(function(id){
							var imgID =$(this).attr('data-form');
							// console.log(typeof id);
							$('[data-form="'+ imgID +'"]').on('submit', function(e){
								 e.preventDefault();
								var url = window.location.href
								profileName = url.split("/").pop();
								var newComment = new CommentModel({
									message: '<span style="color:#005686">'+profileName+'</span>' +' '+ $(this).find('.comment-input').val(),
									imageID: imgID,
									userID: profileName
								});
								$('.comment-input').val('');
								newComment.save();
								commentList.add(newComment);
							})
					})
			 	}
			 	commentList.fetch();
			 	commentList.on('add', function(commentMod){
			 		html = buildCommentTemplate({model: commentMod});
			 		var imgID = commentMod.attributes.imageID;
			 		console.log('[data-form="' + imgID +'"]')
			 		$('[data-img="' + imgID +'"] .comment-list').append(html);
			 	})			 
			 	$('.img-header-username').on('click', function(e){
					e.preventDefault();				
					var string = $(e.target).text();
					$('.username-big').html(string);
					showUserImages(string)
				})
				$('.imagefeed-username').on('click', function(e){
					e.preventDefault();
					$('.username-big').html($(e.target).text());
					showUserImages($(e.target).text())
				});
				$('.imagefeed-logo').on('click', function(e){
					e.preventDefault();
					
					console.log('profile '+profileName)
					myRouter.navigate('imageFeed/'+$('.imagefeed-username').text(), {trigger:true});
				});
				function showUserImages(arg){
					var num = 0;
					$('.img-rows').html('');
					imageList.forEach(function(model){
							if(model.get('userID') === arg){
								num++;
								$('.num-post').html(num+ ' posts');
								$('.img-rows').append(buildImgTemplate2({model: model}))
							}		
						});
					num = 0;
					myRouter.navigate('profile/'+arg, {trigger:true});
				}
	}
	$('#image-input-form').on('submit', function(e){
				e.preventDefault();
				var url = window.location.href
				profileName = url.split("/").pop();

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
					imageToAdd.save();		
					imageList.add(imageToAdd);	
					$('.image-input').val('');
					$('.image-caption').val('')			
				}
				else{
					$('.error').show();
					$('.error').html(imageToAdd.validationError);
				}				
		});
	
	$('#home-login-btn').on('click', function(e){
		e.preventDefault();
		myRouter.navigate('login', {trigger:true});

	});
	$('.imagefeed-logout').on('click', function(e){
		e.preventDefault();
		myRouter.navigate('home', {trigger:true});
	});






});