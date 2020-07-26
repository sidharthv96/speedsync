let video;

window.addEventListener("load", function() {
	const videoElement = document.querySelector("video");
	if (videoElement) {
		video = videoElement;
		init();
	}
});

function setSpeed(opts) {
	const video = document.querySelector("video");
	if (video) video.playbackRate = opts.speed;
}

const actionMap = {
	setSpeed
};

function messageReceiver(request, sender, sendResponse) {
	if (request.action) {
		actionMap[request.action](request);
	}
}

function init() {
	video.addEventListener("playing", event => {
		console.log("Video is no longer paused");
	});
	browser.runtime.onMessage.addListener(messageReceiver);
}
