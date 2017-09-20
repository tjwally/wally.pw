function getAnonCoins (callback) {
if (localStorage.getItem("anoncoins") === null) {
console.log("###NO anoncoins DATA###");
anoncoins = [];
console.log(anoncoins);
var twoadd = anoncoins.some(function(item, index) { twoadd = index; return item.coin == "NXT"; });
console.log("twoadd1 "+twoadd);
if (twoadd === false){anoncoins.push({coin:"NXT", name:"NXT", balance:"0"});}
var twoadd = anoncoins.some(function(item, index) { twoadd = index; return item.coin == "ARDR"; });
console.log("twoadd1 "+twoadd);
if (twoadd === false){anoncoins.push({coin:"ARDR", name:"Ardor", balance:"0"});}
var twoadd = anoncoins.some(function(item, index) { twoadd = index; return item.coin == "ZEC"; });
console.log("twoadd1 "+twoadd);
if (twoadd === false){anoncoins.push({coin:"ZEC", name:"ZCash", balance:"0"});}
var twoadd = anoncoins.some(function(item, index) { twoadd = index; return item.coin == "XMR"; });
console.log("twoadd1 "+twoadd);
if (twoadd === false){anoncoins.push({coin:"XMR", name:"Monero", balance:"0"});}
localStorage.setItem("anoncoins",  JSON.stringify(anoncoins));
} else {
anoncoins = JSON.parse(localStorage.getItem("anoncoins"));
var twoadd = anoncoins.some(function(item, index) { twoadd = index; return item.coin == "NXT"; });
console.log("twoadd "+twoadd);
if (twoadd === false){anoncoins.push({coin:"NXT", name:"NXT", balance:"0"});}
var twoadd = anoncoins.some(function(item, index) { twoadd = index; return item.coin == "ARDR"; });
console.log("twoadd "+twoadd);
if (twoadd === false){anoncoins.push({coin:"ARDR", name:"Ardor", balance:"0"});}
var twoadd = anoncoins.some(function(item, index) { twoadd = index; return item.coin == "ZEC"; });
console.log("twoadd "+twoadd);
if (twoadd === false){anoncoins.push({coin:"ZEC", name:"ZCash", balance:"0"});}
var twoadd = anoncoins.some(function(item, index) { twoadd = index; return item.coin == "XMR"; });
console.log("twoadd "+twoadd);
if (twoadd === false){anoncoins.push({coin:"XMR", name:"Monero", balance:"0"});}

}
setTimeout(buildAnonCoins, 500);
callback();
}

function buildAnonCoins (callback) {
var anC1 = 0;    
if (anoncoins.length > 0){
anonCoinBalancecrawler();
}
function anonCoinBalancecrawler() {
$container = $(".keymanan0nkeys");
$container.append("<tr class=\"Tabl3TR\">"
+"<td class=\"\">"+anoncoins[anC1].name+"</td>"
+"<td class=\"\">"+anoncoins[anC1].coin+"</td>"
+"<td class=\"balanceC0unter\"><input pattern=\"[0-9]+([\.,][0-9]+)?\" step=\"0.01\" type=\"number\" class=\"ancoinBalUpdater\" name=\"ancoinBalUpdater\" data-cname=\""+anoncoins[anC1].name+"\" data-coin=\""+anoncoins[anC1].coin+"\" value=\""+anoncoins[anC1].balance+"\"></td>"
+"</tr>");
//RefreshSomeEventListener();	
//var thisbalance = "";
//$(window).trigger("resize");
anC1++;        
if (anC1 < anoncoins.length) anonCoinBalancecrawler()

}

setTimeout(RefreshAnonListeners, 500);
//callback();
}

function RefreshAnonPrices() {
console.log("RefreshAnonPrices");
$('.ancoinBalUpdater').each(function () { 
var coin = $(this).attr("data-coin")
var cname = $(this).attr("data-cname")
var abalance = $(this).val();
var thisrate = "rate"+coin;
console.log("RefreshAnonPrices"+coin);
console.log("RefreshAnonPrices"+abalance);
if (abalance > 0){
thisCoinWealthFIAT = abalance;	
thisCoinWealthFIAT = parseFloat(thisCoinWealthFIAT);	
thisCoinWealthFIAT = (abalance*eval(thisrate)).toFixed(4);	

richness = parseFloat(richness) + parseFloat(thisCoinWealthFIAT);
console.log("RefreshAnonPrices"+thisCoinWealthFIAT);
richnescalc = ('$' + parseFloat(richness, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('#richness').html(richnescalc + " " + fiatCurrency);	


thisCoinWealthFIAT = ('$' + parseFloat(thisCoinWealthFIAT, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
var $container = $("#CoinOverView");
$container.append("<div class=\"card BTCcard\">"
+"<img src=\"images/logos/"+cname+".png\">"
+"<div class=\"coinWealth\" id=\""+coin+"wealth\">"+thisCoinWealthFIAT+" "+fiatCurrency+"</div>"
+"<div class=\"coinAmount\" id=\""+coin+"amount\">"+abalance+"</div>"
+"<div class=\"thiscoinprice\">1 "+cname+" ="+eval(thisrate)+" "+fiatCurrency+"</div>"
+"</div>");
} 	
})
};

function RefreshAnonListeners() {
console.log(anoncoins);
$("input[name=ancoinBalUpdater]").off(); 
$("input[name=ancoinBalUpdater]").on('change', function() {
var balance = $(this).val();
console.log("thisbal "+balance);
var thiscoin = $(this).attr("data-coin")
var name = $(this).attr("data-cname")
var index2del = arrayObjectIndexOf(anoncoins, thiscoin, "coin" ); 
anoncoins.splice(index2del, 1);
anoncoins.push({coin : thiscoin, name : name, balance : balance});
localStorage.setItem("anoncoins", JSON.stringify(anoncoins));
});
setTimeout(RefreshAnonPrices, 1000);
}