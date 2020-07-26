import OptionsSync from 'webext-options-sync';

export default new OptionsSync({
	defaults: {
		speed: 1,
		custom: {}
	},
	migrations: [],
	logging: true
});
