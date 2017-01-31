'use strict';

(function($){

	// check if socket.io client library is loaded
	if(window.io == undefined || window.io == null){
		throw new Error('socket-io client library is missing!!! page-reaction will not work!');
		return;
	}

	/*****************************************************************/

	// get data from html data attributes
	var getPickData = function($elem, attrs){
		var data = {};

		attrs.forEach(function(attr){
			var value = $elem.data(attr);
			
			if(value){
				data[attr] = value;
			}
		});

		return data;
	}

	// emit interaction event to socket server
	var socketEmit = function(socket, data, callback){
		socket.emit('interaction', data);
		callback(data);
	}

	/*****************************************************************/

	// inject page-reaction plugin to jQuery
	$.fn.pageReact = function(options){

		// set options
		var options = $.extend({}, {
			on 			:  'click',
			once 		:  true,
			pickData 	: [],
		}, options);

		/*****************************************/

		// check if web-socket connection is injected
		if(options.socket == undefined || options.socket == null){
			throw new Error('socket connection is missing in options provided for event ' + options.on);
			return;
		}

		/*****************************************/

		// loop over all selector elements
		this.each(function(){
			
			// pick single element from selection
			var $this = $(this);

			/***************************/

			// Dispatch interaction event to socket server
			var dispatchEvent = function(event, callback){
				socketEmit(options.socket, {
					event 		: 	event,
					sessionId 	: 	options.sessionId,
					pickData 	: 	getPickData($this, options.pickData)
				}, callback);
			}

			// bind events to dom elements
			var bindDomEvents = function(event, callback){
				if(event == 'ready'){
					$(document).ready(function(){
						callback(event);
					});
				}
				else{
					if(options.once == true){
						$this.one(event, function(){
							callback(event);
						});
					}
					else{
						$this.on(event, function(){
							callback(event);
						});
					}
				}
			}

			/***************************/

			// when user clicks on an element
			if(options.on == 'click'){
				bindDomEvents('click', function(event){
					dispatchEvent(event, function(data){
						if(options.callback) options.callback($this, data);
					});
				});
			}
			// when user enter mouse inside element
			else if(options.on == 'mouseenter'){
				bindDomEvents('mouseenter', function(event){
					dispatchEvent(event, function(data){
						if(options.callback) options.callback($this, data);
					});
				});
			}
			// when element is in view
			else if(options.on == 'inview'){
				bindDomEvents('inview', function(event){
					dispatchEvent(event, function(data){
						if(options.callback) options.callback($this, data);
					});
				});
			}
			// when document is ready
			else if(options.on == 'ready'){
				bindDomEvents('ready', function(event){
					dispatchEvent(event, function(data){
						if(options.callback) options.callback($this, data);
					});
				});
			}
		});

		return this;
	}
})(jQuery);