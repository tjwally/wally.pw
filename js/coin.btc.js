btcCoinWealth = 0;
function loadkeysBTC (callback) {
var $container = $("#keymanagerWallets");
$container.append("<div class=\"keymanKeyHeader theme_backgroundcolor3\">Bitcoin Keys</div>"
+"<table class=\"keymanagerTable \">"
+ "<tr class=\"tableDesc\"><td>PubKey</td><td>Description</td><td>Balance</td><td>Delete</td></tr>"
+ "<tbody class=\"keymanBTCkeys\"></table>");
var $container = $("#CoinOverView");
$container.append("<div class=\"card BTCcard\">"
+"<img src=\"images/logos/bitcoin.png\">"
+"<div class=\"coinWealth\" id=\"BTCwealth\">0.00</div>"
+"<div class=\"coinAmount\" id=\"BTCamount\">0.00</div>"
+"<div class=\"thiscoinprice\">1 Bitcoin = "+rateBTC+" "+fiatCurrency+"</div>"
+"</div>");
} 


function getWalletsBTC (callback) {
var i = 0;    
Balancecrawler();
function Balancecrawler() {
setTimeout(function(){
var $container = $(".keymanBTCkeys");
////console.log(BTCkeys[i].pubkey);
$container.append("<tr class=\"Tabl3TR BTCsetENT"+BTCkeys[i].pubkey+"\">"
+"<td class=\"\">"+BTCkeys[i].pubkey+"</td>"
+"<td class=\"\">"+BTCkeys[i].description+"</td>"
+"<td class=\"balanceC0unter BTCkeybalance"+BTCkeys[i].pubkey+"\"></td>"
+"<td class=\"deleteThis\" data-delcoin=\"BTC\" data-delkey=\""+BTCkeys[i].pubkey+"\">Delete</td>"
+"</tr>");
//RefreshSomeEventListener();	
//var thisbalance = "";
thisaddress = BTCkeys[i].pubkey;
getpubkeyBalanceBTC(thisaddress);
//$(window).trigger("resize");
i++;        
if (i < BTCkeys.length) Balancecrawler()
}, Math.floor(Math.random() * 1000) + 1000)
}
}


function getpubkeyBalanceBTC (btckeys, callback) {
	
jQuery.getJSON('https://counterpartychain.io/api/balances/'+btckeys,
function(counterpartyCheck) {	
for ( var member in counterpartyCheck.data) {
        if (counterpartyCheck.data[member].asset == "LTBCOIN") {	
		console.log(counterpartyCheck.data[member].asset);
		cptoken = counterpartyCheck.data[member].asset;
		cptokenbalance = counterpartyCheck.data[member].amount;
		console.log(cptoken+" "+cptokenbalance);
		loadwalletCounterParty(cptoken,cptokenbalance);
		}
		if (counterpartyCheck.data[member].asset == "FLDC") {	
		console.log(counterpartyCheck.data[member].asset);
		cptoken = counterpartyCheck.data[member].asset;
		cptokenbalance = counterpartyCheck.data[member].amount;
		console.log(cptoken+" "+cptokenbalance);
		loadwalletCounterParty(cptoken,cptokenbalance);
		}
		if (counterpartyCheck.data[member].asset == "PEPECASH") {	
		console.log(counterpartyCheck.data[member].asset);
		cptoken = counterpartyCheck.data[member].asset;
		cptokenbalance = counterpartyCheck.data[member].amount;
		console.log(cptoken+" "+cptokenbalance);
		loadwalletCounterParty(cptoken,cptokenbalance);
		}		
		
		
		
}
});
	
var addresscheck = "0";
jQuery.getJSON('http://btc.blockdozer.com/insight-api/addr/'+btckeys,
function(address) {
thisbalance = address['balance'];
thisBTCaddress = address['addrStr'];	
thisbalanceBTCSettings = thisbalance;
thisbalance = (thisbalance*rateBTC).toFixed(4);
richness = parseFloat(richness) + parseFloat(thisbalance);
thisbalance = ('$' + parseFloat(thisbalance, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
addresscheck = thisbalance;
balanceUpdaterBTC(thisBTCaddress, thisbalance, richness, thisbalanceBTCSettings);
});
}

function balanceUpdaterBTC () {
richnescalc = ('$' + parseFloat(richness, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('.wealthCounter').html(richnescalc + " " + fiatCurrency);
$('.BTCkeybalance' + thisBTCaddress).html(thisbalanceBTCSettings);
setTimeout(getBTCCoinWealth, 1000);
}


function getBTCCoinWealth () {
btcCoinWealth = 0;	
////console.log("getBTCCoinWealth");
/* get btc wealth*/
$('.keymanBTCkeys > .Tabl3TR').children('.balanceC0unter').each(function () {
var thisCoin = $(this).text();
////console.log(thisCoin);
if (thisCoin > 0.00001){btcCoinWealth = parseFloat(btcCoinWealth) + parseFloat($(this).text());}
});
btcCoinWealthFIAT = (btcCoinWealth*rateBTC).toFixed(4);
btcCoinWealthFIAT = ('$' + parseFloat(btcCoinWealthFIAT, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('#BTCwealth').html(btcCoinWealthFIAT + " " + fiatCurrency);
$('#BTCamount').html(btcCoinWealth);
////console.log("###btcCoinWealth BALANCE "+btcCoinWealth+"###");
/* get btc wealth*/
RefreshBTCListeners();
}


function RefreshBTCListeners() {
$(".keymanBTCkeys .Tabl3TR .deleteThis").off(); 
$(".keymanBTCkeys .Tabl3TR .deleteThis").on('click', function() {
//console.log("###DELETE KEY###");
var todeleteaddress = $(this).attr("data-delkey")
var index2del = arrayObjectIndexOf(BTCkeys, todeleteaddress, "pubkey" ); 

console.log("2del btc: "+index2del)
BTCkeys.splice(index2del, 1);
localStorage.setItem("BTCkeys", JSON.stringify(BTCkeys));
$( ".BTCsetENT"+todeleteaddress).remove();
});
}
