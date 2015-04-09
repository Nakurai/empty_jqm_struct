function Api(){
	
	this.url =  'http://jsonplaceholder.typicode.com/posts';

	return 0;
}

/**
* params is a table with all param that must be concatenated with /
*/
Api.prototype.get = function(params){

	var deferred = $.Deferred();

	// These functions are used to update the deferred status
	var success = function(res){
		deferred.resolve(res);
	}
	var fail = function(err){
		deferred.reject(err);
	}
    
    var urlParam = this.url+params.join('/');
    $.get(urlParam, function(data, status){
        if(status==='success'){
            success(data);
        }
        else{
            new Tools().test('ajax fail '+status);
			fail(status);
        }
    });
    
	return deferred.promise();

};

/**
* params is a json object {param1:value1, param2:value2}...
*/
Api.prototype.post = function(params){

	var deferred = $.Deferred();

	// These functions are used to update the deferred status
	var success = function(res){
		deferred.resolve(res);
	}
	var fail = function(err){
		deferred.reject(err);
	}
    
    $.post(this.url, params, function(data, status){
        if(status==='success'){
            success(data);
        }
        else{
            new Tools().test('ajax fail '+status);
			fail(status);
        }
    });
    
	return deferred.promise();

};