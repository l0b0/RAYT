/* ***** BEGIN LICENSE BLOCK *****
 *	 Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 * 
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is RAYT.
 *
 * The Initial Developer of the Original Code is
 * Victor Engmark.
 * Portions created by the Initial Developer are Copyright (C) 2007
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Thanks to:
 * einare @ MozillaZine forums
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 * 
 * ***** END LICENSE BLOCK ***** */
var rayt = {
	onLoad: function(event) {
		// initialization code
		this.initialized = true;

		this.strings = document.getElementById('rayt-strings');

		document.getElementById('contentAreaContextMenu').addEventListener('popupshowing', rayt.showContextMenu, false);

		// Use onFocus and onChange to add / remove listener; keeps the number of listeners to max. 1.
		// Will I need a listener for onFocus for each tab as well?
		document.getElementById('appcontent').addEventListener('DOMContentLoaded', rayt.onDOMContentLoaded, false);

	},

	onDOMContentLoaded: function(event) {
		var textareas = event.originalTarget.getElementsByTagName('textarea');
		//alert('Adding keyboard listener');
		for (var taCount = 0; taCount < textareas.length; taCount++) {
			var ta = textareas[taCount];
			ta.addEventListener('keypress', rayt.onTextAreaKeyPress, false);
		}
	},

	onTextAreaKeyPress: function(event) {
		// Do not save strings as you go along. Instead, if the character is the last one in the replace match (or any string which could match the end of the replace string), check backwards to see if the string matches a regex
		//alert('Pressed key in textarea: ' + String.fromCharCode(event.charCode));
	},

	replaceAll: function(event) {
		// Replace all in all the textareas in this window
		var textBox = document.commandDispatcher.focusedElement;
		var text = tBox.value;
	},

	replaceCurrent: function(event) {
		// Replace all in current textarea
	},

	replaceSelection: function(event) {
		// Replace all in current selection (must be in a textarea)
		var textBox = document.commandDispatcher.focusedElement;
		var text = textBox.value;

		var selectionStart = textBox.selectionStart;
		var selectionEnd   = textBox.selectionEnd;
		var currentSelection = text.substring(selectionStart, selectionEnd);
		var newSelection = currentSelection.replace(/\"(.*?)\"/g, "“$1”").replace(/(\d\s?)-(\s?\d)/g, "$1–$2").replace(/(\D\s)-(\s\D)/g, "$1—$2").replace(/([^\.]|^)\.\.\.([^\.]|$)/g, "$1…$2").replace(/(\w)\*{2,}(\w)/g, "$1——$2");
		var beforeSelection = text.substring(0, selectionStart);
		var afterSelection = text.substring(selectionEnd, text.length);
		
		// Insert newSelection where currentSelection was
		textBox.value = beforeSelection + newSelection + afterSelection; 
	},

	replaceDoublePrimes: function(text) {
		
	},

	replaceText: function(text) {
		this.prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefService).getBranch('extensions.rayt.');
		// TODO: Don't look for things which are disabled!
		
		// Do the easy, unambiguous things first
		this.matchPrimeInWord = "([^0-9\s])'([^0-9\s])"; // Ignores feet'inches notation
		if (prefs.getBoolPref('replace_prime_in_word')) {
			this.replacePrimeInWord = '$1’$2';
		} else {
			this.replacePrimeInWord = "$1'$2";
		}
		//alert(replacePrimeInWord);
		
		this.matchTripleDots = '([^\.])\.\.\.([^\.])';
		if (prefs.getBoolPref('replace_triple_dots')) {
			this.replaceTripleDots = '$1…$2';
		} else {
			this.replaceTripleDots = "$1...$2";
		}
		//alert(replaceTripleDots);
		
		this.matchNo = '(N[or])(\s?\d)';
		if (prefs.getBoolPref('replace_no')) {
			this.replaceNo = '№$2';
		} else {
			this.replaceNo = "$1$2";
		}
		//alert(replaceNo);

		// Connected strings (harder, but just as important)
		// Double primes ("s)
		this.matchDoublePrimes = '"(\w.*?\w)"';
		switch (prefs.getCharPref('double_primes_style')) {
		case 'quotes':
			this.replaceDoublePrimes = '“$1”';
			break;
		case 'guillemets':
			this.replaceDoublePrimes = '«$1»';
			break;
		default:
			this.replaceDoublePrimes = '"$1"';
		}
		//alert(prefs.getCharPref('double_primes_style') + ' ' + replaceDoublePrimes);
		
		this.matchSinglePrimes = "'(\w.*?\w)'";
		switch (prefs.getCharPref('single_primes_style')) {
		case 'quotes':
			this.replaceSinglePrimes = '‘$1’';
			break;
		case 'guillemets':
			this.replaceSinglePrimes = '‹$1›';
			break;
		default:
			this.replaceSinglePrimes = "'$1'";
		}
		//alert(prefs.getCharPref('single_primes_style') + ' ' + replaceSinglePrimes);
		
		// Replace "number dash number" with "number endash number" (without spaces)
		// Replace "non-number dash non-number" with "NN emdash NN" (with spaces)
		// See jEdit for abbreviations
		//this.matchRightArrow = '->';
		//this.replaceRightArrow = '→';
	},

	// See http://kb.mozillazine.org/Adding_items_to_menus
	showContextMenu: function(event) {
		//alert(gContextMenu.target.nodeName.toLowerCase());
		//alert(window.getSelection());
		gContextMenu.showItem('context-rayt-replace-current', gContextMenu.onTextInput);
		gContextMenu.showItem('context-rayt-replace-selection', document.commandDispatcher.focusedElement && document.commandDispatcher.focusedElement.selectionStart != document.commandDispatcher.focusedElement.selectionEnd);
	}

};

window.addEventListener('load', rayt.onLoad, false);
