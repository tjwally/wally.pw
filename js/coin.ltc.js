ltcCoinWealth = 0;
function loadkeysLTC (callback) {
var $container = $("#keymanagerWallets");
$container.append("<div class=\"keymanKeyHeader theme_backgroundcolor3\">Litecoin Keys</div>"
+"<table class=\"keymanagerTable \">"
+ "<tr class=\"tableDesc\"><td>PubKey</td><td>Description</td><td>Balance</td><td>Delete</td></tr>"
+ "<tbody class=\"keymanLTCkeys\"></table>");
var $container = $("#CoinOverView");
$container.append("<div class=\"card LTCcard\">"
+"<img src=\"images/logos/litecoin.png\">"
+"<div class=\"coinWealth\" id=\"LTCwealth\">0.00</div>"
+"<div class=\"coinAmount\" id=\"LTCamount\">0.00</div>"
+"<div class=\"thiscoinprice\">1 Litecoin = "+rateLTC+" "+fiatCurrency+"</div>"
+"</div>");
} 


function getWalletsLTC (callback) {
var ltci = 0;    
LTCBalancecrawler();
function LTCBalancecrawler() {
setTimeout(function(){
var $container = $(".keymanLTCkeys");
////console.log(LTCkeys[i].pubkey);
$container.append("<tr class=\"Tabl3TR LTCsetENT"+LTCkeys[ltci].pubkey+"\">"
+"<td class=\"\">"+LTCkeys[ltci].pubkey+"</td>"
+"<td class=\"\">"+LTCkeys[ltci].description+"</td>"
+"<td class=\"balanceC0unter LTCkeybalance"+LTCkeys[ltci].pubkey+"\"></td>"
+"<td class=\"deleteThis\" data-delcoin=\"LTC\" data-delkey=\""+LTCkeys[ltci].pubkey+"\">Delete</td>"
+"</tr>");
//RefreshSomeEventListener();	
//var thisbalance = "";
getpubkeyBalanceLTC(LTCkeys[ltci].pubkey);
//$(window).trigger("resize");
ltci++;        
if (ltci < LTCkeys.length) LTCBalancecrawler()
}, Math.floor(Math.random() * 1000) + 100)
}
}


function getpubkeyBalanceLTC (thisaddress, callback) {
var addresscheck = "0";
jQuery.getJSON('https://chain.so/api/v2/get_address_balance/LTC/'+thisaddress,
function(address) {
thisbalance = address['data']['confirmed_balance'];
thisLTCaddress = address['data']['address'];	
thisbalanceLTCSettings = thisbalance;
thisbalance = (thisbalance*rateLTC).toFixed(4);
richness = parseFloat(richness) + parseFloat(thisbalance);
thisbalance = ('$' + parseFloat(thisbalance, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
addresscheck = thisbalance;
balanceUpdaterLTC(thisLTCaddress, thisbalance, richness, thisbalanceLTCSettings);
});
}

function balanceUpdaterLTC () {
richnescalc = ('$' + parseFloat(richness, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('.wealthCounter').html(richnescalc + " " + fiatCurrency);
$('.LTCkeybalance' + thisLTCaddress).html(thisbalanceLTCSettings);
setTimeout(getLTCCoinWealth, 1000);
}


function getLTCCoinWealth () {
ltcCoinWealth = 0;	
////console.log("getLTCCoinWealth");
/* get ltc wealth*/
$('.keymanLTCkeys > .Tabl3TR').children('.balanceC0unter').each(function () {
var thisCoin = $(this).text();
////console.log(thisCoin);
if (thisCoin > 0.001){ltcCoinWealth = parseFloat(ltcCoinWealth) + parseFloat($(this).text());}
});
ltcCoinWealthFIAT = (ltcCoinWealth*rateLTC).toFixed(4);
ltcCoinWealthFIAT = ('$' + parseFloat(ltcCoinWealthFIAT, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('#LTCwealth').html(ltcCoinWealthFIAT + " " + fiatCurrency);
$('#LTCamount').html(ltcCoinWealth);
////console.log("###ltcCoinWealth BALANCE "+ltcCoinWealth+"###");
/* get ltc wealth*/
RefreshLTCListeners();
}


function RefreshLTCListeners() {
$(".keymanLTCkeys .Tabl3TR .deleteThis").off(); 
$(".keymanLTCkeys .Tabl3TR .deleteThis").on('click', function() {
//console.log("###DELETE KEY###");
var todeleteaddress = $(this).attr("data-delkey")
var index2del = LTCkeys.some(function(item, index) { index2del = index; return item.pubkey == todeleteaddress; });
if (!index2del) {
    return false;
}
LTCkeys.splice(index2del, 1);
localStorage.setItem("LTCkeys", JSON.stringify(LTCkeys));
$( ".LTCsetENT"+todeleteaddress).remove();
});
}
