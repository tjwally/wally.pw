SBTCCoinWealth = 0;

function loadkeysSBTC (callback) {
var $container = $("#keymanagerWallets");
$container.append("<div class=\"keymanKeyHeader\">Super Bitcoin Keys</div>"
+"<table class=\"keymanagerTable \">"
+ "<tr class=\"tableDesc\"><td class=\"pubkey\">PubKey</td><td class=\"coindesc\">Description</td><td class=\"coinbalance\">Balance</td><td class=\"delcoin\">Delete</td></tr>"
+ "<tbody class=\"keymanSBTCkeys\"></table>");
var $container = $("#CoinOverView");
$container.append("<div class=\"card SBTCcard\">"
+"<div class=\"coinLogo\"><img src=\"images/logos/superbitcoin.png\"></div>"
+"<div class=\"coinWealth\" id=\"SBTCwealth\">0.00</div>"
+"<div class=\"coinAmount\" id=\"SBTCamount\">0.00</div>"
+"<div class=\"thiscoinprice\">1 Super Bitcoin = "+rateSBTC+" "+fiatCurrency+"</div>"
+"</div>");
} 


function getWalletsSBTC (callback) {
var SBTCi = 0;    
SBTCBalancecrawler();
function SBTCBalancecrawler() {
setTimeout(function(){
var $container = $(".keymanSBTCkeys");
$container.append("<tr class=\"Tabl3TR SBTCsetENT"+SBTCkeys[SBTCi].pubkey+"\">"
+"<td class=\"\">"+SBTCkeys[SBTCi].pubkey+"</td>"
+"<td class=\"\">"+SBTCkeys[SBTCi].description+"</td>"
+"<td class=\"balanceC0unter SBTCkeybalance"+SBTCkeys[SBTCi].pubkey+"\"></td>"
+"<td class=\"deleteThis\" data-delcoin=\"SBTC\" data-delkey=\""+SBTCkeys[SBTCi].pubkey+"\">Delete</td>"
+"</tr>");
getpubkeyBalanceSBTC(SBTCkeys[SBTCi].pubkey);
SBTCi++;        
if (SBTCi < SBTCkeys.length) SBTCBalancecrawler()
}, Math.floor(Math.random() * 100) + SBTCtimeout)
}
}


function getpubkeyBalanceSBTC (thisaddress, callback) {
var addresscheck = "0";
$.ajax({
    url : 'http://block.superbtc.org/insight-api/addr/'+thisaddress,
	dataType: 'json',
    tryCount : 0,
    retryLimit : 3,
    success : function(address) {
thisSBTCbalance = address['balance'];
thisSBTCaddress = address['addrStr'];	
thisSBTCbalanceSBTCSettings = thisSBTCbalance;
thisSBTCbalance = (thisSBTCbalance*rateSBTC).toFixed(4);
richness = parseFloat(richness) + parseFloat(thisSBTCbalance);
thisSBTCbalance = ('$' + parseFloat(thisSBTCbalance, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
addresscheck = thisSBTCbalance;
balanceUpdaterSBTC(thisSBTCaddress, thisSBTCbalance, richness, thisSBTCbalanceSBTCSettings);
    },
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
            $.ajax(this);
            return;
            }            
            return;
        }
        if (xhr.status == 500) {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
            $.ajax(this);
            return;
            }            
            return;
        } else {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
            $.ajax(this);
            return;
            }            
            return;
        }
    }
});
}

function balanceUpdaterSBTC () {
richnescalc = ('$' + parseFloat(richness, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('.wealthCounter').html(richnescalc + " " + fiatCurrency);
$('.SBTCkeybalance' + thisSBTCaddress).html(thisSBTCbalanceSBTCSettings);
setTimeout(getSBTCCoinWealth, 1000);
}


function getSBTCCoinWealth () {
SBTCCoinWealth = 0;	
$('.keymanSBTCkeys > .Tabl3TR').children('.balanceC0unter').each(function () {
var thisCoin = $(this).text();
if (thisCoin > 0.00001){SBTCCoinWealth = parseFloat(SBTCCoinWealth) + parseFloat($(this).text());}
});
SBTCCoinWealthFIAT = (SBTCCoinWealth*rateSBTC).toFixed(4);
$('.SBTCcard').attr('data-balance', SBTCCoinWealthFIAT);
SBTCCoinWealthFIAT = ('$' + parseFloat(SBTCCoinWealthFIAT, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('#SBTCwealth').html(SBTCCoinWealthFIAT + " " + fiatCurrency);
$('#SBTCamount').html(SBTCCoinWealth);
RefreshSBTCListeners();
sortByBalance();
}


function RefreshSBTCListeners() {
$(".keymanSBTCkeys .Tabl3TR .deleteThis").off(); 
$(".keymanSBTCkeys .Tabl3TR .deleteThis").on('click', function() {
var todeleteaddress = $(this).attr("data-delkey")
var index2del = arrayObjectIndexOf(SBTCkeys, todeleteaddress, "pubkey" ); 

SBTCkeys.splice(index2del, 1);
localStorage.setItem("SBTCkeys", JSON.stringify(SBTCkeys));
$( ".SBTCsetENT"+todeleteaddress).remove();
});
}
