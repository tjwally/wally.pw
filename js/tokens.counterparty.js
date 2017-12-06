counterPartyheader = 0;
function loadwalletCounterParty(cptoken, cptokenbalance, thisBTCaddress, callback) {
if (counterPartyheader === 0){
var $container = $("#keymanagerWallets");
$container.append("<div class=\"keymanKeyHeader\">Counterparty Keys</div>"
+"<table class=\"keymanagerTable \">"
+ "<tr class=\"tableDesc\"><td class=\"pubkey\">PubKey</td><td class=\"coindesc\">Description</td><td class=\"coinbalance\">Balance</td><td class=\"delcoin\">Delete</td></tr>"
+ "<tbody class=\"keymanCounterPkeys\"></table>");
counterPartyheader++
}
if ( !$( "."+cptoken+"card" ).length) {
var thisCPrate = "rate"+cptoken;
var $container = $("#CoinOverView");
$container.append("<div class=\"card "+cptoken+"card\">"
+"<div class=\"coinLogo\"><img src=\"images/logos/"+cptoken+".png\"></div>"
+"<div class=\"coinWealth\" id=\""+cptoken+"wealth\">0.00</div>"
+"<div class=\"coinAmount\" id=\""+cptoken+"amount\">0.00</div>"
+"<div class=\"thiscoinprice\">1 "+cptoken+" = "+eval(thisCPrate)+" "+fiatCurrency+"</div>"
+"</div>");
}
getCounterPartyWalletsBalance(cptoken, cptokenbalance, thisBTCaddress);
}



function getCounterPartyWalletsBalance (callback) {
var $container = $(".keymanCounterPkeys");
$container.append("<tr class=\"Tabl3TR\">"
+"<td class=\"\">"+cptoken+"</td>"
+"<td class=\"\">BTC - "+thisBTCaddress+"</td>"
+"<td class=\"balanceC0unter"+cptoken+" "+cptoken+"keybalance"+cptokenbalance+"\">"+cptokenbalance+"</td>"
+"<td class=\"deleteThisNot\" data-delcoin=\"NA\" data-delkey=\"\">N/A</td>"
+"</tr>");
balanceUpdaterCounterParty(cptokenbalance, cptoken);
setTimeout(getCoinWealthCounterParty(cptokenbalance, cptoken), 1000);
}

function getCoinWealthCounterParty (callback) {
var thisCPrate = "rate"+cptoken;
thisCPCoinWealth = 0;	
thisCPCoinWealthFIAT = 0;
$('.keymanCounterPkeys > .Tabl3TR').children('.balanceC0unter'+cptoken+'').each(function () {
var thisCounterPartyCoin = $(this).text();
if (thisCounterPartyCoin > 0.001){thisCPCoinWealth = parseFloat(thisCPCoinWealth) + parseFloat($(this).text());}
thisCPCoinWealthFIAT = (thisCPCoinWealth*eval(thisCPrate)).toFixed(4);
$('.'+cptoken+'card').attr('data-balance', thisCPCoinWealthFIAT);
thisCPCoinWealthFIAT = ('$' + parseFloat(thisCPCoinWealthFIAT, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$("#"+cptoken+"wealth").html(thisCPCoinWealthFIAT + " " + fiatCurrency);
$("#"+cptoken+"amount").html(thisCPCoinWealth);
sortByBalance();
});
}	


function balanceUpdaterCounterParty () {
var thisCPrate = "rate"+cptoken;
thisCPbalance = (cptokenbalance*eval(thisCPrate)).toFixed(4);
richness = parseFloat(richness) + parseFloat(thisCPbalance);
richnescalc = ('$' + parseFloat(richness, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('.wealthCounter').html(richnescalc + " " + fiatCurrency);	
}
