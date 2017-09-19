ethCoinWealth = 0;
function loadkeysETH (callback) {
var $container = $("#keymanagerWallets");
$container.append("<div class=\"keymanKeyHeader theme_backgroundcolor3\">Ethereum Keys</div>"
+"<table class=\"keymanagerTable \">"
+ "<tr class=\"tableDesc\"><td>PubKey</td><td>Description</td><td>Balance</td><td>Delete</td></tr>"
+ "<tbody class=\"keymanETHkeys\"></table>");
var $container = $("#CoinOverView");
$container.append("<div class=\"card ETHcard\">"
+"<img src=\"images/logos/ethereum.png\">"
+"<div class=\"coinWealth\" id=\"ETHwealth\">0.00</div>"
+"<div class=\"coinAmount\" id=\"ETHamount\">0.00</div>"
+"<div class=\"thiscoinprice\">1 Ethereum = "+rateETH+" "+fiatCurrency+"</div>"
+"</div>");
} 


function getWalletsETH (callback) {
var ETHi = 0;    
Balancecrawler();
function Balancecrawler() {
setTimeout(function(){
var $container = $(".keymanETHkeys");
////console.log(ETHkeys[i].pubkey);
$container.append("<tr class=\"Tabl3TR ETHsetENT"+ETHkeys[ETHi].pubkey+"\">"
+"<td class=\"\">"+ETHkeys[ETHi].pubkey+"</td>"
+"<td class=\"\">"+ETHkeys[ETHi].description+"</td>"
+"<td class=\"balanceC0unter ETHkeybalance"+ETHkeys[ETHi].pubkey+"\"></td>"
+"<td class=\"deleteThis\" data-delcoin=\"ETH\" data-delkey=\""+ETHkeys[ETHi].pubkey+"\">Delete</td>"
+"</tr>");
//RefreshSomeEventListener();	
//var thisbalance = "";
console.log("ETH3: "+ETHkeys[ETHi].pubkey);
thisETHaddress = ETHkeys[ETHi].pubkey;
getpubkeyBalanceETH(thisETHaddress);
//$(window).trigger("resize");
ETHi++;        
if (ETHi < ETHkeys.length) Balancecrawler()
}, Math.floor(Math.random() * 1000) + 100)
}
}


function getpubkeyBalanceETH (thisETHaddress, callback) {
var addresscheck = "0";
jQuery.getJSON('https://api.ethplorer.io/getAddressInfo/'+thisETHaddress+'?apiKey=freekey',
function(address) {
for ( var member in address.tokens) {
        if (address.tokens[member].tokenInfo.symbol == "STORJ") {	
		console.log(address.tokens[member].tokenInfo.symbol);
		storjaddress = address.tokens[member].tokenInfo.address;
		storjbalance = address.tokens[member].balance;
		loadwalletSTORJ(storjaddress,storjbalance);
}
}		
//console.log("ETH1: "+address['ETH']['balance']);
thisbalance = address['ETH']['balance'];
//console.log("ETH2: "+thisbalance);
	
thisbalanceETHSettings = thisbalance;
thisbalance = (thisbalance*rateETH).toFixed(4);
richness = parseFloat(richness) + parseFloat(thisbalance);
thisbalance = ('$' + parseFloat(thisbalance, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
addresscheck = thisbalance;
balanceUpdaterETH(thisETHaddress, thisbalance, richness, thisbalanceETHSettings);
});
}

function balanceUpdaterETH () {
//console.log("ETH3: "+thisbalance);
//console.log("ETH3: "+thisbalanceETHSettings);
richnescalc = ('$' + parseFloat(richness, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('.wealthCounter').html(richnescalc + " " + fiatCurrency);
$('.ETHkeybalance' + thisETHaddress).html(thisbalanceETHSettings);
console.log("ETH3: "+thisETHaddress);
setTimeout(getETHCoinWealth, 1000);
}


function getETHCoinWealth () {
ethCoinWealth = 0;	
////console.log("getETHCoinWealth");
/* get eth wealth*/
$('.keymanETHkeys > .Tabl3TR').children('.balanceC0unter').each(function () {
var thisCoin = $(this).text();
////console.log(thisCoin);
if (thisCoin > 0.001){ethCoinWealth = parseFloat(ethCoinWealth) + parseFloat($(this).text());}
});
ethCoinWealthFIAT = (ethCoinWealth*rateETH).toFixed(4);
ethCoinWealthFIAT = ('$' + parseFloat(ethCoinWealthFIAT, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('#ETHwealth').html(ethCoinWealthFIAT + " " + fiatCurrency);
$('#ETHamount').html(ethCoinWealth);
////console.log("###ethCoinWealth BALANCE "+ethCoinWealth+"###");
/* get eth wealth*/
RefreshETHListeners();
}


function RefreshETHListeners() {
$(".keymanETHkeys .Tabl3TR .deleteThis").off(); 
$(".keymanETHkeys .Tabl3TR .deleteThis").on('click', function() {
//console.log("###DELETE KEY###");
var todeleteaddress = $(this).attr("data-delkey")
var index2del = ETHkeys.some(function(item, index) { index2del = index; return item.pubkey == todeleteaddress; });
if (!index2del) {
    return false;
}
ETHkeys.splice(index2del, 1);
localStorage.setItem("ETHkeys", JSON.stringify(ETHkeys));
$( ".ETHsetENT"+todeleteaddress).remove();
});
}
