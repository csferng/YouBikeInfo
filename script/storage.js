var INIT_MARK = ['捷運市政府站-1', '捷運市政府站-2', '龍門廣場', '捷運科技大樓站', '臺大資訊大樓', '基隆長興路口', '捷運六張犁站', '捷運公館站(2號出口)'];
function storageInit() {
	chrome.storage.local.getBytesInUse('_initialized', function(size){
		if(size != 0) return;
		chrome.storage.local.set({'_initialized':1});
		INIT_MARK.forEach(function(mark){
			chrome.storage.local.set({mark:1});
		});
	});
}
function storageAdd(mark) {
	chrome.storage.local.set({mark:1});
}
function storageDel(mark) {
	chrome.storage.local.remove(mark);
}
function storageGet(callback) {
	chrome.storage.local.get(null, function(items){
		var keys = $.map(items,function(val,key){return key;});
		keys = $.grep(keys, function(k){return k[0] != '_';});
		callback(keys);
	});
}
