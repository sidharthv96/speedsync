import OptionsSync from "webext-options-sync";

export default new OptionsSync({
	defaults: {
		colorRed: 244,
		colorGreen: 67,
		colorBlue: 54,
		"speed:yt:UCPvtzpmgq3fraUXl6lLoK3w": 1.25,
		"speed:yt:UCpJmCkjsJbqIBdvTRx2zt-w": 2,
		"speed:yt:UCq6f9bBWaWTHl0FhH167RgA": 1,
		"speed:yt:UCjcqzy7MSaN2KPnzOKIcpEQ": 0.25
	},
	migrations: [OptionsSync.migrations.removeUnused],
	logging: true
});
