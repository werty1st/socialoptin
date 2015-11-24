var storage = new CrossStorageClient('//www.zdf.de/ZDFxt/module/socialoptin/hub.html');

storage.onConnect().then(function() {
  return storage.get("social");

}).then(function(res) {
	if (res !== null){
		
		if(res){
			if (typeof socialoptin !== "undefined") socialoptin(true);
			document.dispatchEvent( new CustomEvent('socialoptin', { detail:{'socialoptin': true }}));
		} else {
			if (typeof socialoptin !== "undefined") socialoptin(false);
			document.dispatchEvent( new CustomEvent('socialoptin', { detail:{'socialoptin': false }}));
		}
	} else{
		if (typeof socialoptin !== "undefined") socialoptin(false);
		document.dispatchEvent( new CustomEvent('socialoptin', { detail:{'socialoptin': false }}));
	}

}).catch(function(err) {
  // Handle error
  if (typeof socialoptin !== "undefined") socialoptin(false);
  document.dispatchEvent( new CustomEvent('socialoptin', { detail:{'socialoptin': false }}));
});

