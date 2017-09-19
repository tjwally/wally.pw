walletcount = 0;
richness= 0;
scr33n=0;
fiatCurrency = "";



function getfiatCurrency (callback) {
if (localStorage.getItem("fiatCurrency") === null) {
console.log("###NO wally settings DATA###");
fiatCurrency = "USD";
} else {
fiatCurrency = localStorage.getItem("fiatCurrency");
}
callback();
}

// BTCkeys
// BCHkeys
// ETHkeys

function FLinit() {
getfiatCurrency(function () {
$("#keymanagerWallets").empty();
$("#CoinOverView").empty();
$(".keymanan0nkeys").empty();
richness = 0;
priceCheck(function () {
getAnonCoins(function () {	
loadiniData(function () { 
if (walletcount > 0) {
$('.WalletsTracked').html("Public Keys Tracked: "+walletcount);	
loadwallets(function () { 
getWallets(function () { 
}); 
}); 
}
});
}); 
}); 
}); 
}


/* pricecheck v2 */
function priceCheck (callback) {

	
console.log("###PRICE CHECK###");	
 jQuery.ajax({
    dataType: "json",
    url: "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,BCH,ETH,STORJ,XMR,ZEC,LTC,DOGE&tsyms="+fiatCurrency,
    success: function( data ) { 
	rateBTC = data['BTC'][fiatCurrency];
	rateBCH = data['BCH'][fiatCurrency];
	rateLTC = data['LTC'][fiatCurrency];
	rateDOGE = data['DOGE'][fiatCurrency];
	rateETH = data['ETH'][fiatCurrency];
	rateSTORJ = data['STORJ'][fiatCurrency];
	rateXMR = data['XMR'][fiatCurrency];
	rateZEC = data['ZEC'][fiatCurrency];
		callback();
		}
		});
}
/* pricecheck */


function loadiniData (callback) {
if (localStorage.getItem("BTCkeys") === null) {
console.log("###NO BTCkeys DATA###");
BTCkeys = [];
} else {
BTCkeys = JSON.parse(localStorage.getItem("BTCkeys"));
walletcount = walletcount + Object.keys(BTCkeys).length;
console.log("###YES BTCkeys DATA###");
}
if (localStorage.getItem("BCHkeys") === null) {
console.log("###NO BCHkeys DATA###");
BCHkeys = [];
} else {
BCHkeys = JSON.parse(localStorage.getItem("BCHkeys"));
walletcount = walletcount + Object.keys(BCHkeys).length;
console.log("###YES BCHkeys DATA###");
}
if (localStorage.getItem("LTCkeys") === null) {
console.log("###NO LTCkeys DATA###");
LTCkeys = [];
} else {
LTCkeys = JSON.parse(localStorage.getItem("LTCkeys"));
walletcount = walletcount + Object.keys(LTCkeys).length;
console.log("###YES LTCkeys DATA###");
}
if (localStorage.getItem("DOGEkeys") === null) {
console.log("###NO DOGEkeys DATA###");
DOGEkeys = [];
} else {
DOGEkeys = JSON.parse(localStorage.getItem("DOGEkeys"));
walletcount = walletcount + Object.keys(DOGEkeys).length;
console.log("###YES DOGEkeys DATA###");
}
if (localStorage.getItem("ETHkeys") === null) {
console.log("###NO ETHkeys DATA###");
ETHkeys = [];
} else {
ETHkeys = JSON.parse(localStorage.getItem("ETHkeys"));
walletcount = walletcount + Object.keys(ETHkeys).length;
console.log("###YES ETHkeys DATA###");
}

if (walletcount === 0) {
$('.WalletsTracked').html("Public Keys Tracked: "+walletcount);	
console.log("walletcount === 0");
addKeyWiz();
}
callback();
}
function loadwallets(callback) {
if(BTCkeys.length>0){loadkeysBTC();}
if(BCHkeys.length>0){loadkeysBCH();}
if(ETHkeys.length>0){loadkeysETH();}
if(LTCkeys.length>0){loadkeysLTC();}
if(DOGEkeys.length>0){loadkeysDOGE();}
callback();
}
function getWallets(callback) {
if(BTCkeys.length>0){getWalletsBTC();}
if(BCHkeys.length>0){getWalletsBCH();}
if(ETHkeys.length>0){getWalletsETH();}
if(LTCkeys.length>0){getWalletsLTC();}
if(DOGEkeys.length>0){getWalletsDOGE();}
callback();
}



function addKeyWiz(){
	console.log("addKeyWiz");
var modal = new tingle.modal({
    footer: true,
    stickyFooter: true,
    closeMethods: [],
    //closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2'],
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        return true; 
//    	return false; 
    }
});
modal.setContent('<h1>No keys found!</h1><p>Open the Key Manager to add keys or open the Settings Page to import a JSON Backup</p>');
modal.addFooterBtn('Key Manager', 'tingle-btn tingle-btn--primary', function() {
    modal.close();
	console.log('KeyManager');
showKeyManagement();
});
modal.addFooterBtn('Import/Export', 'tingle-btn tingle-btn--primary', function() {
    modal.close();
	console.log('Settings');
showimportExport();
});
// open modal
modal.open();
}


//ABOUT
function aboutModal(){
var aboutModal = new tingle.modal({
	    footer: true,
		    closeMethods: [],
        onClose: function() {
            console.log('close');
        },
        onOpen: function() {
            console.log('open');
        },
        beforeClose: function() {
            console.log('before close');
            return true;
        },
        cssClass: ['class1', 'class2']
    });
    aboutModal.setContent(document.querySelector('#about').innerHTML);
aboutModal.addFooterBtn('Close', 'tingle-btn tingle-btn--primary', function() {
    aboutModal.close();
});
	aboutModal.open();
}
//ABOUT


// CONTROLS

function showmainScreen() {
console.log("###showKeyManagement###");
$('.P1BTN').removeClass('activeBTN');
$('.homeBTN').addClass('activeBTN');
$('.leftP1').hide(0,"linear");
$('.mainScreen').show(0,"linear");
}

function showAnonCoins() {
console.log("###showAnonCoins###");
$('.P1BTN').removeClass('activeBTN');
$('.anoncoinsBTN').addClass('activeBTN');
$('.leftP1').hide(0,"linear");
$('.AnonCoins').show(0,"linear");
}




function showKeyManagement() {
console.log("###showKeyManagement###");
$('.P1BTN').removeClass('activeBTN');
$('.keymanagerBTN').addClass('activeBTN');
$('.leftP1').hide(0,"linear");
$('.keymanager').show(0,"linear");
}

function showSettings() {
console.log("###showKeyManagement###");
$('.P1BTN').removeClass('activeBTN');
$('.settingsBTN').addClass('activeBTN');
$('.leftP1').hide(0,"linear");
$('.wallysettings').show(0,"linear");
}

function showimportExport() {
console.log("###showKeyManagement###");
$('.P1BTN').removeClass('activeBTN');
$('.impexpBTN').addClass('activeBTN');
$('.leftP1').hide(0,"linear");
$('.importExport').show(0,"linear");
}

$( document ).ready(function() {
//showKeyManagement();
showmainScreen();
$('.keymanagerBTN').on('click', function() {	 
showKeyManagement();
});
$('.anoncoinsBTN').on('click', function() {	 
showAnonCoins();
});


$('.homeBTN').on('click', function() {	 
showmainScreen();
//FLinit();
});

$('.settingsBTN').on('click', function() {	 
showSettings();
});

$('.impexpBTN').on('click', function() {	 
showimportExport();
});
$('.abountBTN').on('click', function() {
	aboutModal();
});
$('.resetBTN').on('click', function() {	 
	localStorage.clear();
	location.reload();
//	setTimeout(showmainScreen, 1000);
});
$('.reloadBTN').on('click', function() {	 
	location.reload();
});





});
// CONTROLS

//settings
$( document ).ready(function() {
$( "#fiatcurrencySEL" ).change(function() {
console.log("###fiatcurrencySEL###");
var fiatcurrencySEL = $('select[name=fiatcurrencySEL]').val();
var fiatCurrency = fiatcurrencySEL;
localStorage.setItem('fiatCurrency', fiatcurrencySEL)
});

$( "#themeselect" ).change(function() {
console.log("###themeselect###");
var themeselectSEL = $('select[name=themeselect]').val();
localStorage.setItem('wallyTheme', themeselectSEL)
});

});
//settings

//IMPORT Export   
$( document ).ready(function() {
$('#downloadJSON').on('click', function() {	 
 		var BTCkeys = localStorage.getItem("BTCkeys");	
		if (BTCkeys) {var BTCkeys = "##BTCSTART##"+BTCkeys+"##BTCEND##<br>";}else{BTCkeys=""};
		var BCHkeys = localStorage.getItem("BCHkeys");	
		if (BCHkeys) {var BCHkeys = "##BCHSTART##"+BCHkeys+"##BCHEND##<br>";}else{BCHkeys=""};
		var LTCkeys = localStorage.getItem("LTCkeys");	
		if (LTCkeys) {var LTCkeys = "##LTCSTART##"+LTCkeys+"##LTCEND##<br>";}else{LTCkeys=""};
		var DOGEkeys = localStorage.getItem("DOGEkeys");	
		if (DOGEkeys) {var DOGEkeys = "##DOGESTART##"+DOGEkeys+"##DOGEEND##<br>";}else{DOGEkeys=""};
		var ETHkeys = localStorage.getItem("ETHkeys");	
		if (ETHkeys) {var ETHkeys = "##ETHSTART##"+ETHkeys+"##ETHEND##<br>";}else{ETHkeys=""};
		var fiatCurrencyexp = "##S_FCSTART##"+fiatCurrency+"##S_FCEND##<br>";
		var wallyThemeexp = "##S_WTSTART##"+wallyTheme+"##S_WTEND##<br>";
		var anoncoins = localStorage.getItem("anoncoins");	
		if (anoncoins) {var anoncoins = "##A_CSTART##"+anoncoins+"##A_CEND##<br>";}else{anoncoins=""};	
		//var url = "data:application/octet-stream;base64," + Base64.encode(data);
		$('#downloadJSONDIS').html(BTCkeys+BCHkeys+LTCkeys+DOGEkeys+ETHkeys+fiatCurrencyexp+wallyThemeexp+anoncoins);
});


$('#importJSONBTN').on('click', function() {	 
	localStorage.clear();
	var importJSon = $('textarea#importJSON').val();
	if(importJSon.indexOf("BTCSTART") != -1){	var BTCkeys=importJSon.substring(importJSon.lastIndexOf("##BTCSTART##")+12,importJSon.lastIndexOf("##BTCEND##"));	console.log("T0: "+BTCkeys); localStorage.setItem("BTCkeys", BTCkeys);}	
	if(importJSon.indexOf("BCHSTART") != -1){	var BCHkeys=importJSon.substring(importJSon.lastIndexOf("##BCHSTART##")+12,importJSon.lastIndexOf("##BCHEND##"));	console.log("T0: "+BCHkeys); localStorage.setItem("BCHkeys", BCHkeys);}	
	if(importJSon.indexOf("LTCSTART") != -1){	var LTCkeys=importJSon.substring(importJSon.lastIndexOf("##LTCSTART##")+12,importJSon.lastIndexOf("##LTCEND##"));	console.log("T0: "+LTCkeys); localStorage.setItem("LTCkeys", LTCkeys);}	
	if(importJSon.indexOf("DOGESTART") != -1){	var DOGEkeys=importJSon.substring(importJSon.lastIndexOf("##DOGESTART##")+13,importJSon.lastIndexOf("##DOGEEND##"));	console.log("T0: "+DOGEkeys); localStorage.setItem("DOGEkeys", DOGEkeys);}	
	if(importJSon.indexOf("ETHSTART") != -1){	var ETHkeys=importJSon.substring(importJSon.lastIndexOf("##ETHSTART##")+12,importJSon.lastIndexOf("##ETHEND##"));	console.log("T0: "+ETHkeys); localStorage.setItem("ETHkeys", ETHkeys);}	
	if(importJSon.indexOf("A_CSTART") != -1){	var anoncoins=importJSon.substring(importJSon.lastIndexOf("##A_CSTART##")+12,importJSon.lastIndexOf("##A_CEND##"));	console.log("T0: "+anoncoins); localStorage.setItem("anoncoins", anoncoins);}	
	if(importJSon.indexOf("S_FCSTART") != -1){	var fiatCurrency=importJSon.substring(importJSon.lastIndexOf("##S_FCSTART##")+13,importJSon.lastIndexOf("##S_FCEND##"));	console.log("T0: "+fiatCurrency); localStorage.setItem("fiatCurrency", fiatCurrency);}	
	if(importJSon.indexOf("S_WTSTART") != -1){	var wallyTheme=importJSon.substring(importJSon.lastIndexOf("##S_WTSTART##")+13,importJSon.lastIndexOf("##S_WTEND##"));	console.log("T0: "+wallyTheme); localStorage.setItem("wallyTheme", wallyTheme);}	
	location.reload();
});



});
//IMPORT Export 


//Add Key
// BTCkeys
// BCHkeys
// ETHkeys

$( document ).ready(function() {
$('#savepubkey').on('click', function(){
		
var cointype = $('select[name=cointype]').val();
var coinpubkey = $('input[name=coinpubkey]').val();
var addressdescription = $('input[name=addressdescription]').val();

console.log(coinpubkey);
console.log(addressdescription);
if (cointype == "btc"){
	console.log("BTC");
		BTCkeys.push({pubkey : coinpubkey,     description : addressdescription});
		localStorage.setItem("BTCkeys", JSON.stringify(BTCkeys));
		BTCkeys = JSON.parse(localStorage.getItem("BTCkeys"));	
}
if (cointype == "bch"){
		console.log("BCH");
		BCHkeys.push({pubkey : coinpubkey,     description : addressdescription});
		localStorage.setItem("BCHkeys", JSON.stringify(BCHkeys));
		BCHkeys = JSON.parse(localStorage.getItem("BCHkeys"));
}
if (cointype == "ltc"){
		console.log("LTC");
		LTCkeys.push({pubkey : coinpubkey,     description : addressdescription});
		localStorage.setItem("LTCkeys", JSON.stringify(LTCkeys));
		LTCkeys = JSON.parse(localStorage.getItem("LTCkeys"));
}
if (cointype == "eth"){
	console.log("ETH");
		ETHkeys.push({pubkey : coinpubkey,     description : addressdescription});
		localStorage.setItem("ETHkeys", JSON.stringify(ETHkeys));
		ETHkeys = JSON.parse(localStorage.getItem("ETHkeys"));
}
if (cointype == "doge"){
	console.log("DOGE");
		DOGEkeys.push({pubkey : coinpubkey,     description : addressdescription});
		localStorage.setItem("DOGEkeys", JSON.stringify(DOGEkeys));
		DOGEkeys = JSON.parse(localStorage.getItem("DOGEkeys"));
}

$('#coinpubkey').val('');
$('#addressdescription').val('');
});
});
//Add Key



