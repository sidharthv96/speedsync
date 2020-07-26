export function getChannelInfo() {
	const channelLink = document.querySelector(".ytd-channel-name a");
	if (channelLink && channelLink.href) {
		const channelID = channelLink.href.split("/").pop();
		return {
			id: `yt:${channelID}`,
			name: channelLink.text
		};
	}
	return null;
}
