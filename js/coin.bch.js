bchCoinWealth = 0;
function loadkeysBCH (callback) {
var $container = $("#keymanagerWallets");
$container.append("<div class=\"keymanKeyHeader theme_backgroundcolor3\">Bitcoin Cash Keys</div>"
+"<table class=\"keymanagerTable \">"
+ "<tr class=\"tableDesc\"><td>PubKey</td><td>Description</td><td>Balance</td><td>Delete</td></tr>"
+ "<tbody class=\"keymanBCHkeys\"></table>");
var $container = $("#CoinOverView");
$container.append("<div class=\"card BCHcard\">"
+"<img src=\"images/logos/bitcoincash.png\">"
+"<div class=\"coinWealth\" id=\"BCHwealth\">0.00</div>"
+"<div class=\"coinAmount\" id=\"BCHamount\">0.00</div>"
+"<div class=\"thiscoinprice\">1 Bitcoin Cash = "+rateBCH+" "+fiatCurrency+"</div>"
+"</div>");
} 


function getWalletsBCH (callback) {
var bchi = 0;    
BCHBalancecrawler();
function BCHBalancecrawler() {
setTimeout(function(){
var $container = $(".keymanBCHkeys");
////console.log(BCHkeys[i].pubkey);
$container.append("<tr class=\"Tabl3TR BCHsetENT"+BCHkeys[bchi].pubkey+"\">"
+"<td class=\"\">"+BCHkeys[bchi].pubkey+"</td>"
+"<td class=\"\">"+BCHkeys[bchi].description+"</td>"
+"<td class=\"balanceC0unter BCHkeybalance"+BCHkeys[bchi].pubkey+"\"></td>"
+"<td class=\"deleteThis\" data-delcoin=\"BCH\" data-delkey=\""+BCHkeys[bchi].pubkey+"\">Delete</td>"
+"</tr>");
//RefreshSomeEventListener();	
//var thisbalance = "";
getpubkeyBalanceBCH(BCHkeys[bchi].pubkey);
//$(window).trigger("resize");
bchi++;        
if (bchi < BCHkeys.length) BCHBalancecrawler()
}, Math.floor(Math.random() * 1000) + 100)
}
}


function getpubkeyBalanceBCH (thisaddress, callback) {
var addresscheck = "0";
jQuery.getJSON('http://bcc.blockdozer.com/insight-api/addr/'+thisaddress,
function(address) {
thisbalance = address['balance'];
thisBCHaddress = address['addrStr'];	
thisbalanceBCHSettings = thisbalance;
thisbalance = (thisbalance*rateBCH).toFixed(4);
richness = parseFloat(richness) + parseFloat(thisbalance);
thisbalance = ('$' + parseFloat(thisbalance, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
addresscheck = thisbalance;
balanceUpdaterBCH(thisBCHaddress, thisbalance, richness, thisbalanceBCHSettings);
});
}

function balanceUpdaterBCH () {
richnescalc = ('$' + parseFloat(richness, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('.wealthCounter').html(richnescalc + " " + fiatCurrency);
$('.BCHkeybalance' + thisBCHaddress).html(thisbalanceBCHSettings);
setTimeout(getBCHCoinWealth, 1000);
}


function getBCHCoinWealth () {
bchCoinWealth = 0;	
////console.log("getBCHCoinWealth");
/* get bch wealth*/
$('.keymanBCHkeys > .Tabl3TR').children('.balanceC0unter').each(function () {
var thisCoin = $(this).text();
////console.log(thisCoin);
if (thisCoin > 0.001){bchCoinWealth = parseFloat(bchCoinWealth) + parseFloat($(this).text());}
});
bchCoinWealthFIAT = (bchCoinWealth*rateBCH).toFixed(4);
bchCoinWealthFIAT = ('$' + parseFloat(bchCoinWealthFIAT, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('#BCHwealth').html(bchCoinWealthFIAT + " " + fiatCurrency);
$('#BCHamount').html(bchCoinWealth);
////console.log("###bchCoinWealth BALANCE "+bchCoinWealth+"###");
/* get bch wealth*/
RefreshBCHListeners();
}


function RefreshBCHListeners() {
$(".keymanBCHkeys .Tabl3TR .deleteThis").off(); 
$(".keymanBCHkeys .Tabl3TR .deleteThis").on('click', function() {
//console.log("###DELETE KEY###");
var todeleteaddress = $(this).attr("data-delkey")
var index2del = BCHkeys.some(function(item, index) { index2del = index; return item.pubkey == todeleteaddress; });
if (!index2del) {
    return false;
}
BCHkeys.splice(index2del, 1);
localStorage.setItem("BCHkeys", JSON.stringify(BCHkeys));
$( ".BCHsetENT"+todeleteaddress).remove();
});
}
