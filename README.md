# page-reaction
A jQuery plugin to report user page interactions with web-ui using web-sockets

##[DEMO](https://rawgit.com/thatisuday/page-reaction/master/demo/index-raw.html)

### install
```
bower install page-reaction
```

### dependencies
```
<!-- required -->
<script src="./bower_components/jquery/dist/jquery.min.js"></script>
<script src="./bower_components/protonet/jquery.inview/jquery.inview.min.js"></script>
<script src="./bower_components/socket.io-client/dist/socket.io.min.js"></script>

<!-- plugin -->
<script src="./bower_components/page-reaction/dist/plugin.min.js"></script>
```

### use
```
var socket = io('http://127.0.0.1:3158');
var sessionId = 'abcd1234'; // you should get session id from cookie (or print from template engine)

$(document).ready(function(){
	$(selector).pageReact(options);
});
```

### options
```
{
	on : 'click',					// default 'click' event
	once : true,					// default is true,
	socket : socket, 				// a websocket connection (must provide)
	sessionId : sessionId, 			// user session id
	pickData : ['sku']				// default empty array ([]),
	callback : fn($elem, data){}	// default null function
}
```
- on => Interaction event with the element. Possible values `click` (element mouse click), `mouseenter` (when mouse is entered in the element), `inview` (when element is inside viewport), `ready` (when document is ready).
- once => Ping interaction only once to listening socket server.
- socket => A web socket connection (using socket.io).
- sessionId => User session id to send along with ping payload.
- pickData => Collect values from html data attributes to send along with ping payload.
- callback => Invoke a callback function after ping. 

#### Set options globally
You can setup above options globally like below.
```
$(document).pageReactConfig({
	socket : socket,
	sessionId : sessionId,
	pickData : ['productsku'],
	callback : function($elem, data){
		$elem.text(data.event);
	}
});
```

> Any options mentioned in `$(selector).pageReact(options);` fashion will override global options.


### Events
```
$(document).ready(function(){
	$('#box1').pageReact({
		on:'click',
		socket:socket,
		sessionId : sessionId,
		pickData:['sku', 'color'],
		callback : function($elem){
			$elem.css('color', 'yellow');
		}
	});
	
	$('#box2').pageReact({
		on:'mouseenter',
		socket:socket,
		sessionId : sessionId,
		pickData:['sku']
	});

	$('#box3').pageReact({
		on:'inview',
		socket:socket,
		sessionId : sessionId,
		pickData:['sku']
	});

	$('#box4').pageReact({
		on:'ready',
		socket:socket,
		sessionId : sessionId
	});
});
```

### Payload
This plugin will send payload with every single interaction which will look like below

```
// when document is ready
{
	event: 'ready',
	sessionId: 'RjvU1yeamoFB01kl',
	pickData: {}
}

// when user clicks on element
{
	event: 'click',
	sessionId: 'RjvU1yeamoFB01kl',
	pickData: {
		sku: 'abcd1234',
		color: 'red'
	}
}

// when user enters mouse cursor inside an element
{
	event: 'mouseenter',
	sessionId: 'RjvU1yeamoFB01kl',
	pickData: {
		sku: 'abcd5678'
	}
}

// when elements comes into view
{
	event: 'inview',
	sessionId: 'RjvU1yeamoFB01kl',
	pickData: {
		sku: 'abcd1357'
	}
}
```

