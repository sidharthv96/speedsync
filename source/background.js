// eslint-disable-next-line import/no-unassigned-import
import "./options-storage";

browser.contextMenus.create({
	id: "speed-up",
	title: "Speed Up"
});

browser.contextMenus.create({
	id: "default",
	title: "Default Speed"
});

function messageTab(message) {
	var querying = browser.tabs.query({
		active: true,
		currentWindow: true
	});
	querying.then(tabs => browser.tabs.sendMessage(tabs[0].id, message));
}

browser.contextMenus.onClicked.addListener(function(info, tab) {
	if (info.menuItemId == "speed-up") {
		messageTab({
			action: "setSpeed",
			speed: 3
		});
	} else {
		if (info.menuItemId == "default") {
			messageTab({
				action: "setSpeed",
				speed: 1
			});
		}
	}
});
