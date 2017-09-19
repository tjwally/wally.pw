dogeCoinWealth = 0;
function loadkeysDOGE (callback) {
var $container = $("#keymanagerWallets");
$container.append("<div class=\"keymanKeyHeader theme_backgroundcolor3\">Doge Keys</div>"
+"<table class=\"keymanagerTable \">"
+ "<tr class=\"tableDesc\"><td>PubKey</td><td>Description</td><td>Balance</td><td>Delete</td></tr>"
+ "<tbody class=\"keymanDOGEkeys\"></table>");
var $container = $("#CoinOverView");
$container.append("<div class=\"card DOGEcard\">"
+"<img src=\"images/logos/doge.png\">"
+"<div class=\"coinWealth\" id=\"DOGEwealth\">0.00</div>"
+"<div class=\"coinAmount\" id=\"DOGEamount\">0.00</div>"
+"<div class=\"thiscoinprice\">1 Dogecoin = "+rateDOGE+" "+fiatCurrency+"</div>"
+"</div>");
} 


function getWalletsDOGE (callback) {
var dogei = 0;    
DOGEBalancecrawler();
function DOGEBalancecrawler() {
setTimeout(function(){
var $container = $(".keymanDOGEkeys");
////console.log(DOGEkeys[i].pubkey);
$container.append("<tr class=\"Tabl3TR DOGEsetENT"+DOGEkeys[dogei].pubkey+"\">"
+"<td class=\"\">"+DOGEkeys[dogei].pubkey+"</td>"
+"<td class=\"\">"+DOGEkeys[dogei].description+"</td>"
+"<td class=\"balanceC0unter DOGEkeybalance"+DOGEkeys[dogei].pubkey+"\"></td>"
+"<td class=\"deleteThis\" data-delcoin=\"DOGE\" data-delkey=\""+DOGEkeys[dogei].pubkey+"\">Delete</td>"
+"</tr>");
//RefreshSomeEventListener();	
//var thisbalance = "";
getpubkeyBalanceDOGE(DOGEkeys[dogei].pubkey);
//$(window).trigger("resize");
dogei++;        
if (dogei < DOGEkeys.length) DOGEBalancecrawler()
}, Math.floor(Math.random() * 1000) + 100)
}
}


function getpubkeyBalanceDOGE (thisaddress, callback) {
var addresscheck = "0";
jQuery.getJSON('https://chain.so/api/v2/get_address_balance/DOGE/'+thisaddress,
function(address) {
thisbalance = address['data']['confirmed_balance'];
thisDOGEaddress = address['data']['address'];	
thisbalanceDOGESettings = thisbalance;
thisbalance = (thisbalance*rateDOGE).toFixed(4);
richness = parseFloat(richness) + parseFloat(thisbalance);
thisbalance = ('$' + parseFloat(thisbalance, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
addresscheck = thisbalance;
balanceUpdaterDOGE(thisDOGEaddress, thisbalance, richness, thisbalanceDOGESettings);
});
}

function balanceUpdaterDOGE () {
richnescalc = ('$' + parseFloat(richness, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('.wealthCounter').html(richnescalc + " " + fiatCurrency);
$('.DOGEkeybalance' + thisDOGEaddress).html(thisbalanceDOGESettings);
setTimeout(getDOGECoinWealth, 1000);
}


function getDOGECoinWealth () {
dogeCoinWealth = 0;	
////console.log("getDOGECoinWealth");
/* get doge wealth*/
$('.keymanDOGEkeys > .Tabl3TR').children('.balanceC0unter').each(function () {
var thisCoin = $(this).text();
////console.log(thisCoin);
if (thisCoin > 0.001){dogeCoinWealth = parseFloat(dogeCoinWealth) + parseFloat($(this).text());}
});
dogeCoinWealthFIAT = (dogeCoinWealth*rateDOGE).toFixed(4);
dogeCoinWealthFIAT = ('$' + parseFloat(dogeCoinWealthFIAT, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('#DOGEwealth').html(dogeCoinWealthFIAT + " " + fiatCurrency);
$('#DOGEamount').html(dogeCoinWealth);
////console.log("###dogeCoinWealth BALANCE "+dogeCoinWealth+"###");
/* get doge wealth*/
RefreshDOGEListeners();
}


function RefreshDOGEListeners() {
$(".keymanDOGEkeys .Tabl3TR .deleteThis").off(); 
$(".keymanDOGEkeys .Tabl3TR .deleteThis").on('click', function() {
//console.log("###DELETE KEY###");
var todeleteaddress = $(this).attr("data-delkey")
var index2del = DOGEkeys.some(function(item, index) { index2del = index; return item.pubkey == todeleteaddress; });
if (!index2del) {
    return false;
}
DOGEkeys.splice(index2del, 1);
localStorage.setItem("DOGEkeys", JSON.stringify(DOGEkeys));
$( ".DOGEsetENT"+todeleteaddress).remove();
});
}
