//All Connections and features available on the Main AppServer or across other applications should be available here

var MAIN_BROKER = null;

module.exports = {

	initialize: function() {
        
    },

    connect: async function(broker) {
        MAIN_BROKER = broker;
    }
}

//calling list_helpers -> gives the list of all available helpers
//const a = await _helper("_DB.db_query", "SHOW TABLES");
global._helper = async function(helperString, ...args) {
    if(!MAIN_BROKER) {
        throw new Error("MAIN BASE APP is not connected");
    }
    var payload = {
        "cmd": helperString,
        "params": args
    };
    console.info("CALLING_HELPER", helperString);
    const data = await MAIN_BROKER.call("system.helpers", payload, {
            timeout: 5000,
            retries: 0
        });
    if(data.status=="success") {
        return data.data;
    } else {
        console.error("ERROR CALLING HELPERS", data.message);
        return false;
    }
}

global._appcall = async function(cmdString, ...args) {
    if(!MAIN_BROKER) {
        throw new Error("MAIN BASE APP is not connected");
    }

    
}