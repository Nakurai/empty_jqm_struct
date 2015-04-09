
function Network(){}

/**
 * check if a connection is currently available for the device. If so, sends back a promise with a string
 * precising the conneciton type: ethernet, wifi or data.
 * If not, reject the promise
 * @return {[type]} [description]
 */
Network.prototype.checkConnection = function() {

    var deferred = $.Deferred();
    var networkState = navigator.connection.type;
    
    var states = {};
    /*
    These are the sates listed in the cordova documentation:
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
	*/

	states[Connection.UNKNOWN]  = 'data';
    states[Connection.ETHERNET] = 'ethernet';
    states[Connection.WIFI]     = 'wifi';
    states[Connection.CELL_2G]  = 'data';
    states[Connection.CELL_3G]  = 'data';
    states[Connection.CELL_4G]  = 'data';
    states[Connection.CELL]     = 'data';
    states[Connection.NONE]     = 'off';

    var current = states[networkState];

    if(current == 'off'){
        deferred.reject();
    }
    else{
        deferred.resolve(current);
    }

    return deferred.promise();
    
};