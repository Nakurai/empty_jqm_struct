function Tools(){
	

}




/***********
	This function gives the value of a GET parameter
	Return a string with the value
	Take the name of the GET parameter as parameter
	
	DEV FUNCTION, USELESS FOR THIS WHOLE APPLICATION, KEEPED AS A REMINDER
***********
Tools.prototype.urlParam = function(name){
	
	log(window.location.href);
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}
*/


/***********
	This function displays a message in the console. Used as a dev shortcut
***********/
Tools.prototype.log = function(message){
	if($.isArray(message)){
		console.dir(message);
	}
	else{
		console.log(message);
	}
}


Tools.prototype.test = function(message){
	$( "#test" ).append('<p> '+message+' </p>');
	$( "#test" ).trigger('refresh');

	console.log(message);
}