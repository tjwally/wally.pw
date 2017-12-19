bchCoinWealth = 0;

function loadkeysBCH (callback) {
var $container = $("#keymanagerWallets");
$container.append("<div class=\"keymanKeyHeader\">Bitcoin Cash Keys</div>"
+"<table class=\"keymanagerTable \">"
+ "<tr class=\"tableDesc\"><td class=\"pubkey\">PubKey</td><td class=\"coindesc\">Description</td><td class=\"coinbalance\">Balance</td><td class=\"delcoin\">Delete</td></tr>"
+ "<tbody class=\"keymanBCHkeys\"></table>");
var $container = $("#CoinOverView");
$container.append("<div class=\"card BCHcard\">"
+"<div class=\"coinLogo\"><img src=\"images/logos/bitcoincash.png\"></div>"
+"<div class=\"coinWealth\" id=\"BCHwealth\">0.00</div>"
+"<div class=\"coinAmount\" id=\"BCHamount\">0.00</div>"
+"<div class=\"thiscoinprice\">1 Bitcoin Cash = "+rateBCH+" "+fiatCurrency+"</div>"
+"</div>");
} 


function getWalletsBCH (callback) {
var bchi = 0;    
BCHBalancecrawler();
function BCHBalancecrawler() {
setTimeout(function(){
var $container = $(".keymanBCHkeys");
$container.append("<tr class=\"Tabl3TR BCHsetENT"+BCHkeys[bchi].pubkey+"\">"
+"<td class=\"\">"+BCHkeys[bchi].pubkey+"</td>"
+"<td class=\"\">"+BCHkeys[bchi].description+"</td>"
+"<td class=\"balanceC0unter BCHkeybalance"+BCHkeys[bchi].pubkey+"\"></td>"
+"<td class=\"deleteThis\" data-delcoin=\"BCH\" data-delkey=\""+BCHkeys[bchi].pubkey+"\">Delete</td>"
+"</tr>");
getpubkeyBalanceBCH(BCHkeys[bchi].pubkey);
bchi++;        
if (bchi < BCHkeys.length) BCHBalancecrawler()
}, Math.floor(Math.random() * 100) + bchtimeout)
}
}


function getpubkeyBalanceBCH (thisaddress, callback) {
var addresscheck = "0";
$.ajax({
    url : 'http://cashexplorer.bitcoin.com/insight-api/addr/'+thisaddress,
	dataType: 'json',
    tryCount : 0,
    retryLimit : 3,
    success : function(address) {
thisBCHbalance = address['balance'];
thisBCHaddress = address['addrStr'];	
thisBCHbalanceBCHSettings = thisBCHbalance;
thisBCHbalance = (thisBCHbalance*rateBCH).toFixed(4);
richness = parseFloat(richness) + parseFloat(thisBCHbalance);
thisBCHbalance = ('$' + parseFloat(thisBCHbalance, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
addresscheck = thisBCHbalance;
balanceUpdaterBCH(thisBCHaddress, thisBCHbalance, richness, thisBCHbalanceBCHSettings);
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

function balanceUpdaterBCH () {
richnescalc = ('$' + parseFloat(richness, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('.wealthCounter').html(richnescalc + " " + fiatCurrency);
$('.BCHkeybalance' + thisBCHaddress).html(thisBCHbalanceBCHSettings);
setTimeout(getBCHCoinWealth, 1000);
}


function getBCHCoinWealth () {
bchCoinWealth = 0;	
$('.keymanBCHkeys > .Tabl3TR').children('.balanceC0unter').each(function () {
var thisCoin = $(this).text();
if (thisCoin > 0.00001){bchCoinWealth = parseFloat(bchCoinWealth) + parseFloat($(this).text());}
});
bchCoinWealthFIAT = (bchCoinWealth*rateBCH).toFixed(4);
$('.BCHcard').attr('data-balance', bchCoinWealthFIAT);
bchCoinWealthFIAT = ('$' + parseFloat(bchCoinWealthFIAT, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
$('#BCHwealth').html(bchCoinWealthFIAT + " " + fiatCurrency);
$('#BCHamount').html(bchCoinWealth);
RefreshBCHListeners();
sortByBalance();
}


function RefreshBCHListeners() {
$(".keymanBCHkeys .Tabl3TR .deleteThis").off(); 
$(".keymanBCHkeys .Tabl3TR .deleteThis").on('click', function() {
var todeleteaddress = $(this).attr("data-delkey")
var index2del = arrayObjectIndexOf(BCHkeys, todeleteaddress, "pubkey" ); 

BCHkeys.splice(index2del, 1);
localStorage.setItem("BCHkeys", JSON.stringify(BCHkeys));
$( ".BCHsetENT"+todeleteaddress).remove();
});
}
