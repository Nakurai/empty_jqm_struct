
/**
 * this is an object which stores all user's parameter
 * db table is :parameters (last_updated_get, user_code, user_alias, nb_stones_bought, nb_stones_left)');
 */
function Parameters(){
	
	this.db = new Db();

	return 0;
}

Parameters.prototype.init = function(){

	var deferred = $.Deferred();

	// this declaration to be able to get the db instance in the goQuery."done" function
	var dbParent = this.db;

	// These functions are used to update the deferred status
	var success = function(res){
		deferred.resolve(res);
	}
	var fail = function(err){
		deferred.reject(err);
	}

	// fetch the data in the db
	var queryString = "select * from parameters;";
	this.db.goQuery(queryString).done(function(results){
		
		// if there is a row, then parameteres initialization is done. If not, we have to insert
		// the default line !
		if(results != null && results.rows.length > 0){	
			success(results);
		}
		else{
			var queryStringInsert = "insert into parameters ...;";
			
			dbParent.goQuery(queryStringInsert).done(function(results){
				success(results);

			}).fail(function(error){
					new Tools().test('error inserting default parameters line '+error.message);
					fail(error);

			});
		}

	}).fail(function(error){
		new Tools().test('error executing select query '+error.message);
		fail(error);

	});
	

	return deferred.promise();
}

/**
 * gives the last update date the application has downloaded from contrefort servers.
 * Indeed, only 50 recipients are get for each connection and therefore the most up to date recipient in contrefort
 * is possibbly not the most up to date in the user database.
 * @return {deferred's promise, an integer if there is data} the last update date dowloaded
 */
Parameters.prototype.getLastUpd = function(){
	
	var deferred = $.Deferred();

	var queryString = "select last_updated_get from parameters;";
	this.db.goQuery(queryString).done(function(results){
		
		if(results != null && results.rows.length > 0){	
			deferred.resolve(results.rows.item(0).last_updated_get);
		}
		else{
			deferred.reject('parameters init failed somehow !');
		}
		

	}).fail(function(error){
		new Tools().test('error while selecting last update '+error.message);
		deferred.reject('error while selecting last update '+error.message);

	});
 	
 	return deferred.promise();
}


/**
 * gives the user alias
 * @return {string} user's alias
 */
Parameters.prototype.getUserAlias = function(){
	if(this.user_alias == null){
		this.user_alias = 'inconnu';
	}
	return this.user_alias;
}


/**
 * update the last update date get from the recipient table
 * @param  {int} newDate "new last date" ?? so difficult to write doc for this function !!!
 * @return {promise's deferred}         the promise of deferred containing the db query result
 */
Parameters.prototype.updateLastDate = function(newDate){

	var deferred = $.Deferred();

	var queryString = "update parameters set last_updated_get = "+newDate+";";
	this.db.goQuery(queryString).done(function(results){

		deferred.resolve('update ok');

	}).fail(function(error){
		new Tools().test('error while updating last update '+error.message);
		deferred.reject('error while updating last update '+error.message);

	});

	return deferred;
}