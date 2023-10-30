// ==UserScript==
// @name         CC字幕|查词翻译|
// @namespace    indefined
// @version      0.1
// @description  目前支持bilibili，后续加入Youtube。将CC字幕改变成可选择的文本，这样在看英文视频可以能够搭配谷歌翻译、沙拉查词的时候能快速查到不认识的单词。
// @author       kenny
// @match        https://www.bilibili.com/*
// @license      MIT
// @grant        none
// ==/UserScript==
(function () {
	'use strict';
	let stopBilibiliTextPropagation = function stopBilibiliTextPropagation() {
		let text = document.getElementsByClassName('bpx-player-subtitle-panel-text');
		if (text.length > 0) {
			let wrap = text[0];
			wrap.style['user-select'] = 'text';
			wrap.addEventListener('mousedown', function (e) {
				e.stopPropagation();
				return;
			});

		} else {
			// Handle the case where no elements were found
			console.log("Bilibili: No elements found with the specified class name.");
		}
	}


	let registBilibili = function(){
		const targetNode = document.getElementsByClassName('bpx-player-control-wrap')[0];
		const callback = function (mutationsList, observer) {
			mutationsList.forEach(mutation => {
				stopBilibiliTextPropagation();
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
	
	setTimeout(registBilibili, 5000);
})();



