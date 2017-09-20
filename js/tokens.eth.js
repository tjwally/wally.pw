/* STORJ  */
storjheader = 0;
function loadwalletSTORJ(storjaddress, storjbalance, callback) {
if (storjheader === 0){
var $container = $("#keymanagerWallets");
$container.append("<div class=\"keymanKeyHeader theme_backgroundcolor3\">STORJ Keys</div>"
+"<table class=\"keymanagerTable \">"
+ "<tr class=\"tableDesc\"><td>PubKey</td><td>Description</td><td>Balance</td><td>Delete</td></tr>"
+ "<tbody class=\"keymanSTORJkeys\"></table>");
var $container = $("#CoinOverView");
$container.append("<div class=\"card STORJcard\">"
+"<img src=\"images/logos/storj.png\">"
+"<div class=\"coinWealth\" id=\"STORJwealth\">0.00</div>"
+"<div class=\"coinAmount\" id=\"STORJamount\">0.00</div>"
+"<div class=\"thiscoinprice\">1 STORJ = "+rateSTORJ+" "+fiatCurrency+"</div>"
+"</div>");
storjheader++
}

getWalletsBalanceSTORJ(storjaddress, storjbalance);
}



function getWalletsBalanceSTORJ (callback) {
storjbalance = (storjbalance/100000000);
var $container = $(".keymanSTORJkeys");
$container.append("<tr class=\"Tabl3TR ETHsetENT"+storjaddress+"\">"
+"<td class=\"\">"+storjaddress+"</td>"
+"<td class=\"\">Imported from Ethereum</td>"
+"<td class=\"balanceC0unter STORJkeybalance"+storjaddress+"\">"+storjbalance+"</td>"
+"<td class=\"deleteThisNot\" data-delcoin=\"ETH\" data-delkey=\"\">N/A</td>"
+"</tr>");
balanceUpdaterSTORJ(storjbalance);
setTimeout(getCoinWealthSTORJ, 200);
}

function getCoinWealthSTORJ (callback) {
storjCoinWealth = 0;	
STORJCoinWealthFIAT = 0;
console.log(STORJCoinWealthFIAT);
$('.keymanSTORJkeys > .Tabl3TR').children('.balanceC0unter').each(function () {
var thisCoin = $(this).text();
////console.log(thisCoin);
if (thisCoin > 0.00001){storjCoinWealth = parseFloat(storjCoinWealth) + parseFloat($(this).text());}
STORJCoinWealthFIAT = (storjCoinWealth*rateSTORJ).toFixed(4);
STORJCoinWealthFIAT = ('$' + parseFloat(STORJCoinWealthFIAT, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('#STORJwealth').html(STORJCoinWealthFIAT + " " + fiatCurrency);
$('#STORJamount').html(storjCoinWealth);
////console.log("###ethCoinWealth BALANCE "+ethCoinWealth+"###");
/* get eth wealth*/
});
}	


function balanceUpdaterSTORJ () {
storjbalance = (storjbalance*rateSTORJ).toFixed(4);
richness = parseFloat(richness) + parseFloat(storjbalance);
richnescalc = ('$' + parseFloat(richness, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('#richness').html(richnescalc + " " + fiatCurrency);	
}

/* STORJ  */