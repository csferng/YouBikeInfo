var INIT_MARK = ['捷運市政府站-1', '捷運市政府站-2', '龍門廣場', '捷運科技大樓站', '臺大資訊大樓', '基隆長興路口', '捷運六張犁站', '捷運公館站(2號出口)'];
var STAR = [];
function storageInit() {
	chrome.storage.local.getBytesInUse('starred', function(size){
		if(size != 0) {
			chrome.storage.local.get('starred', function(item){
				STAR = item['starred'];
				prepare(STAR, null);
			});
		} else {
			chrome.storage.local.set({'starred':INIT_MARK});
			STAR = INIT_MARK;
			prepare(STAR, null);
		}
	});
}
function storageAdd(mark) {
	STAR.push(mark);
	chrome.storage.local.set({'starred':STAR});
	return STAR;
}
function storageDel(mark) {
	var t = 0;
	for(var i = 0; i < STAR.length; ++i) {
		if(STAR[i] == mark) ++t;
		else if(t > 0) STAR[i-t] = STAR[i];
	}
	for(; t > 0; --t) STAR.pop();
	chrome.storage.local.set({'starred':STAR});
	return STAR;
}
