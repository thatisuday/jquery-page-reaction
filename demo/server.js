const
	_ 				= 	require('lodash'),
	express 		= 	require('express'),
	bodyParser 		= 	require('body-parser')
;


/****************************************/


var app = express();
app.set('json spaces', 4);
app.use(bodyParser.json({limit: '50mb'}));

// set appropriate headers
app.use(function(req, res, next){
	res.set({
		'Access-Control-Allow-Origin' : '*',
		'Access-Control-Allow-Headers' : req.get("Access-Control-Request-Headers"),
		'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS'
	});
	
	next();
});


/****************************************/

app.use('/bower', express.static(__dirname + '/../bower_components'), (req, res) => {
	res.sendStatus(404);
});

app.use('/node_modules', express.static(__dirname + '/../node_modules'), (req, res) => {
	res.sendStatus(404);
});

app.use('/dist', express.static(__dirname + '/../dist'), (req, res) => {
	res.sendStatus(404);
});

/***************************/

// for all requests, send `index.html`
app.use('*', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});


/****************************************/

let port = 3000;
app.listen(port, () => {
	console.log(`demo is running on port ${port}`);
});
