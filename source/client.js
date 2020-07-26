import { getChannelInfo } from "./youtube";

let video;
let playerID;
let lastSetRate;

function onLoadHandler() {
	const videoElement = document.querySelector("video");
	if (videoElement) {
		video = videoElement;
		init();
	}
}

function setSpeed(opts) {
	video.playbackRate = opts.speed;
	lastSetRate = opts.speed;
}

const actionMap = {
	setSpeed,
	checkForRate
};

function messageReceiver(request, sender, sendResponse) {
	if (request.action) {
		actionMap[request.action](request);
	}
}

function getPlayer() {
	if (window.location.host === "www.youtube.com") {
		const channel = getChannelInfo();
		if (channel) {
			return channel;
		}
	}
	return {
		id: window.location.host,
		name: window.location.host
	};
}

async function checkForRate() {
	if (video) {
		const speed = await browser.runtime.sendMessage({
			action: "getSpeed",
			player: getPlayer()
		});
		console.log("Got Rate" + speed);
		setSpeed({ speed });
	}
}

// function isNewPlayer() {
// 	return getPlayer().id !== playerID;
// }

// function updatePlayerID() {
// 	playerID = getPlayer().id;
// }

function isRateChangedByUser() {
	return video.playbackRate !== lastSetRate;
}

async function rateChangeHandler(event) {
	// console.log("The playback rate changed.");
	// console.log("Newplayer : " + isNewPlayer());
	// console.log("isRateChangedByUser : " + isRateChangedByUser());
	// updatePlayerID();
	if (isRateChangedByUser()) {
		console.log("Persisting to Options!");
		browser.runtime
			.sendMessage({
				action: "updateSpeed",
				player: getPlayer(),
				speed: event.target.playbackRate
			})
			.then(console.log, console.log);
		lastSetRate = event.target.playbackRate;
	}
}

function init() {
	console.log("INIT");
	lastSetRate = video.playbackRate;
	// updatePlayerID();
	// video.addEventListener("playing", event => {
	// 	updatePlayerID();
	// });
	video.addEventListener("ratechange", rateChangeHandler);
}

onLoadHandler();
browser.runtime.onMessage.addListener(messageReceiver);
