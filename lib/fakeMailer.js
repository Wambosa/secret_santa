module.exports = {
  messages : function() {
    this.send = (data, callback) => {
      console.log(JSON.stringify(data, null, " "))
      callback(null, {ok:true})
    }
  return this
  }
}