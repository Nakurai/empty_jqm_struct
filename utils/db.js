
/**
 * This object manage the application database
 */
function Db(){
	this.name = "";
	this.version = "1.0";
	this.description = "";
	this.size = 5 * 1024 * 1024;

	return 0;
}


/**
 * initialize the db and fill the instance attribute
 * @return {integer} always 0
 */
Db.prototype.init = function(){

	var deferred = $.Deferred();

	deferred.resolve(this.createTables());

	return deferred.promise();
}


/**
 * Create a db instance or simply open it
 * @return {jquery promise} the deffered's promise
 */
Db.prototype.openDb = function(){
	
	var deferred = $.Deferred();
	deferred.resolve(openDatabase(this.name, this.version, this.description, this.size));

	return deferred.promise();
}


/**
 * Create all application's required tables in the database
 * @return {integer} always 0
 */
Db.prototype.createTables = function(){

	this.openDb().done(function(dbInstance){

		dbInstance.transaction(function (tx) {  
	   		//tx.executeSql("CREATE TABLE IF NOT EXISTS ...");
		}, function(error){
			new Tools().test('error during creation tables '+error.message);
		});

	}).fail(function(error){
		new Tools().test('error while opening db '+error.message);
	});
	

	return 0;
}

/**
 * executes a query upon the database and sends back a promise about the query result execution
 * @param  {string} queryString the query to execute
 * @return {deferred.promise}             the deferred promise
 */
Db.prototype.goQuery = function(queryString){

//new Tools().test('query '+queryString);

	var deferred = $.Deferred();

	var success = function(tx, results){
		deferred.resolve(results);
	}

	var fail = function(tx, error){
		deferred.reject(error);
	}

	this.openDb().done(function(dbInstance){

		dbInstance.transaction(function (tx) {
			tx.executeSql(queryString, [], success, fail);
		});

	}).fail(function(){
		new Tools().test('error while opening db');
	});

	return deferred.promise();
}


//*/

