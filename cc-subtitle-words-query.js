// ==UserScript==
// @name         CC字幕|查词翻译|
// @namespace    indefined
// @version      0.2
// @description  目前支持bilibili、Youtube。将CC字幕改变成可选择的文本，这样在看英文视频可以能够搭配谷歌翻译、沙拉查词的时候能快速查到不认识的单词。
// @author       kenny
// @match        https://www.bilibili.com/*
// @match        https://www.youtube.com/*
// @license      MIT
// @grant        none
// ==/UserScript==
(function () {
	'use strict';

	let stopTextPropagation = function stopTextPropagation(className) {
		let text = document.getElementsByClassName(className);
		if (text.length > 0) {
			let wrap = text[0];
			wrap.style['user-select'] = 'text';
			let eventList = ['mousedown', 'click', 'mouseout', 'mousemove', 'touchstart'];
			for(let i = 0; i < eventList.length; i++){
				wrap.addEventListener(eventList[i], function (e) {
				  e.stopPropagation();
				  return;
				});
			  }
		} else {
			// Handle the case where no elements were found
			console.log("No elements found with the specified class name.");
		}
	}


	let observeDomChanged = function(domChangedClass, subtitleClass){
		const targetNode = document.getElementsByClassName(domChangedClass)[0];
		const callback = function (mutationsList, observer) {
			mutationsList.forEach(mutation => {
				stopTextPropagation(subtitleClass);
			});
		};
 
		const observer = new MutationObserver(callback);
 
		const config = { attributes: true, childList: true, subtree: true };
 
		if (targetNode) {
			observer.observe(targetNode, config);
		} else {
			console.error('Target node not found');
		}
	}

	setTimeout(function(){
		var curUrl = window.location.href;
		let domChangedClass = null;
		let subtitleClass = null;
		if(curUrl.includes("bilibili")){
			domChangedClass = "bpx-player-control-wrap";
			subtitleClass = "bpx-player-subtitle-panel-text";
		}else if(curUrl.includes("youtube")){
			domChangedClass = "ytp-caption-window-container";
			subtitleClass = "caption-window ytp-caption-window-bottom";
		}

		if(domChangedClass && subtitleClass){
			console.log("===CC字幕查词初始化=>>>>>" + subtitleClass);
			observeDomChanged(domChangedClass, subtitleClass);
		}

	}, 5000);
})();



