ethCoinWealth = 0;
function loadkeysETH (callback) {
var $container = $("#keymanagerWallets");
$container.append("<div class=\"keymanKeyHeader\">Ethereum Keys</div>"
+"<table class=\"keymanagerTable \">"
+ "<tr class=\"tableDesc\"><td class=\"pubkey\">PubKey</td><td class=\"coindesc\">Description</td><td class=\"coinbalance\">Balance</td><td class=\"delcoin\">Delete</td></tr>"
+ "<tbody class=\"keymanETHkeys\"></table>");
var $container = $("#CoinOverView");
$container.append("<div class=\"card ETHcard\">"
+"<div class=\"coinLogo\"><img src=\"images/logos/ethereum.png\"></div>"
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
$container.append("<tr class=\"Tabl3TR ETHsetENT"+ETHkeys[ETHi].pubkey+"\">"
+"<td class=\"\">"+ETHkeys[ETHi].pubkey+"</td>"
+"<td class=\"\">"+ETHkeys[ETHi].description+"</td>"
+"<td class=\"balanceC0unter ETHkeybalance"+ETHkeys[ETHi].pubkey+"\"></td>"
+"<td class=\"deleteThis\" data-delcoin=\"ETH\" data-delkey=\""+ETHkeys[ETHi].pubkey+"\">Delete</td>"
+"</tr>");
//RefreshSomeEventListener();	
//var thisbalance = "";
thisETHaddress = ETHkeys[ETHi].pubkey;
getpubkeyBalanceETH(thisETHaddress);
//$(window).trigger("resize");
ETHi++;        
if (ETHi < ETHkeys.length) Balancecrawler()
}, Math.floor(Math.random() * 1000) + 1000)
}
}


function getpubkeyBalanceETH (thisETHaddress, callback) {
var addresscheck = "0";
jQuery.getJSON('https://api.ethplorer.io/getAddressInfo/'+thisETHaddress+'?apiKey=freekey',
function(address) {
for ( var member in address.tokens) {
        if (address.tokens[member].tokenInfo.symbol == "STORJ") {	
		ethTokenaddress = address.tokens[member].tokenInfo.address;
		ethTokenbalance = address.tokens[member].balance;
		ethTokenSymbol = address.tokens[member].tokenInfo.symbol;
		loadETHToken(ethTokenSymbol,ethTokenbalance,ethTokenaddress,thisETHaddress);}
        if (address.tokens[member].tokenInfo.symbol == "EOS") {	
		ethTokenaddress = address.tokens[member].tokenInfo.address;
		ethTokenbalance = address.tokens[member].balance;
		ethTokenSymbol = address.tokens[member].tokenInfo.symbol;
		loadETHToken(ethTokenSymbol,ethTokenbalance,ethTokenaddress,thisETHaddress);}
        if (address.tokens[member].tokenInfo.symbol == "ICN") {	
		ethTokenaddress = address.tokens[member].tokenInfo.address;
		ethTokenbalance = address.tokens[member].balance;
		ethTokenSymbol = address.tokens[member].tokenInfo.symbol;
		loadETHToken(ethTokenSymbol,ethTokenbalance,ethTokenaddress,thisETHaddress);}
        if (address.tokens[member].tokenInfo.symbol == "MLN") {	
		ethTokenaddress = address.tokens[member].tokenInfo.address;
		ethTokenbalance = address.tokens[member].balance;
		ethTokenSymbol = address.tokens[member].tokenInfo.symbol;
		loadETHToken(ethTokenSymbol,ethTokenbalance,ethTokenaddress,thisETHaddress);}
        if (address.tokens[member].tokenInfo.symbol == "GNO") {	
		ethTokenaddress = address.tokens[member].tokenInfo.address;
		ethTokenbalance = address.tokens[member].balance;
		ethTokenSymbol = address.tokens[member].tokenInfo.symbol;
		loadETHToken(ethTokenSymbol,ethTokenbalance,ethTokenaddress,thisETHaddress);}
}		
thisbalance = address['ETH']['balance'];
	
thisbalanceETHSettings = thisbalance;
thisbalance = (thisbalance*rateETH).toFixed(4);
richness = parseFloat(richness) + parseFloat(thisbalance);
thisbalance = ('$' + parseFloat(thisbalance, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
addresscheck = thisbalance;
balanceUpdaterETH(thisETHaddress, thisbalance, richness, thisbalanceETHSettings);
});
}

function balanceUpdaterETH () {
richnescalc = ('$' + parseFloat(richness, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('.wealthCounter').html(richnescalc + " " + fiatCurrency);
$('.ETHkeybalance' + thisETHaddress).html(thisbalanceETHSettings);
setTimeout(getETHCoinWealth, 1000);
}


function getETHCoinWealth () {
ethCoinWealth = 0;	
$('.keymanETHkeys > .Tabl3TR').children('.balanceC0unter').each(function () {
var thisCoin = $(this).text();
if (thisCoin > 0.00001){ethCoinWealth = parseFloat(ethCoinWealth) + parseFloat($(this).text());}
});
ethCoinWealthFIAT = (ethCoinWealth*rateETH).toFixed(4);
$('.ETHcard').attr('data-balance', ethCoinWealthFIAT);
ethCoinWealthFIAT = ('$' + parseFloat(ethCoinWealthFIAT, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('#ETHwealth').html(ethCoinWealthFIAT + " " + fiatCurrency);
$('#ETHamount').html(ethCoinWealth);
RefreshETHListeners();
sortByBalance();
}


function RefreshETHListeners() {
$(".keymanETHkeys .Tabl3TR .deleteThis").off(); 
$(".keymanETHkeys .Tabl3TR .deleteThis").on('click', function() {
var todeleteaddress = $(this).attr("data-delkey")
var index2del = arrayObjectIndexOf(ETHkeys, todeleteaddress, "pubkey" ); 

ETHkeys.splice(index2del, 1);
localStorage.setItem("ETHkeys", JSON.stringify(ETHkeys));
$( ".ETHsetENT"+todeleteaddress).remove();
});
}
