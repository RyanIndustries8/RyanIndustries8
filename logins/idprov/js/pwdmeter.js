// JavaScript Document

/*
 * Give the user some visual feedback on the strength of his password
 */

window.$pwdmeter = {};
$pwdmeter.CONST_DOM_ID_MIN_LENGTH = '#pwdmeterMinLength';
$pwdmeter.CONST_DOM_ID_MIN_SPECIAL = '#pwdmeterMinSpecial';
$pwdmeter.CONST_DOM_ID_MIN_NUMERIC = '#pwdmeterMinNumeric';
$pwdmeter.CONST_DOM_ID_MIN_ALPHA = '#pwdmeterMinAlpha';
$pwdmeter.CONST_DOM_ID_MIN_UNIQUE = '#pwdmeterMinUnique';
$pwdmeter.CONST_DOM_ID_USER_ID = '#pwdmeterUserId';


jQuery(initPwdChk);

function initPwdChk() {
	jQuery(".password").each(function() {
		// Set the scorebar based on current value
		chkPass(this);
	});
}



String.prototype.strReverse = function() {
	return this.split("").reverse().join("");
};


function chkPass(pwdField) {
	pwdField = jQuery(pwdField);

	if (!window.console) {
		console = {log: function() {}};   // Stupid IE
	}

	pwdValue = pwdField.val();

	var userElement = jQuery($pwdmeter.CONST_DOM_ID_USER_ID);
	var userid;
	if (userElement) {
		userid = userElement.val();
	}

	console.log(new Date() + "Checking password field '" + pwdField.attr('id') + "'");
	console.log("Checking against user '" + userid + "'");

	$pwdmeter.config = getConfig();

	var oScorebar = pwdField.parent().find(".scorebar");
	var oScoreName = pwdField.parent().find(".scoreName");
	var progressBar = pwdField.parent().find(".progress-bar");

	var nScoreValue=0, nLength=0, nAlphaUC=0, nAlphaLC=0, nNumber=0, nSymbol=0, nMidChar=0, nRequirements=0, nUnqChar=0, nRepChar=0, nRepInc=0, nConsecAlphaUC=0, nConsecAlphaLC=0, nConsecNumber=0, nSeqAlpha=0, nSeqNumber=0, nSeqSymbol=0, nSeqChar=0, nReqChar=0;
	var nMultMidChar=2, nMultConsecAlphaUC=2, nMultConsecAlphaLC=2, nMultConsecNumber=2;
	var nMultSeqAlpha=3, nMultSeqNumber=3, nMultSeqSymbol=3;
	var nMultLength=4, nMultNumber=4;
	var nMultSymbol=6, nMultUnique=1;
	var nTmpAlphaUC="", nTmpAlphaLC="", nTmpNumber="";
	var sAlphas = "abcdefghijklmnopqrstuvwxyz";
	var sNumerics = "01234567890";
	var sSymbols = ")!@#$%^&*()";
	var possibleScoreValues = ["Weak", "Medium", "Strong", "Very Strong"];
	var exostarScoreValue = 2;
	var sScoreName = possibleScoreValues[0];
	backgroundPosition = "0px"
		var nMinPwdLen = $pwdmeter.config.minLength;
	if (pwdValue) {
		nScoreValue = parseInt(pwdValue.length * nMultLength);
		nLength = pwdValue.length;
		var arrPwd = pwdValue.replace(/\s+/g,"").split(/\s*/);
		var arrPwdLen = arrPwd.length;

		/* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
		sUnique = '';
		for (var a=0; a < arrPwdLen; a++) {
			// Collect unique characters for Exostar requirement
			if (sUnique.indexOf(arrPwd[a]) == -1) {
				sUnique = sUnique + arrPwd[a];
			}

			if (arrPwd[a].match(/[A-Z]/g)) {
				if (nTmpAlphaUC !== "") { 
					if ((nTmpAlphaUC + 1) == a) { nConsecAlphaUC++; } 
				}
				nTmpAlphaUC = a;
				nAlphaUC++;
			}
			else if (arrPwd[a].match(/[a-z]/g)) { 
				if (nTmpAlphaLC !== "") { 
					if ((nTmpAlphaLC + 1) == a) { nConsecAlphaLC++; } 
				}
				nTmpAlphaLC = a;
				nAlphaLC++;
			}
			else if (arrPwd[a].match(/[0-9]/g)) { 
				if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
				if (nTmpNumber !== "") { 
					if ((nTmpNumber + 1) == a) { nConsecNumber++; } 
				}
				nTmpNumber = a;
				nNumber++;
			}
			else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) { 
				if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
				nSymbol++;
			}

			/* Check for repeat characters */
			var bCharExists = false;
			for (var b=0; b < arrPwdLen; b++) {
				if (a == b) continue;
				if (arrPwd[a] == arrPwd[b]) { /* repeat character exists */
					bCharExists = true;
					/* 
                    Calculate increment deduction based on proximity to identical characters
                    Deduction is incremented each time a new match is discovered
                    Deduction amount is based on total password length divided by the
                    difference of distance between currently selected match
					 */
					nRepInc += Math.abs(arrPwdLen/(b-a));
				} 
			}
			if (bCharExists) { 
				nRepChar++; 
				nUnqChar = arrPwdLen-nRepChar;
				nRepInc = (nUnqChar) ? Math.ceil(nRepInc/nUnqChar) : Math.ceil(nRepInc); 
			}

		}
		var nUnique = sUnique.length;

		var s, sFwd, sRev;
		/* Check for sequential alpha string patterns (forward and reverse) */
		for (s=0; s < 23; s++) {
			sFwd = sAlphas.substring(s,parseInt(s+3));
			sRev = sFwd.strReverse();
			if (pwdValue.toLowerCase().indexOf(sFwd) != -1 || pwdValue.toLowerCase().indexOf(sRev) != -1) { nSeqAlpha++; nSeqChar++;}
		}

		/* Check for sequential numeric string patterns (forward and reverse) */
		for (s=0; s < 8; s++) {
			sFwd = sNumerics.substring(s,parseInt(s+3));
			sRev = sFwd.strReverse();
			if (pwdValue.toLowerCase().indexOf(sFwd) != -1 || pwdValue.toLowerCase().indexOf(sRev) != -1) { nSeqNumber++; nSeqChar++;}
		}

		/* Check for sequential symbol string patterns (forward and reverse) */
		for (s=0; s < 8; s++) {
			sFwd = sSymbols.substring(s,parseInt(s+3));
			sRev = sFwd.strReverse();
			if (pwdValue.toLowerCase().indexOf(sFwd) != -1 || pwdValue.toLowerCase().indexOf(sRev) != -1) { nSeqSymbol++; nSeqChar++;}
		}

		/* Modify overall score value based on usage vs requirements */
		/* General point assignment */

		if (nAlphaUC > 0 && nAlphaUC < nLength) {   
			nScoreValue = parseInt(nScoreValue + ((nLength - nAlphaUC) * 2));
		}
		if (nAlphaLC > 0 && nAlphaLC < nLength) {   
			nScoreValue = parseInt(nScoreValue + ((nLength - nAlphaLC) * 2)); 
		}
		if (nNumber > 0 && nNumber < nLength) { 
			nScoreValue = parseInt(nScoreValue + (nNumber * nMultNumber));
		}
		if (nSymbol > 0) {  
			nScoreValue = parseInt(nScoreValue + (nSymbol * nMultSymbol));
		}
		if (nMidChar > 0) { 
			nScoreValue = parseInt(nScoreValue + (nMidChar * nMultMidChar));
		}

		// Add bonus for unique characters
		nScoreValue = parseInt(nScoreValue + (nUnique * nMultUnique));


		/* Point deductions for poor practices */
		if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {  // Only Letters
			nScoreValue = parseInt(nScoreValue - nLength);
		}
		if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {  // Only Numbers
			nScoreValue = parseInt(nScoreValue - nLength); 
		}
		if (nRepChar > 0) {  // Same character exists more than once
			nScoreValue = parseInt(nScoreValue - nRepInc);
		}
		if (nConsecAlphaUC > 0) {  // Consecutive Uppercase Letters exist
			nScoreValue = parseInt(nScoreValue - (nConsecAlphaUC * nMultConsecAlphaUC)); 
		}
		if (nConsecAlphaLC > 0) {  // Consecutive Lowercase Letters exist
			nScoreValue = parseInt(nScoreValue - (nConsecAlphaLC * nMultConsecAlphaLC)); 
		}
		if (nConsecNumber > 0) {  // Consecutive Numbers exist
			nScoreValue = parseInt(nScoreValue - (nConsecNumber * nMultConsecNumber));  
		}
		if (nSeqAlpha > 0) {  // Sequential alpha strings exist (3 characters or more)
			nScoreValue = parseInt(nScoreValue - (nSeqAlpha * nMultSeqAlpha)); 
		}
		if (nSeqNumber > 0) {  // Sequential numeric strings exist (3 characters or more)
			nScoreValue = parseInt(nScoreValue - (nSeqNumber * nMultSeqNumber)); 
		}
		if (nSeqSymbol > 0) {  // Sequential symbol strings exist (3 characters or more)
			nScoreValue = parseInt(nScoreValue - (nSeqSymbol * nMultSeqSymbol)); 
		}


		/* Determine if mandatory requirements have been met and set image indicators accordingly */
		var arrChars = [nLength,nAlphaUC,nAlphaLC,nNumber,nSymbol];
		// Exostar policy doesn't distinguish between upper/lower case.  We require certain minimums for alpha, numeric and special
		var bExostarMinSatisfied = (arrChars[1] + arrChars[2]) >= $pwdmeter.config.minAlpha && arrChars[3] >= $pwdmeter.config.minNumeric && arrChars[4] >= $pwdmeter.config.minSpecial;
		var arrCharsIds = ["nLength","nAlphaUC","nAlphaLC","nNumber","nSymbol"];
		var arrCharsLen = arrChars.length;
		for (var c=0; c < arrCharsLen; c++) {

			var minVal = 0;
			if (arrCharsIds[c] == "nLength") { 
				minVal = parseInt(nMinPwdLen - 1); 
			}
			if (arrChars[c] == parseInt(minVal + 1)) { 
				nReqChar++; 

			}
			else if (arrChars[c] > parseInt(minVal + 1)) { 
				nReqChar++; 
			} 

		}
		nRequirements = nReqChar;
		var nMinReqChars;
		if (pwdValue.length >= nMinPwdLen) { nMinReqChars = 3; } else { nMinReqChars = 4; }
		if (nRequirements > nMinReqChars) {  // One or more required character types exist
			nScoreValue = parseInt(nScoreValue + (nRequirements)); 
		}


		console.log("ExostarMinSatisfied: " + bExostarMinSatisfied);
		console.log(nUnique + " unique characters (at least " + $pwdmeter.config.minUnique +  " required)");
		console.log("pwdValue != user? " + (pwdValue != userid));
		console.log("Length: " + nLength + " (at least " + nMinPwdLen + " required)");
		var meetsExostarCriteria = bExostarMinSatisfied && (nUnique >= $pwdmeter.config.minUnique) && (pwdValue != userid) && (nLength >= nMinPwdLen);
		console.log("score : " + nScoreValue);
		/* Determine complexity based on overall score */
		var increment = 100/possibleScoreValues.length;
		if (nScoreValue > 100) { 
			nScoreValue = 100; 
		} else if (nScoreValue < 0) { 
			nScoreValue = 0; 
		}

		var numValues = possibleScoreValues.length;
		sScoreName = possibleScoreValues[0];
		var scoreIndex = 0;
		for (var i=1; i < numValues; i++) {
			if (nScoreValue >= increment*i)  { 
				scoreIndex = i;
			}
		}


		if (meetsExostarCriteria) {
			if (scoreIndex < exostarScoreValue) {
				scoreIndex = exostarScoreValue;
			}
			if (nScoreValue < increment*scoreIndex) {
				nScoreValue = increment*scoreIndex;
			}
		} else {
			if (scoreIndex >= exostarScoreValue) {
				scoreIndex = exostarScoreValue-1;
			}
			if (nScoreValue > increment*scoreIndex) {
				nScoreValue = increment*scoreIndex-1;
			}
		}

		sScoreName = possibleScoreValues[scoreIndex];

		/* Display updated score criteria to client */
		var borderImageWidth = 400;
		var borderWidth = 100;

		// Divide borderImageWidth into equal pieces
		var multiplier = (borderImageWidth/100)/numValues;
		var borderStartPosition = Math.min(borderImageWidth-borderWidth, Math.max(nScoreValue, 0) * multiplier * (numValues-1));
		backgroundPosition = "-" + parseInt(borderStartPosition) + "px"
	} 

	oScorebar.css('background-Position', backgroundPosition);
	oScoreName.text(sScoreName);

	var width;
	var backgroundColor;
	switch (sScoreName) {
	case "Weak":
		width = "25%";
		backgroundColor = "#F5382F";
		break;
	case "Medium":
		width = "50%";
		backgroundColor = "#F09025";
		break;
	case "Strong":
		width = "75%";
		backgroundColor = "#83CE40";
		break;
	case "Very Strong":
		width = "100%";
		backgroundColor = "#83CE40";
		break;   
	default:
		width = "0%";
	backgroundColor = "none";
	}
	if (pwdValue) {
		progressBar.css({"background-color": backgroundColor, "width": width});
	} else {
		progressBar.css({"background-color": "transparent", "width": "0%"});
	}

	var password = pwdValue;

	var helperText = {
			charLength: document.querySelector('.length'),
			letter: document.querySelector('.letter'),
			number: document.querySelector('.number'),
			special: document.querySelector('.special'),
			different: document.querySelector('.different'),
			spaces: document.querySelector('.spaces')
	};

	var pattern = {
			charLength: function() {
				if( password.length >= 8 ) {	  // Password Length
					return true;
				}
			},
			letter: function() {
				var regex = /^(?=.*[a-zA-Z]).+$/; // Letter pattern

				if( regex.test(password) ) {
					return true;
				}
			},
			number: function() {
				var regex = /^(?=.*[0-9]).+$/; // Number pattern

				if( regex.test(password) ) {
					return true;
				}
			},
			special: function() {
				var regex = /[^a-zA-Z0-9_ ]/g; // Special character pattern

				if( regex.test(password) ) {
					return true;
				}
			},
			different: function() {				
				var index = {}; 			  // Different character pattern
				var ch, cnt = 0;
				for (var i = 0; i < password.length; i++) {
					ch = password.charAt(i);
					if (!(ch in index)) {
						index[ch] = true;
						++cnt;
					}
				}
				if( cnt >= 4 ) {
					return true;
				}
			},
			spaces: function() {
				/*if (password) {
					var regex = /\s/; 		  // This is a check to see if a string has spaces
					if (!regex.test(password)) {
						return true;
					}
				}*/
				if (password) {
					var regex = /^\s+|\s+$/g; 		  // No Leading and Trailing Spaces
					if (!regex.test(password)) {
						return true;
					}
				}
			}   
	};

	// Check that password is a minimum of 8 characters
	patternTest( pattern.charLength(), helperText.charLength );

	// Check that password contains a lowercase letter      
	patternTest( pattern.letter(), helperText.letter );

	// Check that password contains a number
	patternTest( pattern.number(), helperText.number );

	// Check that password contains a special character
	patternTest( pattern.special(), helperText.special );

	// Check that password contains at least 4 different characters
	patternTest( pattern.different(), helperText.different );

	// Check that password contains no spaces
	patternTest( pattern.spaces(), helperText.spaces );

	function patternTest(pattern, response) {
		if(pattern) {
			addClass(response, 'valid');
		}
		else {
			removeClass(response, 'valid');
		}
	}

	function addClass(el, className) {
		if (el.classList) {
			el.classList.add(className);
		}
		else {
			el.className += ' ' + className;
		}
	}

	function removeClass(el, className) {
		if (el.classList)
			el.classList.remove(className);
		else
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}

}


function getConfig() {
	return {
		minLength : parseInt(jQuery($pwdmeter.CONST_DOM_ID_MIN_LENGTH).val()),
		minSpecial : parseInt(jQuery($pwdmeter.CONST_DOM_ID_MIN_SPECIAL).val()),
		minNumeric : parseInt(jQuery($pwdmeter.CONST_DOM_ID_MIN_NUMERIC).val()),
		minAlpha : parseInt(jQuery($pwdmeter.CONST_DOM_ID_MIN_ALPHA).val()),
		minUnique : parseInt(jQuery($pwdmeter.CONST_DOM_ID_MIN_UNIQUE).val())
	};
}

jQuery(function(){
	var tmp = jQuery.fn.popover.Constructor.prototype.show;
	jQuery.fn.popover.Constructor.prototype.show = function() {
		tmp.call(this); if (this.options.callback) {
			this.options.callback();
		}
	}

	jQuery('[data-toggle="popover"]').popover({
		placement : 'bottom',
		trigger : 'focus',
		html: true,
		content : function() {
			return jQuery('#popover-content').html();
		},
		callback: initPwdChk
	});
});