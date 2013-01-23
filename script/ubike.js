var SRC = 'http://www.youbike.com.tw/genxml.php';
function showErr(jqxhr,st,er) {
	$('body').prepend('<p><div class=err>'+st+' '+er+'</div></p>');
}
function showHeader() {
	$('#starred').html();
	$('#all').html();
}
function showStation(lid, name, addr, bike, empt, time) {
	var ls = $('<li></li>').appendTo($('#'+lid));
	var div = $('<div class=item></div>').appendTo(ls);
	var val = [name, addr, ''+bike+' 輛車 '+empt+' 空位', time];
	var cls = ['name', 'addr', 'val', 'time'];
	for(var i = 0; i < 4; ++i)
		div.append('<div class='+cls[i]+'>'+val[i]+'</div>');
}
function showStarred(ms) {
	var n = ms.length;
	STAR.forEach(function(mark){
		for(var i = 0; i < n; ++i) {
			if(ms.eq(i).attr('name') == mark) {
				var x = ms.eq(i);
				showStation('starred', x.attr('name'), x.attr('address'), x.attr('tot'), x.attr('sus'), x.attr('mday'));
				break;
			}
		}
	});
}
function showAll(ms) {
	var n = ms.length;
	for(var i = 0, j = 0; i < n; ++i) {
		var x = ms.eq(i);
		for(j = 0; j < i; ++j)
			if(x.attr('name') == ms.eq(j).attr('name')) break;
		if(j == i) 
			showStation('all', x.attr('name'), x.attr('address'), x.attr('tot'), x.attr('sus'), x.attr('mday'));
	}
}
function loadXml() {
	$.ajax({
		url: SRC, dataType: 'text',
		error: showErr,
		success: function(res) {
			var ms = $(res).find('marker');
			showHeader();
			showStarred(ms);
			showAll(ms);
		},
	});
}
$(function(){
	storageInit();
	loadXml();
});
