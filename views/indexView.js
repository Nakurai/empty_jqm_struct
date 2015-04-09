function IndexView(){}

IndexView.prototype.display = function(){
    $( "#test" ).append('<p>  index initialized </p>');
	$( "#test" ).trigger('refresh');
};