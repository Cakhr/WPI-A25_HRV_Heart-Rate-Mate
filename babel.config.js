module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			['babel-preset-expo', { jsxImportSource: 'nativewind' }],
			'nativewind/babel'
		],
		overrides: [
			{
				test: (filename) => !filename.startsWith(__dirname),
				plugins: [
					[
						'@babel/plugin-transform-react-jsx',
						{
							runtime: 'automatic'
						}
					]
				]
			}
		]
	};
};
