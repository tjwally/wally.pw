ethTokenheader = 0;
function loadETHToken(ethTokenSymbol, ethTokenbalance, ethTokenaddress, thisETHaddress, callback) {
if (ethTokenheader === 0){
var $container = $("#keymanagerWallets");
$container.append("<div class=\"keymanKeyHeader\">Ethereum Tokens</div>"
+"<table class=\"keymanagerTable \">"
+ "<tr class=\"tableDesc\"><td class=\"pubkey\">PubKey</td><td class=\"coindesc\">Description</td><td class=\"coinbalance\">Balance</td><td class=\"delcoin\">Delete</td></tr>"
+ "<tbody class=\"keymanETHTokens\"></table>");
ethTokenheader++
}
if ( !$( "."+ethTokenSymbol+"card" ).length) {
var thisETHrate = "rate"+ethTokenSymbol;
var $container = $("#CoinOverView");
$container.append("<div class=\"card "+ethTokenSymbol+"card\">"
+"<div class=\"coinLogo\"><img src=\"images/logos/"+ethTokenSymbol+".png\"></div>"
+"<div class=\"coinWealth\" id=\""+ethTokenSymbol+"wealth\">0.00</div>"
+"<div class=\"coinAmount\" id=\""+ethTokenSymbol+"amount\">0.00</div>"
+"<div class=\"thiscoinprice\">1 "+ethTokenSymbol+" = "+eval(thisETHrate)+" "+fiatCurrency+"</div>"
+"</div>");
}
getETHTokenWalletsBalance(ethTokenSymbol, ethTokenbalance, thisETHaddress);
}



function getETHTokenWalletsBalance (callback) {
if (ethTokenSymbol == "EOS" || ethTokenSymbol == "ICN"){
ethTokenbalance = (ethTokenbalance/1000000000000000000);	
}
else{
ethTokenbalance = (ethTokenbalance/100000000);
}
var $container = $(".keymanETHTokens");
$container.append("<tr class=\"Tabl3TR\">"
+"<td class=\"\">"+ethTokenSymbol+"</td>"
+"<td class=\"\">Ethereum - "+thisETHaddress+"</td>"
+"<td class=\"balanceC0unter"+ethTokenSymbol+" "+ethTokenSymbol+"keybalance"+ethTokenbalance+"\">"+ethTokenbalance+"</td>"
+"<td class=\"deleteThisNot\" data-delcoin=\"NA\" data-delkey=\"\">N/A</td>"
+"</tr>");
balanceUpdaterETHToken(ethTokenbalance, ethTokenSymbol);
setTimeout(getCoinWealthETHToken(ethTokenbalance, ethTokenSymbol), 1000);
}

function getCoinWealthETHToken (callback) {
var thisETHrate = "rate"+ethTokenSymbol;
thisETHTOkenWealth = 0;	
thisETHTOkenWealthFIAT = 0;
$('.keymanETHTokens > .Tabl3TR').children('.balanceC0unter'+ethTokenSymbol+'').each(function () {
var thisETHtoken = $(this).text();
if (thisETHtoken > 0.001){thisETHTOkenWealth = parseFloat(thisETHTOkenWealth) + parseFloat($(this).text());}
thisETHTOkenWealthFIAT = (thisETHTOkenWealth*eval(thisETHrate)).toFixed(4);
$('.'+ethTokenSymbol+'card').attr('data-balance', thisETHTOkenWealthFIAT);
thisETHTOkenWealthFIAT = ('$' + parseFloat(thisETHTOkenWealthFIAT, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$("#"+ethTokenSymbol+"wealth").html(thisETHTOkenWealthFIAT + " " + fiatCurrency);
$("#"+ethTokenSymbol+"amount").html(thisETHTOkenWealth);
sortByBalance();
});
}	


function balanceUpdaterETHToken () {
var thisETHrate = "rate"+ethTokenSymbol;
thisCPbalance = (ethTokenbalance*eval(thisETHrate)).toFixed(4);
richness = parseFloat(richness) + parseFloat(thisCPbalance);
richnescalc = ('$' + parseFloat(richness, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('#richness').html(richnescalc + " " + fiatCurrency);	
}
