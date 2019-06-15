// ==UserScript==
// @name          cool_stuff_bro
// @namespace     http://userstyles.org
// @description	  for real this is the best thing ever.
// @include 			about:privatebrowsing
// @include				about:newtab
// @author        asp
// @run-at        document-start
// @match        *://*/*
// @version       0.20171223121727
// ==/UserScript==

var style_element;
var id = "injected_by_cool_stuff_bro";

var html_style_element;
var html_id = "injected_by_cool_stuff_bro_html";

var youtube_style_element;
var youtube_id = "injected_by_cool_stuff_bro_for_youtube";
var youtube_css = [
	".html5-video-player:not(.ytp-transparent), .html5-video-player.ad-interrupting, .html5-video-player.ended-mode, .html5-video-player.ytp-fullscreen",
	"{",
	"background-color: #fff !important;",
	"}",
	".ytp-title-text, .ytp-left-controls, .captions-text, .ytp-popup.ytp-settings-menu",
	"{",
	"filter:invert(1) hue-rotate(180deg);",
	"}",
	"div#caption-window-1",
	"{",
	"background: none !important",
	"}"
].join("\n");

var global_turn_off;
var global_hide;
chrome.storage.sync.get("global_hide", function (key_value) {
	global_hide = key_value["global_hide"];
});
chrome.storage.sync.get("global_turn_off", function (key_value) {
	global_turn_off = key_value["global_turn_off"];
});

var toggle = true;
var html_toggle = false;
document.addEventListener('keydown', switching);
/*
function switching(evt){
console.log(evt.keyCode);
}*/

//////////////insert
function insert_css(modifier, inversion_type) {
	var css = [
		modifier,
		"{",
		inversion_type,
		"}"
	].join("\n");
	style_element = document.createElement("style");
	style_element.type = "text/css";
	style_element.id = id;
	style_element.appendChild(document.createTextNode(css));
	document.documentElement.appendChild(style_element);
/* 	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(style_element);
	} else {
		// no head yet, stick it whereever
		
	} */
}

function insert_css_html(modifier, inversion_type) {
	var css = [
		modifier,
		"{",
		inversion_type,
		"}"
	].join("\n");
	html_style_element = document.createElement("style");
	html_style_element.type = "text/css";
	html_style_element.id = html_id;
	html_style_element.appendChild(document.createTextNode(css));
	document.documentElement.appendChild(html_style_element);
}

function insert_youtube_css() {
	youtube_style_element = document.createElement("style");
	youtube_style_element.type = "text/css";
	youtube_style_element.id = youtube_id;
	youtube_style_element.appendChild(document.createTextNode(youtube_css));
	var heads = document.getElementsByTagName("head");
	document.documentElement.appendChild(youtube_style_element);

}
function insert_youtube_del_css() {
	var youtube_style_del_element = document.createElement("style");
	var youtube_del_css = [".ytp-big-mode .ytp-gradient-top, .ytp-big-mode .ytp-gradient-bottom, .ytp-gradient-top, .ytp-gradient-bottom",
		"{",
		"background-image: none !important;",
		"}"].join("\n");
	var youtube_del_id = "injected_by_cool_stuff_bro_for_youtube_del";
	youtube_style_del_element.type = "text/css";
	youtube_style_del_element.id = youtube_del_id;
	youtube_style_del_element.appendChild(document.createTextNode(youtube_del_css));
	var heads = document.getElementsByTagName("head");
	document.documentElement.appendChild(youtube_style_del_element);

}

//////////replace
function replace_css(modifier, inversion_type) {
	var css = [
		modifier,
		"{",
		inversion_type,
		"}"
	].join("\n");
	var textnode = (document.createTextNode(css));
	style_element.replaceChild(textnode, style_element.childNodes[0]);
}

function replace_css_html(modifier, inversion_type) {
	var css = [
		modifier,
		"{",
		inversion_type,
		"}"
	].join("\n");
	var textnode = (document.createTextNode(css));
	html_style_element.replaceChild(textnode, html_style_element.childNodes[0]);
}

function replace_youtube_css(toggle_youtube) {
	//youtube_style_element.innerText === ""
	var css = toggle_youtube ? youtube_css : [
	"div#caption-window-1",
	"{",
	"background: none !important",
	"}"
	].join("\n");
	var textnode = (document.createTextNode(css));
	youtube_style_element.replaceChild(textnode, youtube_style_element.childNodes[0]);

}

/*
function edit_style(inversion_type) {
var elts = document.querySelectorAll("*[style]");
for (var elt of elts) {
elt.style.cssText += inversion_type;
}
}
/*edit_style("filter: hue-rotate(180deg) invert(100%)");
 */
 
/*list of other modifiers 
'img:not([src$=".png"]):not([src$=".gif"]):not([src$=".PNG"]):not([src$=".GIF"]),[style*=".jpg"],[style*=".JPG"],[style*=".jpeg"],[style*=".JPEG"],canvas,embed,object,video';//for other
'img,[style*=".jpg"],[style*=".JPG"],[style*=".jpeg"],[style*=".JPEG"],video,iframe,canvas,embed,object';
*/
var modifier = 'img,video,iframe,canvas,object';
var url = new URL(document.URL);
var domain = url.hostname;

chrome.storage.sync.get(domain, function (black_list_re_invert) {
    if(global_turn_off){
        toggle = !toggle;
		insert_css(modifier, ""); //for keep inverted
    } else {
        if(global_hide){
            insert_css(modifier, "filter: opacity(0);"); 
        } else {
            if (isEmpty(black_list_re_invert)) {//if not in black list
                insert_css(modifier, "filter: contrast(95%) brightness(95%) hue-rotate(180deg) invert(100%);"); //for re-inverted
            } else { 
                toggle = !toggle;
                insert_css(modifier, ""); //for keep inverted
            }   
        }
    }
});
//insert_css_html("body", ""); //for html //currenty goes to body
insert_youtube_css(true); //for youtube
insert_youtube_del_css(); //del youtube ugly white bottom bar
var can_hide = true;

function switching(evt) {

	var inversion_type;
    //var can_hide; global variable
	//var modifier = 'img,video,iframe,canvas,object'; defined as global variable
	evt = evt || window.event;
	var charCode = evt.keyCode || evt.which;
	var altPressed,
	ctrlPressed;
	altPressed = evt.altKey;
	ctrlPressed = evt.ctrlKey;
	if (altPressed && ctrlPressed) {
		switch (charCode) {
		case 90: //'z':
			//to invert back and forth
            modifier = 'img,video,iframe,canvas,object';
            inversion_type = toggle ? "": "filter:hue-rotate(180deg) invert(100%);";
			can_hide = true;
            toggle = !toggle;
			replace_css(modifier, inversion_type);
			replace_youtube_css(toggle);
			break;

		case 65: //'a'
			//to invert only img
			modifier = "img";
			can_hide = true;
            toggle = true;
			inversion_type = "filter: contrast(95%) brightness(95%) hue-rotate(180deg) invert(100%);";
			replace_css(modifier, inversion_type);
			replace_youtube_css(true);
			break;

		case 83: //'s':
			//to invert only video
			modifier = 'video,iframe';
			can_hide = true;
            toggle = true;
			inversion_type = "filter:hue-rotate(180deg) invert(100%);";
			replace_css(modifier, inversion_type);
			replace_youtube_css(true);
			break;

		case 68: //'d':       
			//toggle global_hide
            inversion_type = "filter: opacity(0);";              
            replace_css(modifier, inversion_type); //removes last inverted (modifier is global)   
            if (! can_hide){
                chrome.storage.sync.get("global_hide", function (key_value) {
                    var new_bool = ! key_value["global_hide"];
                    chrome.storage.sync.set({
                        "global_hide": new_bool
                        }, function () {
                            alert('global hide is now ' + new_bool);
                    }); 
                });                                                
            }
            can_hide = false;
            
		case 89: //'y':
			//youtube blacken
			replace_youtube_css(true);
			break;

		case 66: //b
			//toggle blacklist
			var url = new URL(document.URL);
			var domain = url.hostname;
			chrome.storage.sync.get(domain, function (black_list_re_invert) {
				var url = new URL(document.URL);
				var domain = url.hostname;
				if (isEmpty(black_list_re_invert)){ //if not in blacklist, enter blacklist		
					chrome.storage.sync.set({
						[domain]: true
					}, function () {
						alert(domain + ' would NOT be re_inverted from now on.');
					});
				} else { //if in blacklist, remove from blacklist
					chrome.storage.sync.remove(domain, function () {
						alert(domain + ' would be re_inverted from now on.');
					});
				}
			});
			break;
		case 69: //e
			//toggle global_keep_inverted
			chrome.storage.sync.get("global_turn_off", function (key_value) {
				var new_bool = ! key_value["global_turn_off"];
				chrome.storage.sync.set({
					"global_turn_off": new_bool
					}, function () {
						alert('turn off extension is now ' + new_bool);
				}); 
			});
			break;
	
		case 85: //u
			//toggle pdf 
			inversion_type = html_toggle? "": "filter:hue-rotate(180deg) invert(100%);";
			html_toggle = !html_toggle; 
			replace_css_html("embed", inversion_type);
			break;
			
		default:
			break;
		}
	}
}

function isEmpty(obj) {
   for (var x in obj) { if (obj.hasOwnProperty(x))  return false; }
   return true;
}
/* 		case 72: //h
// html toggle
inversion_type = html_toggle? "": "background: rgb(255, 255, 255) !important; color: rgb(0, 0, 0) !important;";
html_toggle = !html_toggle;
replace_css_html("body", inversion_type);
break;
 */

/*
		case 68: //'d':
			//to invert normal invert
			modifier = "img";
			toggle = false;
			inversion_type = "filter:hue-rotate(0deg) invert(100%);";
			replace_css(modifier, inversion_type);
			replace_youtube_css(true);
			break;
            
case 65: //'a':
//to youtube inversion
replace_youtube_css();
break;

case 83: //'s':
//to unreinvert
modifier = 'img,[style*=".jpg"],[style*=".JPG"],[style*=".jpeg"],[style*=".JPEG"],canvas,embed,object,video';
inversion_type = "";
replace_css(modifier, inversion_type);
break;
*/