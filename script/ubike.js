var SRC_RT = 'http://www.youbike.com.tw/genxml.php';
var SRC = 'http://www.youbike.com.tw/genxml.php';
var INFO = [];
var DEBUG = {};
function isDefined(x) { return typeof x !== 'undefined'; }
function showErr(jqxhr,st,er) {
	console.log(jqxhr, st, er);
	$('body').prepend('<p><div class=err>'+st+' '+er+'</div></p>');
}
function showStation(lid, name, addr, bike, empt, time, butn) {
	var ls = $('<li></li>').appendTo($('#'+lid));
	var div = $('<div class=item></div>').appendTo(ls);
	var val = [name, addr, ''+bike+' 輛車 '+empt+' 空位', time];
	var cls = ['name', 'addr', 'val', 'time'];
	for(var i = 0; i < 4; ++i)
		div.append('<div class='+cls[i]+'>'+val[i]+'</div>');
	div.append('<div class=star>'+butn+'</div>');
}
function showStarred(star,ms) {
	$('#starred').html('');
	var n = ms.length;
	star.forEach(function(mark){
		for(var i = 0; i < n; ++i) {
			if(ms.eq(i).attr('name') == mark) {
				var x = ms.eq(i);
				showStation('starred', x.attr('name'), x.attr('address'), x.attr('tot'), x.attr('sus'), x.attr('mday'), '★');
				break;
			}
		}
	});
	var items = $('#starred').find('div.item');
	items.hover(function(ev){
		$(this).toggleClass('hover');
	});
	items.find('div.star').click(function(ev){
		var star = storageDel($(this.parentNode).find('.name').text());
		prepare(star, null);
	});
}
function showOther(star, ms) {
	$('#all').html('');
	var n = ms.length;
	for(var i = 0, j = 0, k = 0; i < n; ++i) {
		var x = ms.eq(i);
		for(j = 0; j < i; ++j)
			if(x.attr('name') == ms.eq(j).attr('name')) break;
		for(k = 0; k < star.length; ++k)
			if(x.attr('name') == star[k]) break;
		if(j == i && k == star.length) 
			showStation('all', x.attr('name'), x.attr('address'), x.attr('tot'), x.attr('sus'), x.attr('mday'), '☆');
	}
	var items = $('#all').find('div.item');
	items.hover(function(ev){
		$(this).toggleClass('hover');
	});
	items.find('div.star').click(function(ev){
		var star = storageAdd($(this.parentNode).find('.name').text());
		prepare(star, null);
	});
}
function prepare(star, ms) {
	if(isDefined(star) && star !== null) this.star = star;
	if(isDefined(ms) && ms !== null) this.ms = ms;
	if(isDefined(this.star) && isDefined(this.ms)) {
		showStarred(this.star, this.ms);
		showOther(this.star, this.ms);
	}
}
function loadXml(src) {
	$.ajax({
		url: src, dataType: 'text',
		error: showErr,
		success: function(res) {
			INFO = $(res).find('marker');
			prepare(null, INFO);
		},
	});
}
$(function(){
	storageInit();
	loadXml(SRC);
	$('#refresh').click(function(ev){loadXml(SRC_RT);});
});
