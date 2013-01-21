var SRC = 'http://www.youbike.com.tw/genxml.php';
var MARK = ['捷運市政府站-1', '捷運市政府站-2', '龍門廣場', '捷運科技大樓站', '臺大資訊大樓', '基隆長興路口', '捷運六張犁站', '捷運公館站(2號出口)'];
function showErr(jqxhr,st,er) {
	$('body').prepend('<p><div class=err>'+st+' '+er+'</div></p>');
}
function showHeader() {
	$('body').html('<ul id=list></ul>');
}
function showStation(name, addr, bike, empt, time) {
	var ls = $('<li></li>').appendTo($('#list'));
	var div = $('<div class=item></div>').appendTo(ls);
	var val = [name, addr, ''+bike+' 輛車 '+empt+' 空位', time];
	var cls = ['name', 'addr', 'val', 'time'];
	for(var i = 0; i < 4; ++i)
		div.append('<div class='+cls[i]+'>'+val[i]+'</div>');
}
function showMark(xml) {
	var ms = xml.find('marker');
	var n = ms.length;
	MARK.forEach(function(mark){
		for(var i = 0; i < n; ++i) {
			if(ms.eq(i).attr('name') == mark) {
				var x = ms.eq(i);
				showStation(x.attr('name'), x.attr('address'), x.attr('tot'), x.attr('sus'), x.attr('mday'));
				break;
			}
		}
	});
}
function loadXml() {
	showHeader();
	$.ajax({
		url: SRC, dataType: 'text',
		error: showErr,
		success: function(res) {
			showMark($(res));
		},
	});
}
$(function(){
	loadXml();
});
