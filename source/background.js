import optionsStorage from "./options-storage";

function messageTab(message) {
	var querying = browser.tabs.query({
		active: true,
		currentWindow: true
	});
	querying.then(tabs => browser.tabs.sendMessage(tabs[0].id, message));
}

async function updateSpeed(request, sender, sendResponse) {
	console.log(request);
	const opt = {};
	opt[getSettingsID(request.player)] = request.speed;
	await optionsStorage.set(opt);
	return optionsStorage.getAll();
}

async function getSpeed(request, sender, sendResponse) {
	console.log(request);
	const opts = await optionsStorage.getAll();
	console.log(opts);
	return opts[getSettingsID(request.player)] || 1;
}

function getSettingsID(player) {
	return `speed:${player.id}`;
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
	console.log("updated from background");
	browser.tabs.sendMessage(tabId, {
		action: "checkForRate"
	});
});
