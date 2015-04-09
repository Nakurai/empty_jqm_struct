/*
TODO:

INITIALIZATION OF THE APP. EXPECTING TO USE AN API AND AN LOCAL STORAGE:

use the storage plugin to see if the db already exists -> ok
	if not:
		create all the relevant tables: -> ok
	
use the connexion plug in -> ok
	if connexion -> ok:

MEMO:

$( document ).on("pageshow", "#myStopsPage", function() {
  dispMyStops();
});

$( document ).on( "swipeleft", "#myStopsPage", function() { 
	$.mobile.changePage('#busPage'); 
});

$( document ).on( "tap", "#cancelDialogButton", function() { 
	resetDialogPage();
});
*/


/*DEV -> test code in a desktop browser //*/

$(document).on("pagecreate","#indexPage",function(){

	// GET request parameters definition
	var param ={};
	param.name = 'userId';
	param.value = '1';


	// And now, we fetch all data from the contrefort server !
	var api = new Api();
	api.post({}).done(function(recipList){
		
		console.log(JSON.stringify(recipList));

	}).fail(function(error){
		console.log(error.message);
	});

});

//*/

/**
 * This is where everything happens. A kind of a controller in a MVC representation
 */
function App(){

	//this.init();
}


/**
 * initiate the application
 * @return {integer} always 0
 */
App.prototype.init = function(){
		
	this.bindEvents();

	return 0;
}

/**
 * bind all required event to the DOM (see MEMO to have examples)
 * @return {integer} always 0;
 */
App.prototype.bindEvents = function(){

	document.addEventListener("deviceready", this.onDeviceReady, false);

	return 0;
}

/**
 * when the mobile application is ready to go, fill all required attributes and set the environement for the user
 * @return {integer} always 0
 */
App.prototype.onDeviceReady = function(){
	
	/****************************************
	IF THIS IS THE FIRST EXECUTION:
	we have to create the database, its tables, and 
	insert a default line in the parameter table */
	var db = new Db();
	db.init().done(function(){
		var param = new Parameters();
		param.init().done(function(res){
		/* end of things to do for a first execution 
		********************************************/

			/****************************************
			NORMAL PREPARATION:
			now we are sure that the database is ready. The recipients in the relevant table 
			are updated from the contrefort server. Then, every action which has to be updated
			with the contrefort server must be saved
			*/

			/* end of things to do at normal startup
			********************************************/

			/****************************************
			DISPLAY THE FIRST PAGE OF APPLICATION
			*/
			var index = new IndexView();
			index.display();
		});
	});
	
	return 0;
}



// TODO:
App.prototype.onPause = function(){return 0;}

// TODO:
App.prototype.onResume = function(){return 0;}



