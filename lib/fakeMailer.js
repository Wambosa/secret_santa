module.exports = {
	messages : function() {
		this.send = function(data, callback) {
			console.warn("DRY RUN MODE (because no domain+apiKey was provided)")
			console.log(JSON.stringify(data, null, " "))
			callback(null, {ok:true})
		}
	return this
	}
}