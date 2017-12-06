btgCoinWealth = 0;
function loadkeysBTG (callback) {
var $container = $("#keymanagerWallets");
$container.append("<div class=\"keymanKeyHeader\">Bitcoin Gold Keys</div>"
+"<table class=\"keymanagerTable \">"
+ "<tr class=\"tableDesc\"><td class=\"pubkey\">PubKey</td><td class=\"coindesc\">Description</td><td class=\"coinbalance\">Balance</td><td class=\"delcoin\">Delete</td></tr>"
+ "<tbody class=\"keymanBTGkeys\"></table>");
var $container = $("#CoinOverView");
$container.append("<div class=\"card BTGcard\">"
+"<div class=\"coinLogo\"><img src=\"images/logos/bitcoingold.png\"></div>"
+"<div class=\"coinWealth\" id=\"BTGwealth\">0.00</div>"
+"<div class=\"coinAmount\" id=\"BTGamount\">0.00</div>"
+"<div class=\"thiscoinprice\">1 Bitcoin Gold = "+rateBTG+" "+fiatCurrency+"</div>"
+"</div>");
} 


function getWalletsBTG (callback) {
var btgi = 0;    
BTGBalancecrawler();
function BTGBalancecrawler() {
setTimeout(function(){
var $container = $(".keymanBTGkeys");
$container.append("<tr class=\"Tabl3TR BTGsetENT"+BTGkeys[btgi].pubkey+"\">"
+"<td class=\"\">"+BTGkeys[btgi].pubkey+"</td>"
+"<td class=\"\">"+BTGkeys[btgi].description+"</td>"
+"<td class=\"balanceC0unter BTGkeybalance"+BTGkeys[btgi].pubkey+"\"></td>"
+"<td class=\"deleteThis\" data-delcoin=\"BTG\" data-delkey=\""+BTGkeys[btgi].pubkey+"\">Delete</td>"
+"</tr>");
getpubkeyBalanceBTG(BTGkeys[btgi].pubkey);
btgi++;        
if (btgi < BTGkeys.length) BTGBalancecrawler()
}, Math.floor(Math.random() * 1000) + 1000)
}
}


function getpubkeyBalanceBTG (thisaddress, callback) {
var addresscheck = "0";
jQuery.getJSON('https://btgexplorer.com/api/addr/'+thisaddress,
function(address) {
thisBTGbalance = address['balance'];
thisBTGaddress = address['addrStr'];	
thisBTGbalanceBTGSettings = thisBTGbalance;
thisBTGbalance = (thisBTGbalance*rateBTG).toFixed(4);
richness = parseFloat(richness) + parseFloat(thisBTGbalance);
thisBTGbalance = ('$' + parseFloat(thisBTGbalance, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
addresscheck = thisBTGbalance;
balanceUpdaterBTG(thisBTGaddress, thisBTGbalance, richness, thisBTGbalanceBTGSettings);
});
}

function balanceUpdaterBTG () {
richnescalc = ('$' + parseFloat(richness, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('.wealthCounter').html(richnescalc + " " + fiatCurrency);
$('.BTGkeybalance' + thisBTGaddress).html(thisBTGbalanceBTGSettings);
setTimeout(getBTGCoinWealth, 1000);
}


function getBTGCoinWealth () {
btgCoinWealth = 0;	
$('.keymanBTGkeys > .Tabl3TR').children('.balanceC0unter').each(function () {
var thisCoin = $(this).text();
if (thisCoin > 0.00001){btgCoinWealth = parseFloat(btgCoinWealth) + parseFloat($(this).text());}
});
btgCoinWealthFIAT = (btgCoinWealth*rateBTG).toFixed(4);
$('.BTGcard').attr('data-balance', btgCoinWealthFIAT);
btgCoinWealthFIAT = ('$' + parseFloat(btgCoinWealthFIAT, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('#BTGwealth').html(btgCoinWealthFIAT + " " + fiatCurrency);
$('#BTGamount').html(btgCoinWealth);
RefreshBTGListeners();
sortByBalance();
}


function RefreshBTGListeners() {
$(".keymanBTGkeys .Tabl3TR .deleteThis").off(); 
$(".keymanBTGkeys .Tabl3TR .deleteThis").on('click', function() {
var todeleteaddress = $(this).attr("data-delkey")
var index2del = arrayObjectIndexOf(BTGkeys, todeleteaddress, "pubkey" ); 

BTGkeys.splice(index2del, 1);
localStorage.setItem("BTGkeys", JSON.stringify(BTGkeys));
$( ".BTGsetENT"+todeleteaddress).remove();
});
}
