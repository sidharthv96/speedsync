import optionsStorage from "./options-storage";

async function updateSpeed(request) {
	console.log(request);
	const opts = await optionsStorage.getAll();
	opts[request.player.id] = {
		name: request.player.name,
		site: request.player.site,
		speed: request.speed
	};
	await optionsStorage.set(opts);
	return optionsStorage.getAll();
}

async function getSpeed(request) {
	console.log(request);
	const opts = await optionsStorage.getAll();
	console.log(opts);
	if (opts[request.player.id]) {
		return opts[request.player.id].speed || 1;
	}
	// TODO: This should return a default speed we can set
	return 1;
}

const actionMap = {
	updateSpeed,
	getSpeed
};

function messageReceiver(request, sender, sendResponse) {
	if (request.action) {
		return actionMap[request.action](request, sender, sendResponse);
	}
}

browser.runtime.onMessage.addListener(messageReceiver);
browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	browser.tabs.sendMessage(tabId, {
		action: "checkForRate"
	});
});
