btcCoinWealth = 0;
function loadkeysBTC (callback) {
var $container = $("#keymanagerWallets");
$container.append("<div class=\"keymanKeyHeader\">Bitcoin Keys</div>"
+"<table class=\"keymanagerTable \">"
+ "<tr class=\"tableDesc\"><td class=\"pubkey\">PubKey</td><td class=\"coindesc\">Description</td><td class=\"coinbalance\">Balance</td><td class=\"delcoin\">Delete</td></tr>"
+ "<tbody class=\"keymanBTCkeys\"></table>");
var $container = $("#CoinOverView");
$container.append("<div class=\"card BTCcard\">"
+"<div class=\"coinLogo\"><img src=\"images/logos/bitcoin.png\"></div>"
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
$container.append("<tr class=\"Tabl3TR BTCsetENT"+BTCkeys[i].pubkey+"\">"
+"<td class=\"\">"+BTCkeys[i].pubkey+"</td>"
+"<td class=\"\">"+BTCkeys[i].description+"</td>"
+"<td class=\"balanceC0unter BTCkeybalance"+BTCkeys[i].pubkey+"\"></td>"
+"<td class=\"deleteThis\" data-delcoin=\"BTC\" data-delkey=\""+BTCkeys[i].pubkey+"\">Delete</td>"
+"</tr>");
thisBTCaddress = BTCkeys[i].pubkey;
getpubkeyBalanceBTC(thisBTCaddress);
i++;        
if (i < BTCkeys.length) Balancecrawler()
}, Math.floor(Math.random() * 100) + btctimeout)
}
}


function getpubkeyBalanceBTC (thisBTCaddress, callback) {
	
	
$.ajax({
    url : 'https://xchain.io/api/balances/'+thisBTCaddress,
	dataType: 'json',
    tryCount : 0,
    retryLimit : 3,
    success : function(counterpartyCheck) {
for ( var member in counterpartyCheck.data) {
        if (counterpartyCheck.data[member].asset == "LTBCOIN") {	
		cptoken = counterpartyCheck.data[member].asset;
		cptokenbalance = counterpartyCheck.data[member].quantity;
		loadwalletCounterParty(cptoken,cptokenbalance,thisBTCaddress);
		}
		if (counterpartyCheck.data[member].asset == "FLDC") {	
		cptoken = counterpartyCheck.data[member].asset;
		cptokenbalance = counterpartyCheck.data[member].quantity;
		loadwalletCounterParty(cptoken,cptokenbalance,thisBTCaddress);
		}
		if (counterpartyCheck.data[member].asset == "PEPECASH") {	
		cptoken = counterpartyCheck.data[member].asset;
		cptokenbalance = counterpartyCheck.data[member].quantity;
		loadwalletCounterParty(cptoken,cptokenbalance,thisBTCaddress);
		}		
		
		
		
}
    },
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                console.log("Retry BTC:" + tryCount );
                $.ajax(this);
                return;
            }            
            return;
        }
        if (xhr.status == 500) {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                console.log("Retry BTC:" + tryCount );
                $.ajax(this);
                return;
            }            
            return;
        } else {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                console.log("Retry BTC:" + tryCount );
                $.ajax(this);
                return;
            }            
            return;
        }
    }
});	

var addresscheck = "0";

$.ajax({
    url : 'http://btc.blockdozer.com/insight-api/addr/'+thisBTCaddress,
	dataType: 'json',
    tryCount : 0,
    retryLimit : 3,
    success : function(address) {
thisbalance = address['balance'];
thisBTCaddress = address['addrStr'];	
thisbalanceBTCSettings = thisbalance;
thisbalance = (thisbalance*rateBTC).toFixed(4);
richness = parseFloat(richness) + parseFloat(thisbalance);
thisbalance = ('$' + parseFloat(thisbalance, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
addresscheck = thisbalance;
balanceUpdaterBTC(thisBTCaddress, thisbalance, richness, thisbalanceBTCSettings);
    },
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }            
            return;
        }
        if (xhr.status == 500) {
            //handle error
        } else {
            //handle error
        }
    }
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
$('.keymanBTCkeys > .Tabl3TR').children('.balanceC0unter').each(function () {
var thisCoin = $(this).text();
if (thisCoin > 0.00001){btcCoinWealth = parseFloat(btcCoinWealth) + parseFloat($(this).text());}
});
btcCoinWealthFIAT = (btcCoinWealth*rateBTC).toFixed(4);
$('.BTCcard').attr('data-balance', btcCoinWealthFIAT);
btcCoinWealthFIAT = ('$' + parseFloat(btcCoinWealthFIAT, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('#BTCwealth').html(btcCoinWealthFIAT + " " + fiatCurrency);
$('#BTCamount').html(btcCoinWealth);
/* get btc wealth*/
RefreshBTCListeners();
sortByBalance();
}

function RefreshBTCListeners() {
$(".keymanBTCkeys .Tabl3TR .deleteThis").off(); 
$(".keymanBTCkeys .Tabl3TR .deleteThis").on('click', function() {
var todeleteaddress = $(this).attr("data-delkey")
var index2del = arrayObjectIndexOf(BTCkeys, todeleteaddress, "pubkey" ); 

BTCkeys.splice(index2del, 1);
localStorage.setItem("BTCkeys", JSON.stringify(BTCkeys));
$( ".BTCsetENT"+todeleteaddress).remove();
});
}
